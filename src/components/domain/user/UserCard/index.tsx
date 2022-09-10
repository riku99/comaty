import { Text } from '@rneui/themed';
import { filter } from 'graphql-anywhere';
import { Dimensions, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import {
  ProfileImageFragment,
  ProfileImageFragmentDoc,
  UserCardFragment,
} from 'src/generated/graphql';

type Props = {
  containerStyle?: ViewStyle;
  onPress?: (id: string) => void;
  userCardData: UserCardFragment;
};

export const UserCard = ({ containerStyle, onPress, userCardData }: Props) => {
  const { nickname, statusMessage, id } = userCardData;
  return (
    <Pressable
      style={[styles.body, containerStyle]}
      onPress={() => {
        if (onPress) {
          onPress(id);
        }
      }}
    >
      <ProfileImage
        imageData={
          userCardData.profileImages.length
            ? filter<ProfileImageFragment>(
                ProfileImageFragmentDoc,
                userCardData.profileImages[0]
              )
            : null
        }
        style={styles.image}
      />
      <Text style={styles.name}>{nickname}</Text>
      <Text style={styles.singleWord}>{statusMessage}</Text>
    </Pressable>
  );
};

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  body: {
    width: screenWidth * 0.36,
    height: 180,
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 300,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 8,
  },
  singleWord: {
    marginTop: 4,
  },
});
