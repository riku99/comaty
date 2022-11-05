import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { differenceInMinutes } from 'date-fns';
import { ComponentProps, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { Badge } from 'src/components/ui/Badge';
import { MESSAGE_REPLY_LIMIT_TIME } from 'src/constants';
import { RoomListItemInMessageRoomListScreenFragment } from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me/useMyId';
import { theme } from 'src/styles';

type Props = {
  fragmentData: RoomListItemInMessageRoomListScreenFragment;
} & ComponentProps<typeof Pressable>;

export const RoomListItem = ({ fragmentData, ...pressableProps }: Props) => {
  const { partner, messages, kept } = fragmentData;
  const message = messages.edges[0]?.node;
  const text = message.text;
  const myId = useMyId();
  const badgeVisible = !message.read && message.sender.id !== myId;
  const [remainingTime, setRemainingTime] = useState(
    message?.sender.id !== myId
      ? MESSAGE_REPLY_LIMIT_TIME -
          differenceInMinutes(new Date(), new Date(Number(message.createdAt)))
      : null
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTime(
        message?.sender.id !== myId
          ? MESSAGE_REPLY_LIMIT_TIME -
              differenceInMinutes(
                new Date(),
                new Date(Number(message.createdAt))
              )
          : null
      );
    }, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, [message.createdAt, message?.sender.id, myId]);

  return (
    <Pressable
      {...pressableProps}
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
              {!kept && remainingTime !== undefined && remainingTime !== null && (
                <Text
                  style={[
                    styles.timeAndDistanceText,
                    {
                      color: remainingTime > 5 ? theme.gray.text : theme.red,
                    },
                  ]}
                >{`あと${remainingTime > 0 ? remainingTime : 0}分`}</Text>
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
});
