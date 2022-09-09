import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

const image =
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/298361927_152418067398881_2160437032496243760_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=oAYpeFN2dP4AX9kpoYp&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkwMjkxMzI5MzYyOTEwNzkzMg%3D%3D.2-ccb7-5&oh=00_AT8QrBjqzfj398zdc0w311nrI6CMwSnNZdH-5ql5WZMUVA&oe=632150EC&_nc_sid=30a2ef';

type Props = {
  containerStyle?: ViewStyle;
};

export const UserCard = ({ containerStyle }: Props) => {
  return (
    <Pressable style={[styles.body, containerStyle]}>
      <FastImage source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>ジゼル</Text>
      <Text style={styles.singleWord}>渋谷のカフェおすすめ教えて！💜</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '42%',
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
