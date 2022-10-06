import { Text } from '@rneui/themed';
import { filter } from 'graphql-anywhere';
import { StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { CloseButton } from 'src/components/ui/CloseButton';
import {
  ProfileImageFragment,
  ProfileImageFragmentDoc,
  StoryUserMetaDataFragment,
} from 'src/generated/graphql';

type Props = {
  userData: StoryUserMetaDataFragment;
};

export const StoryUserMetaData = ({ userData }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageAndName}>
        <ProfileImage
          imageData={filter<ProfileImageFragment>(
            ProfileImageFragmentDoc,
            userData.firstProfileImage
          )}
          style={styles.image}
        />
        <Text style={styles.nickname}>{userData.nickname}</Text>
      </View>

      <CloseButton color="#fff" size={32} />
    </View>
  );
};

const IMAGE_SIZE = 34;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE,
  },
  nickname: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
    marginLeft: 12,
  },
});
