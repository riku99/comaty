import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  sourceType: 'photo' | 'video';
  uri: string;
  onBackPress: () => void;
};

export const CreateStory = ({ sourceType, uri, onBackPress }: Props) => {
  const { bottom: safeAreaBottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FastImage
          source={{
            uri: a,
          }}
          style={styles.source}
        />

        <View style={styles.topButtonGroup}>
          <Pressable style={styles.grayButton} onPress={onBackPress}>
            <AntDesign name="left" size={24} color="#fff" />
          </Pressable>

          <Pressable style={styles.grayButton}>
            <MaterialIcons name="save-alt" size={24} color="#fff" />
          </Pressable>
        </View>
      </SafeAreaView>
      <Pressable style={[styles.shareButton, { bottom: safeAreaBottom + 8 }]}>
        <Text style={styles.shareText}>シェア🎈</Text>
      </Pressable>
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
});
