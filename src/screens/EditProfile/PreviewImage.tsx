import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  imageUrl?: string | null;
  onPress: () => void;
};

export const PreviewImage = ({ imageUrl, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <FastImage source={{ uri: imageUrl }} style={styles.image}>
        <FontAwesome
          name="plus-circle"
          size={24}
          color="#fff"
          style={styles.plus}
        />
      </FastImage>
    </Pressable>
  );
};

const SIZE = 100;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE * 1.3,
    overflow: 'hidden',
    backgroundColor: '#D3D3D3',
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  plus: {
    position: 'absolute',
    right: 4,
    top: 4,
  },
});
