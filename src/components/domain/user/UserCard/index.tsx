import { Text } from '@rneui/themed';
import { Dimensions, Pressable, StyleSheet, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { UserCardFragment } from 'src/generated/graphql';

const noImage =
  'https://scontent.cdninstagram.com/v/t51.2885-19/58409598_320814331934288_8362243699735789568_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=108&_nc_ohc=6UWm0lwa5VwAX8W14vv&edm=APs17CUBAAAA&ccb=7-5&oh=00_AT8V1iPeXwe8Zfyw-TsS9jqI61mztseg3Quv9bDFpgWsHA&oe=632273AE&_nc_sid=978cb9';

type Props = {
  containerStyle?: ViewStyle;
  onPress?: (id: number) => void;
  userCardData: UserCardFragment;
};

export const UserCard = ({ containerStyle, onPress, userCardData }: Props) => {
  const { nickname, profileImages, statusMessage } = userCardData;
  return (
    <Pressable
      style={[styles.body, containerStyle]}
      onPress={() => {
        if (onPress) {
          onPress(1);
        }
      }}
    >
      <FastImage
        source={{ uri: profileImages[0]?.url ?? noImage }}
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
