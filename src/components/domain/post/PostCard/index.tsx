import { Entypo } from '@expo/vector-icons';
import { MenuAction, MenuView } from '@react-native-menu/menu';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import * as Haptics from 'expo-haptics';
import { filter } from 'graphql-anywhere';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import FullImageView from 'react-native-image-viewing';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { HStack } from 'src/components/ui/HStack';
import {
  PostCardFragment,
  ProfileImageFragment,
  ProfileImageFragmentDoc,
  useLikePostMutation,
  useMyIdQuery,
  useUnlikePostMutation,
} from 'src/generated/graphql';
import { theme } from 'src/styles';

const Like = require('../../../../assets/lottie/like.json');

type Props = {
  postData: PostCardFragment;
  disableDetailNavigation?: boolean;
  onDelete: () => Promise<void>;
};

export const PostCard = ({
  postData,
  onDelete,
  disableDetailNavigation = false,
}: Props) => {
  const { text, user, createdAt, liked, id, replys, images } = postData;
  const diff = formatDistanceToNow(new Date(Number(createdAt)), {
    locale: ja,
    addSuffix: true,
  });
  const [isLiked, setIsLiked] = useState(liked);
  const likeRef = useRef<LottieView>(null);
  const isFirstRender = useRef(true);
  const [likePostMutation] = useLikePostMutation();
  const [unlikePostMutation] = useUnlikePostMutation();
  const navigation = useNavigation<RootNavigationProp<any>>();
  const [likeCount, setLikeCount] = useState(postData.likeCount);
  const { data: idData } = useMyIdQuery({
    fetchPolicy: 'cache-only',
  });
  const [dotsMenuActions, setDotsMenuActions] = useState<MenuAction[]>([
    {
      id: reportMenuId,
      title: '報告',
    },
  ]);
  const likePressed = useRef(false);
  const [fullImageViewingIndex, setFullImageViewingIndex] = useState<
    number | null
  >(null);
  const fullImageViewingData = images?.map((img) => ({ uri: img.url }));

  const getImageStyle = (
    index: number
  ): {
    imageStyle: FastImageProps['style'];
    imageContainerStyle: ViewStyle;
  } => {
    if (images.length === 1) {
      return {
        imageStyle: {
          borderRadius: IMAGE_BORDER_RADIUS,
        },
        imageContainerStyle: {
          width: '100%',
          height: 180,
        },
      };
    } else if (images.length === 2) {
      return {
        imageStyle: {
          borderTopLeftRadius: index === 0 ? IMAGE_BORDER_RADIUS : 0,
          borderTopRightRadius: index === 1 ? IMAGE_BORDER_RADIUS : 0,
          borderBottomLeftRadius: index === 0 ? IMAGE_BORDER_RADIUS : 0,
          borderBottomRightRadius: index === 1 ? IMAGE_BORDER_RADIUS : 0,
        },
        imageContainerStyle: {
          width: '49.5%',
          height: 180,
        },
      };
    } else {
      return {
        imageStyle: {
          borderTopLeftRadius: index === 0 ? IMAGE_BORDER_RADIUS : 0,
          borderTopRightRadius: index === 1 ? IMAGE_BORDER_RADIUS : 0,
          borderBottomLeftRadius: index === 2 ? IMAGE_BORDER_RADIUS : 0,
          borderBottomRightRadius: index === 3 ? IMAGE_BORDER_RADIUS : 0,
        },
        imageContainerStyle: {
          width: '49.5%',
          height: 90,
        },
      };
    }
  };

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  useEffect(() => {
    setLikeCount(postData.likeCount);
  }, [postData.likeCount]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (isLiked) {
        likeRef.current?.play(144, 144);
      }
    } else {
      if (isLiked) {
        if (likePressed.current) {
          likePressed.current = false;
          likeRef.current?.play(20, 144);
        } else {
          likeRef.current?.play(144, 144);
        }
      } else {
        likeRef.current?.play(0, 0);
      }
    }
  }, [isLiked]);

  useEffect(() => {
    if (idData.me.id === user.id) {
      setDotsMenuActions((c) => {
        return [
          ...c,
          {
            id: deleteMenuId,
            title: '削除',
            attributes: {
              destructive: true,
            },
            image: 'trash',
            imageColor: 'red',
          },
        ];
      });
    }
  }, [idData, user.id]);

  const onLikePress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      if (isLiked) {
        setIsLiked(false);
        setLikeCount((c) => c - 1);
        await unlikePostMutation({
          variables: {
            id,
          },
        });
      } else {
        likePressed.current = true;
        setIsLiked(true);
        setLikeCount((c) => c + 1);
        await likePostMutation({
          variables: {
            id,
          },
        });
      }
    } catch {
      setIsLiked((c) => !c);
    }
  };

  const onReplyPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('PostReply', {
      postId: id,
    });
  };

  const onBodyPress = () => {
    if (disableDetailNavigation) {
      return;
    }

    navigation.push('PostDetail', {
      id,
    });
  };

  const onDotsMenuActionPress = async (menuId: string) => {
    switch (menuId) {
      case deleteMenuId:
        Alert.alert('削除しますか？', '', [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '削除',
            style: 'destructive',
            onPress: async () => {
              try {
                await onDelete();
              } catch (e) {
                console.log(e);
              }
            },
          },
        ]);
        break;
    }
  };

  const onProfileImagePress = () => {
    navigation.navigate('UserProfile', {
      id: user.id,
    });
  };

  return (
    <Pressable style={styles.body} onPress={onBodyPress} hitSlop={10}>
      <View style={styles.mainContents}>
        <Pressable onPress={onProfileImagePress}>
          <ProfileImage
            imageData={filter<ProfileImageFragment>(
              ProfileImageFragmentDoc,
              user.firstProfileImage
            )}
            style={styles.profileImage}
          />
        </Pressable>

        <View style={styles.rightContent}>
          <View style={styles.nameAndDiff}>
            <Text style={styles.name}>{user.nickname}</Text>
            <Text style={styles.diff}>{diff}</Text>
          </View>
          <Text style={styles.text}>{text}</Text>

          <View style={styles.images}>
            {images.map((image, index) => {
              return (
                <Pressable
                  key={index}
                  style={[
                    getImageStyle(index).imageContainerStyle,
                    { marginTop: index > 1 ? 3 : 0 },
                  ]}
                  onPress={() => {
                    setFullImageViewingIndex(index);
                  }}
                >
                  <FastImage
                    source={{ uri: image.url }}
                    style={[styles.image, getImageStyle(index).imageStyle]}
                  />
                </Pressable>
              );
            })}
          </View>

          <View style={styles.actions}>
            <HStack style={styles.actionsLeft} space={44}>
              <Pressable
                onPress={onReplyPress}
                hitSlop={10}
                style={styles.reply}
              >
                <Entypo
                  name="reply"
                  size={ACTION_ICON_SIZE}
                  color={ACTION_ICON_COLOR}
                />
                <Text style={styles.replyCount}>
                  {!!replys.length && replys.length}
                </Text>
              </Pressable>

              <Pressable onPress={onLikePress} style={styles.like}>
                <LottieView
                  ref={likeRef}
                  source={Like}
                  style={{
                    width: 34,
                  }}
                  resizeMode="cover"
                  loop={false}
                  speed={1.4}
                />
                <Text
                  style={[
                    styles.likeCount,
                    { color: liked ? '#F24949' : ACTION_ICON_COLOR },
                  ]}
                >
                  {likeCount !== 0 && likeCount}
                </Text>
              </Pressable>
            </HStack>

            <MenuView
              actions={dotsMenuActions}
              onPressAction={(e) => {
                onDotsMenuActionPress(e.nativeEvent.event);
              }}
            >
              <Pressable style={styles.dotsAction}>
                <Entypo
                  name="dots-three-horizontal"
                  size={ACTION_ICON_SIZE}
                  color={ACTION_ICON_COLOR}
                />
              </Pressable>
            </MenuView>
          </View>
        </View>
      </View>

      <FullImageView
        visible={fullImageViewingIndex !== null}
        images={fullImageViewingData}
        imageIndex={fullImageViewingIndex}
        onRequestClose={() => {
          setFullImageViewingIndex(null);
        }}
      />
    </Pressable>
  );
};

const deleteMenuId = 'delete';
const reportMenuId = 'report';

const IMAGE_SIZE = 48;
const ACTION_ICON_SIZE = 20;
const ACTION_ICON_COLOR = '#c7c7c7';
const IMAGE_BORDER_RADIUS = 16;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomColor: theme.boarderGray,
    borderBottomWidth: 0.5,
    backgroundColor: '#fff',
  },
  mainContents: {
    flexDirection: 'row',
  },
  profileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 90,
  },
  rightContent: {
    marginLeft: 10,
    marginTop: 2,
    flexShrink: 1,
    width: '100%',
  },
  nameAndDiff: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  diff: {
    fontWeight: '500',
    color: '#a3a3a3',
    fontSize: 12,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    justifyContent: 'space-between',
  },
  actionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotsAction: {
    marginRight: 4,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  like: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    transform: [{ translateX: -4 }],
    fontWeight: 'bold',
  },
  reply: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyCount: {
    transform: [{ translateX: 4 }],
    marginTop: 2,
    fontWeight: 'bold',
    color: ACTION_ICON_COLOR,
  },
  images: {
    width: '100%',
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
