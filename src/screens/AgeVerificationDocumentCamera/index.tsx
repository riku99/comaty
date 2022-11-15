import { useIsFocused } from '@react-navigation/native';
import { useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { CloseButton } from 'src/components/ui/CloseButton';
import { isMoreRecentThanXDevice } from 'src/constants';

type Props = RootNavigationScreenProp<'AgeVerificationDocumentCamera'>;

export const AgeVerificationDocumentCameraScreen = ({
  navigation,
  route,
}: Props) => {
  const { selectedDocumentType } = route.params;

  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const devices = useCameraDevices();
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();

  const onCaptureButtonPress = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto();
      navigation.goBack();
      navigation.navigate('ConfirmAgeVerificationDocumentPhoto', {
        selectedDocumentType,
        imageData: {
          uri: photo.path,
          type: 'image/jpeg',
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (!devices.back) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={[styles.camera]}
        device={devices.back}
        isActive={isFocused}
        ref={cameraRef}
        photo
        enableZoomGesture
      />

      <View
        style={[
          styles.closeButton,
          {
            top: isMoreRecentThanXDevice ? '9%' : '6%',
          },
        ]}
      >
        <CloseButton color="#fff" size={32} />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 14 + safeAreaBottom,
          alignSelf: 'center',
        }}
      >
        <Pressable
          style={styles.captureButton}
          onPress={onCaptureButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    left: 12,
  },
  captureButton: {
    backgroundColor: '#fff',
    width: 74,
    height: 74,
    borderRadius: 74,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});
