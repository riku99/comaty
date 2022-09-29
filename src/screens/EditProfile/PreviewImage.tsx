import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  imageUrl?: string | null;
  onPress: () => void;
  disable?: boolean;
};

export const PreviewImage = ({ imageUrl, onPress, disable = false }: Props) => {
  return (
    <Pressable
      onPress={() => {
        if (disable) {
          return;
        }
        onPress();
      }}
      style={styles.container}
    >
      <FastImage source={{ uri: imageUrl }} style={styles.image}>
        {!imageUrl && (
          <FontAwesome
            name="plus-circle"
            size={24}
            color="#fff"
            style={styles.plus}
          />
        )}
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
  lock: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
