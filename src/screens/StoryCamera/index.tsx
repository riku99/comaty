import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { CloseButton } from 'src/components/ui/CloseButton';
import { useFirstCameraRollPhotoUri } from 'src/hooks/useFirstCameraRollPhotoUri';

type Props = RootNavigationScreenProp<'StoryCamera'>;

export const StoryCameraScreen = ({ navigation }: Props) => {
  const devices = useCameraDevices();
  const [device, setDevice] = useState<'back' | 'front'>('back');
  const firstCameraRollPhotoUri = useFirstCameraRollPhotoUri();
  const isFocused = useIsFocused();
  const cameraRef = useRef<Camera>(null);
  const [flash, setFlash] = useState(false);

  const onCaptureButtonPress = async () => {
    const photo = await cameraRef.current?.takePhoto({
      flash: flash ? 'on' : 'off',
    });
    console.log(photo);
  };

  console.log("😆device is" + device)

  if (!devices.back || !devices.front) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Camera
          style={styles.camrea}
          device={device === 'back' ? devices.back : devices.front}
          isActive={isFocused}
          ref={cameraRef}
          photo={true}
          enableZoomGesture
        />
        {/* <View style={styles.camrea} /> */}

        <View style={styles.closeButton}>
          <CloseButton color={'#fff'} size={32} />

          <Pressable
            onPress={() => {
              setFlash(!flash);
            }}
          >
            <Ionicons
              name={flash ? 'flash' : 'flash-off'}
              size={32}
              color="#fff"
            />
          </Pressable>

          <Pressable
            onPress={() => {
              if (device === 'back') {
                setDevice('front');
              } else {
                setDevice('back');
              }
            }}
          >
            <Ionicons name="camera-reverse" size={32} color="#fff" />
          </Pressable>
        </View>

        {/* 撮影ボタン */}
        <Pressable
          style={styles.caputureButtonOuter}
          onPress={onCaptureButtonPress}
        >
          <View style={styles.captureButtonInner} />
        </Pressable>

        <Pressable style={styles.cameraRollPhotoContainer}>
          <Image
            source={{ uri: firstCameraRollPhotoUri }}
            style={styles.cameraRollPhoto}
          />
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

const CAPTURE_BUTTON_SIZE = 64;
const CAMERAROLL_PHOTO_SIZE = 34;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    paddingHorizontal: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  camrea: {
    width: '100%',
    height: undefined,
    aspectRatio: 9 / 16,
    borderRadius: 12,
  },
  caputureButtonOuter: {
    position: 'absolute',
    bottom: '17%',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: CAPTURE_BUTTON_SIZE + 10,
    width: CAPTURE_BUTTON_SIZE + 10,
    height: CAPTURE_BUTTON_SIZE + 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    backgroundColor: '#fff',
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE,
  },
  cameraRollPhotoContainer: {
    position: 'absolute',
    bottom: 40,
    left: 14,
    alignSelf: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cameraRollPhoto: {
    height: CAMERAROLL_PHOTO_SIZE,
    width: CAMERAROLL_PHOTO_SIZE,
  },
});
