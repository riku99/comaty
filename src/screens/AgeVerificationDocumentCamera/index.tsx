import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CloseButton } from 'src/components/ui/CloseButton';
import { isMoreRecentThanXDevice } from 'src/constants';

export const AgeVerificationDocumentCameraScreen = () => {
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  return (
    <View style={styles.container}>
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
        <Pressable style={styles.captureButton} />
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
  },
  captureButton: {
    backgroundColor: '#fff',
    width: 74,
    height: 74,
    borderRadius: 74,
  },
});
