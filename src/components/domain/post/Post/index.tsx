import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PostFragment } from 'src/generated/graphql';

type Props = {
  postData: PostFragment;
};

export const Post = ({ postData }: Props) => {
  const { text, user } = postData;
  return (
    <View style={styles.body}>
      <FastImage
        source={{ uri: user.firstProfileImage.url }}
        style={styles.profileImage}
      />

      <View style={styles.rightContent}>
        <Text style={styles.name}>{user.nickname}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const IMAGE_SIZE = 50;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 16,
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
