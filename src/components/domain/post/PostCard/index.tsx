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
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
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
            {_images.map((uri, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.imageContainer,
                    { marginTop: index > 1 ? 3 : 0 },
                  ]}
                >
                  <Image
                    source={{ uri }}
                    style={[
                      styles.image,
                      {
                        borderTopLeftRadius:
                          index === 0 ? IMAGE_BORDER_RADIUS : 0,
                        borderTopRightRadius:
                          index === 1 ? IMAGE_BORDER_RADIUS : 0,
                        borderBottomLeftRadius:
                          index === 2 ? IMAGE_BORDER_RADIUS : 0,
                        borderBottomRightRadius:
                          index === 3 ? IMAGE_BORDER_RADIUS : 0,
                      },
                    ]}
                  />
                </View>
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
    </Pressable>
  );
};

const _images = [
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/306653271_163588822930529_583515079970813894_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=ocn8xO-_9BEAX_MGFsU&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkyNzAyMDI1MTYzMzk1MjM5OA%3D%3D.2-ccb7-5&oh=00_AT_niGbYX1Q5AmIjELn9X9P_bvBGBak03-Ap6IqlEKbNfA&oe=632F7249&_nc_sid=30a2ef',
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/306653271_163588822930529_583515079970813894_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=ocn8xO-_9BEAX_MGFsU&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkyNzAyMDI1MTYzMzk1MjM5OA%3D%3D.2-ccb7-5&oh=00_AT_niGbYX1Q5AmIjELn9X9P_bvBGBak03-Ap6IqlEKbNfA&oe=632F7249&_nc_sid=30a2ef',
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/306653271_163588822930529_583515079970813894_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=ocn8xO-_9BEAX_MGFsU&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkyNzAyMDI1MTYzMzk1MjM5OA%3D%3D.2-ccb7-5&oh=00_AT_niGbYX1Q5AmIjELn9X9P_bvBGBak03-Ap6IqlEKbNfA&oe=632F7249&_nc_sid=30a2ef',
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/304927517_608787140642426_6009967415154864891_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=SaVaCZNmFt4AX9pIDvm&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkxOTU3OTY1MTI1NTE3Mzc2OA%3D%3D.2-ccb7-5&oh=00_AT__0Xr4tlFmi9IAb0Q-WUAM36IXI9pWbLIb9QOvK7--Ag&oe=632E4493&_nc_sid=30a2ef',
];

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
  imageContainer: {
    width: '49.5%',
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
