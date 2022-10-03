import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useRef, useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  PhotoFile,
  useCameraDevices,
  VideoFile,
} from 'react-native-vision-camera';
import { CloseButton } from 'src/components/ui/CloseButton';
import { useFirstCameraRollPhotoUri } from 'src/hooks/useFirstCameraRollPhotoUri';
import { CaptureButton } from './CaptureButton';

export type CapturePhotoSuccessData = PhotoFile;
export type RecordVideoSuccessData = VideoFile;

type Props = {
  onCapturePhotoSuccess: (data: CapturePhotoSuccessData) => void;
  onRecordVideoSuccess: (data: RecordVideoSuccessData) => void;
  onSelectDataFromCameraRoll: (uri: string, type: string) => void;
};

export const StoryCamera = ({
  onCapturePhotoSuccess,
  onRecordVideoSuccess,
  onSelectDataFromCameraRoll,
}: Props) => {
  const devices = useCameraDevices();
  const [device, setDevice] = useState<'back' | 'front'>('back');
  const firstCameraRollPhotoUri = useFirstCameraRollPhotoUri();
  const isFocused = useIsFocused();
  const cameraRef = useRef<Camera>(null);
  const [flash, setFlash] = useState(false);
  const onRecording = useRef(false);
  const { bottom: safeAreaBottom } = useSafeAreaInsets();

  const onCaptureButtonPress = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto({
        flash: flash ? 'on' : 'off',
      });
      onCapturePhotoSuccess(photo);
    } catch (e) {
      console.log(e);
    }
  };

  const onCaptureButtonLongPress = () => {
    onRecording.current = true;
    cameraRef.current?.startRecording({
      flash: flash ? 'on' : 'off',
      onRecordingFinished: (video) => {
        onRecordVideoSuccess(video);
      },
      onRecordingError: (error) => {
        console.log(error);
      },
    });
  };

  const onCaptureButtonPressOut = async () => {
    if (onRecording.current) {
      await cameraRef.current?.stopRecording();
      onRecording.current = false;
    }
  };

  const onCameraRollPress = async () => {
    try {
      const result = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'mixed',
      });

      if (result.didCancel) {
        return;
      }

      const { uri, type } = result.assets[0];
      onSelectDataFromCameraRoll(uri, type);
    } catch (e) {
      console.log(e);
    }
  };

  // if (!devices.back || !devices.front) {
  //   return null;
  // }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* <Camera
          style={styles.camrea}
          device={device === 'back' ? devices.back : devices.front}
          isActive={isFocused}
          ref={cameraRef}
          photo
          audio
          video
          enableZoomGesture
        /> */}

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
        <View
          style={{ position: 'absolute', bottom: '15%', alignSelf: 'center' }}
        >
          <CaptureButton
            onPress={onCaptureButtonPress}
            onLongPress={onCaptureButtonLongPress}
            onPressOut={onCaptureButtonPressOut}
          />
        </View>

        <Pressable
          style={[
            styles.cameraRollPhotoContainer,
            { bottom: safeAreaBottom + 8 },
          ]}
          onPress={onCameraRollPress}
        >
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
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE,
  },
  cameraRollPhotoContainer: {
    position: 'absolute',
    left: 14,
    alignSelf: 'center',
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
