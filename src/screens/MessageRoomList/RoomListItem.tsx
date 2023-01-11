import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { differenceInMinutes } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import {
  AppState,
  AppStateStatus,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { Badge } from 'src/components/ui/Badge';
import { MESSAGE_REPLY_LIMIT_TIME } from 'src/constants';
import {
  RoomListItemInMessageRoomListScreenFragment,
  useMessageRoomScreenDataQuery,
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me/useMyId';
import { theme } from 'src/styles';

type Props = {
  fragmentData: RoomListItemInMessageRoomListScreenFragment;
  pinned?: boolean;
} & ComponentProps<typeof Pressable>;

export const RoomListItem = ({
  fragmentData,
  pinned,
  ...pressableProps
}: Props) => {
  const { partner, kept, lastMessage } = fragmentData;
  const text = lastMessage.text;
  const myId = useMyId();
  const badgeVisible = !lastMessage.read && lastMessage.sender.id !== myId;
  const [remainingTime, setRemainingTime] = useState(
    lastMessage?.sender.id !== myId
      ? MESSAGE_REPLY_LIMIT_TIME -
          differenceInMinutes(
            new Date(),
            new Date(Number(lastMessage.createdAt))
          )
      : null
  );
  // キャッシュを取りたいのでrefetchを使用
  const { refetch } = useMessageRoomScreenDataQuery({
    variables: {
      id: fragmentData.id,
    },
    skip: true,
  });
  const isFirstRender = useRef(true);

  // 残り時間の更新
  useEffect(() => {
    const updateemainingTime = () => {
      setRemainingTime(
        lastMessage?.sender.id !== myId
          ? MESSAGE_REPLY_LIMIT_TIME -
              differenceInMinutes(
                new Date(),
                new Date(Number(lastMessage.createdAt))
              )
          : null
      );
    };

    // 最新メッセージが変わったタイミングで残り時間を更新する必要がある
    updateemainingTime();

    // 最新メッセージが変わっていなくても時間を進める必要があるのでアクティブのタイミングで実行
    const onChange = (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        updateemainingTime();
      }
    };

    const subscription = AppState.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, [lastMessage.createdAt, lastMessage?.sender.id, myId]);

  // アクティブにした際などに相手ユーザーから新しくメッセージがきた場合はそのトークルームのキャッシュを更新したい。メッセージ早く表示するため
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // badgeVisibleと同じ条件だけどbadgeVisibleのdepsだと未読メッセージが変わったタイミングで再レンダリングされないのでlastMessageをdepsにする
    if (!lastMessage.read && lastMessage.sender.id !== myId) {
      refetch();
    }
  }, [lastMessage, refetch, myId]);

  return (
    <Pressable
      {...pressableProps}
      onLongPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (pressableProps.onLongPress) {
          pressableProps.onLongPress(e);
        }
      }}
      style={{
        borderBottomWidth: 0.3,
        borderBottomColor: theme.gray.boarder,
      }}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: pressed ? '#F6F6F6' : undefined,
            },
          ]}
        >
          <View style={styles.mainContents}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <ProfileImage
                imageData={partner.firstProfileImage}
                style={{
                  height: IMAGE_SIZE,
                  width: IMAGE_SIZE,
                  borderRadius: IMAGE_SIZE,
                }}
              />

              {pinned && (
                <View style={styles.pinContainer}>
                  <AntDesign name="pushpin" size={8} color="#fff" />
                </View>
              )}

              <View style={styles.nameAndMessage}>
                <Text style={styles.name}>{partner.nickname}</Text>
                <Text
                  style={styles.text}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {text.replace(/\r?\n/g, '')}
                </Text>
              </View>
            </View>

            {badgeVisible && <Badge size={10} />}
          </View>

          <View style={styles.timeAndDistance}>
            {!!partner.distance && (
              <Text style={styles.timeAndDistanceText}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={12}
                  color={theme.gray.text}
                />
                {`${partner.distance}km先`}
              </Text>
            )}

            <View>
              {kept ? (
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: theme.gray.text,
                  }}
                >
                  キープ中
                </Text>
              ) : (
                remainingTime !== undefined &&
                remainingTime !== null && (
                  <Text
                    style={[
                      styles.timeAndDistanceText,
                      {
                        color: remainingTime > 5 ? theme.gray.text : theme.red,
                      },
                    ]}
                  >{`あと${remainingTime > 0 ? remainingTime : 0}分`}</Text>
                )
              )}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const IMAGE_SIZE = 54;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  mainContents: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAndMessage: {
    marginLeft: 8,
    width: '60%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    marginTop: 6,
    width: '100%',
  },
  timeAndDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeAndDistanceText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.gray.text,
  },
  pinContainer: {
    position: 'absolute',
    padding: 6,
    borderRadius: 40,
    backgroundColor: theme.primary,
    transform: [{ translateX: -8 }],
  },
});
