import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { FirstCameraRollPhoto } from 'src/components/ui/FirstCameraRollPhoto';
import { HStack } from 'src/components/ui/HStack';
import { POST_MAX_TEXT_COUNT } from 'src/constants';
import { theme } from 'src/styles';

type Props = {
  text: string;
  onCamerarollImagePress: () => Promise<void>;
  seletedImages: { uri: string }[];
  onSelectedImageDeletePress: (url: string) => void;
  maxTextCount: number;
};

export const CommonContentsInputKeyboardAccessory = ({
  text,
  onCamerarollImagePress,
  seletedImages,
  onSelectedImageDeletePress,
}: Props) => {
  return (
    <View style={styles.body}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <FirstCameraRollPhoto onPress={onCamerarollImagePress} />
        <HStack space={14} style={styles.selectedImageContainer}>
          {seletedImages.map((img) => (
            <View key={img.uri}>
              <Image source={{ uri: img.uri }} style={styles.selectedImage} />
              <Pressable
                style={styles.deleteButton}
                onPress={() => {
                  onSelectedImageDeletePress(img.uri);
                }}
              >
                <AntDesign name="close" size={18} color="white" />
              </Pressable>
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
  deleteButton: {
    position: 'absolute',
    backgroundColor: '#3d3d3d',
    top: -10,
    right: -10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
});
