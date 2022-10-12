import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { useNicknameAndProfileImageInMessageRoomScreenQuery } from 'src/generated/graphql';

type Props = {
  userId: string;
};

export const HeaderLeft = ({ userId }: Props) => {
  const navigation = useNavigation<RootNavigationProp<'MessageRoom'>>();

  const { data: nickNameAndImageData } =
    useNicknameAndProfileImageInMessageRoomScreenQuery({
      variables: {
        id: userId,
      },
      fetchPolicy: 'cache-only',
    });

  return (
    <View style={styles.container}>
      <HeaderBackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      {nickNameAndImageData && (
        <Pressable
          style={styles.nameAndImage}
          onPress={() => {
            navigation.navigate('UserProfile', {
              id: userId,
            });
          }}
        >
          <ProfileImage
            imageData={nickNameAndImageData.user.firstProfileImage}
            style={styles.image}
          />

          <Text style={styles.nickname}>
            {nickNameAndImageData.user.nickname}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const HEADER_IMAGE_SIZE = 30;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameAndImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: HEADER_IMAGE_SIZE,
    height: HEADER_IMAGE_SIZE,
    borderRadius: HEADER_IMAGE_SIZE,
  },
  nickname: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 4,
  },
});
