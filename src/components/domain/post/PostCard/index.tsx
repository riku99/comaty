import { Text } from '@rneui/themed';
import { filter } from 'graphql-anywhere';
import { StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import {
  PostCardFragment,
  ProfileImageFragment,
  ProfileImageFragmentDoc,
} from 'src/generated/graphql';
import { theme } from 'src/styles';

type Props = {
  postData: PostCardFragment;
};

export const PostCard = ({ postData }: Props) => {
  const { text, user } = postData;
  return (
    <View style={styles.body}>
      <ProfileImage
        imageData={filter<ProfileImageFragment>(
          ProfileImageFragmentDoc,
          user.firstProfileImage
        )}
        style={styles.profileImage}
      />

      <View style={styles.rightContent}>
        <Text style={styles.name}>{user.nickname}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const IMAGE_SIZE = 48;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomColor: theme.boarderGray,
    borderBottomWidth: 0.5,
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
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
