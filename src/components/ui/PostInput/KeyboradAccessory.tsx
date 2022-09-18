import { MaterialIcons } from '@expo/vector-icons';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { HStack } from 'src/components/ui/HStack';
import { POST_MAX_TEXT_COUNT } from 'src/constants';
import { theme } from 'src/styles';

type Props = {
  text: string;
  onCamerarollImagePress: () => Promise<void>;
  seletedImages: { uri: string }[];
};

export const KeyboardAccessory = ({
  text,
  onCamerarollImagePress,
  seletedImages,
}: Props) => {
  const [firstPhotoUri, setFirstPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const photo = await CameraRoll.getPhotos({ first: 1 });
      if (photo.edges.length) {
        setFirstPhotoUri(photo.edges[0].node.image.uri);
      }
    })();
  }, []);

  return (
    <View style={styles.body}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {firstPhotoUri && (
          <Pressable onPress={onCamerarollImagePress}>
            <ImageBackground
              source={{ uri: firstPhotoUri }}
              style={styles.imageContainer}
              imageStyle={styles.camerarollImage}
            >
              <MaterialIcons
                name="add-photo-alternate"
                size={24}
                color="#f2f2f2"
              />
            </ImageBackground>
          </Pressable>
        )}

        <HStack space={12} style={styles.selectedImageContainer}>
          {seletedImages.map((img, index) => (
            <View key={index}>
              <Image source={{ uri: img.uri }} style={styles.selectedImage} />
            </View>
          ))}
        </HStack>
      </View>
      <Text
        style={[
          styles.textCount,
          {
            color:
              text.length <= POST_MAX_TEXT_COUNT ? '#9c9c9c' : theme.alertRed,
          },
        ]}
      >{`${text.length} / ${POST_MAX_TEXT_COUNT}`}</Text>
    </View>
  );
};

const IMAGE_SIZE = 44;

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camerarollImage: {
    borderRadius: 8,
    backgroundColor: 'gray',
  },
  selectedImageContainer: {
    marginLeft: 12,
  },
  selectedImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: 'gray',
  },
});
