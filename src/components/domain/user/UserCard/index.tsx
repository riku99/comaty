import { Text } from '@rneui/themed';
import { BlurView } from 'expo-blur';
import { filter } from 'graphql-anywhere';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
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
  const { nickname, statusMessage, id, age } = userCardData;
  return (
    <Pressable
      style={[styles.body, containerStyle]}
      onPress={() => {
        onPress(id);
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
      >
        <View style={styles.distanceContainer}>
          <BlurView intensity={40} style={styles.blurView}>
            <Text style={styles.distance}>400m先</Text>
          </BlurView>
        </View>
      </ProfileImage>

      <View style={styles.nameAndAge}>
        <Text style={styles.name}>
          {nickname}, <Text style={styles.age}>{age}</Text>
        </Text>
        <Text style={styles.singleWord}>{statusMessage}</Text>
      </View>
    </Pressable>
  );
};

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  body: {
    width: screenWidth * 0.46,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    transform: [{ scale: 0.97 }],
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
  },
  singleWord: {
    marginTop: 6,
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 10,
    width: '70%',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 100,
    borderWidth: 0.6,
    borderColor: '#D6D6D6',
  },
  blurView: {
    width: '100%',
    alignItems: 'center',
  },
  distance: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 4,
  },
  nameAndAge: {
    marginLeft: 4,
  },
  age: {
    fontSize: 16,
  },
});
