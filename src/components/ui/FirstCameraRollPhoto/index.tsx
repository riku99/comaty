import { MaterialIcons } from '@expo/vector-icons';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import { useFirstCameraRollPhotoUri } from 'src/hooks/useFirstCameraRollPhotoUri';

type Props = {
  imageSize?: number;
  onPress?: () => void | Promise<void>;
};

export const FirstCameraRollPhoto = ({ onPress, imageSize = 44 }: Props) => {
  const firstPhotoUri = useFirstCameraRollPhotoUri();

  if (!firstPhotoUri) {
    return null;
  }

  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        source={{ uri: firstPhotoUri }}
        style={[
          styles.imageContainer,
          {
            width: imageSize,
            height: imageSize,
          },
        ]}
        imageStyle={styles.cameraRollImage}
      >
        <MaterialIcons name="add-photo-alternate" size={24} color="#f2f2f2" />
      </ImageBackground>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraRollImage: {
    borderRadius: 8,
    backgroundColor: 'gray',
  },
});
