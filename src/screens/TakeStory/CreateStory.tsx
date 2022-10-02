import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Text } from '@rneui/themed';
import { AnimatePresence, MotiView } from 'moti';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Video from 'react-native-video';

type Props = {
  sourceType: 'photo' | 'video';
  uri: string;
  onBackPress: () => void;
};

export const CreateStory = ({ sourceType, uri, onBackPress }: Props) => {
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSavingSource, setIsSavingSource] = useState(false);

  useEffect(() => {
    if (saveSuccess) {
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2000);
    }
  }, [saveSuccess]);

  const onSavePress = async () => {
    try {
      setIsSavingSource(true);
      await CameraRoll.save(uri);
      setSaveSuccess(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSavingSource(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {sourceType === 'photo' ? (
          <FastImage
            source={{
              uri,
            }}
            style={styles.source}
          />
        ) : (
          <Video source={{ uri }} style={styles.source} repeat />
        )}

        <View style={styles.topButtonGroup}>
          <Pressable style={styles.grayButton} onPress={onBackPress}>
            <AntDesign name="left" size={24} color="#fff" />
          </Pressable>

          <Pressable style={styles.grayButton} onPress={onSavePress}>
            {isSavingSource ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <MaterialIcons name="save-alt" size={24} color="#fff" />
            )}
          </Pressable>
        </View>
      </SafeAreaView>
      <Pressable style={[styles.shareButton, { bottom: safeAreaBottom + 8 }]}>
        <Text style={styles.shareText}>シェア🎈</Text>
      </Pressable>

      <AnimatePresence>
        {saveSuccess && (
          <MotiView
            from={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              type: 'timing',
              duration: 300,
            }}
            exit={{
              opacity: 0,
            }}
            style={styles.saveTextContainer}
          >
            <Text style={styles.saveText}>保存しました</Text>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
};

const a =
  'https://storage.googleapis.com/comaty-dev-user-upload/4OZK33XXmGgDqd5bsiT2KXLZTHau5PuoDZFSfaFp4am7J1Lh7fsEYv3HyN16l1';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  source: {
    width: '100%',
    height: undefined,
    aspectRatio: 9 / 16,
    borderRadius: 12,
    backgroundColor: '#F3F3F3',
  },
  topButtonGroup: {
    position: 'absolute',
    top: 70,
    paddingHorizontal: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  grayButton: {
    backgroundColor: 'rgba(89, 89, 89, 0.8)',
    padding: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#fff',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 32,
    position: 'absolute',
    right: 16,
  },
  shareText: {
    fontWeight: 'bold',
  },
  saveTextContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: 110,
    height: 40,
    top: '50%',
    transform: [{ translateY: -20 }],
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
