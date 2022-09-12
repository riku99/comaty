import { Entypo } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { filter } from 'graphql-anywhere';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { HStack } from 'src/components/ui/HStack';
import {
  PostCardFragment,
  ProfileImageFragment,
  ProfileImageFragmentDoc,
} from 'src/generated/graphql';
import { theme } from 'src/styles';

const Like = require('../../../../assets/lottie/like.json');

type Props = {
  postData: PostCardFragment;
};

export const PostCard = ({ postData }: Props) => {
  const { text, user, createdAt } = postData;
  const diff = formatDistanceToNow(new Date(Number(createdAt)), {
    locale: ja,
    addSuffix: true,
  });
  const [isLiked, setIsLiked] = useState(false);
  const likeRef = useRef<LottieView>(null);
  const isFirstRender = useRef(true);

  const onLikePress = () => {
    if (isLiked) {
      likeRef.current?.play(0, 0);
      setIsLiked(false);
    } else {
      likeRef.current?.play(20, 144);
      setIsLiked(true);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.mainContents}>
        <ProfileImage
          imageData={filter<ProfileImageFragment>(
            ProfileImageFragmentDoc,
            user.firstProfileImage
          )}
          style={styles.profileImage}
        />

        <View style={styles.rightContent}>
          <View style={styles.nameAndDiff}>
            <Text style={styles.name}>{user.nickname}</Text>
            <Text style={styles.diff}>{diff}</Text>
          </View>
          <Text style={styles.text}>{text}</Text>

          <HStack style={styles.actions} space={44}>
            <Pressable>
              <Entypo
                name="reply"
                size={ACTION_ICON_SIZE}
                color={ACTION_ICON_COLOR}
              />
            </Pressable>

            <Pressable onPress={onLikePress}>
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
            </Pressable>
          </HStack>
        </View>
      </View>
    </View>
  );
};

const IMAGE_SIZE = 48;
const ACTION_ICON_SIZE = 20;
const ACTION_ICON_COLOR = '#c7c7c7';

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomColor: theme.boarderGray,
    borderBottomWidth: 0.5,
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
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
