import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { AnimatePresence, MotiView } from 'moti';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RNFFmpeg } from 'react-native-ffmpeg';
import { TemporaryDirectoryPath } from 'react-native-fs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import Video from 'react-native-video';
import { StoryContainer } from 'src/components/ui/StoryContainer';
import { isMoreRecentThanXDevice } from 'src/constants';
import {
  AfterCreateingStoryDocument,
  StoryType,
  useCreateStoryMutation,
} from 'src/generated/graphql';
import { processImageForMultipartRequest } from 'src/helpers/processImagesForMultipartRequest';
import { useCreatingStory } from 'src/hooks/app';
import { StorySource } from 'src/types';

type Props = {
  onBackPress: () => void;
  sourceData: StorySource;
};

export const CreateStory = ({ onBackPress, sourceData }: Props) => {
  const { uri, type, backgroundColors, mime, thumbnailUri } = sourceData;
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSavingSource, setIsSavingSource] = useState(false);
  const [createStoryMutation] = useCreateStoryMutation();
  const navigation = useNavigation<RootNavigationProp<'TakeStory'>>();
  const { setCreatingStory } = useCreatingStory();
  const toast = useToast();

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

  const onCreateStoryPress = async () => {
    try {
      setCreatingStory(true);

      navigation.goBack();

      const outputVideoName = `output.mp4`;
      const outputVideoUri = `file://${TemporaryDirectoryPath}/${outputVideoName}`;

      if (type === 'video') {
        await RNFFmpeg.execute(`-y -i ${uri} -c:v libx264 ${outputVideoUri}`);
      }

      const file = await processImageForMultipartRequest({
        uri: type === 'photo' ? uri : outputVideoUri,
        type: type === 'photo' ? 'image/jpg' : 'video/mp4',
      });

      const thumbnailFile = thumbnailUri
        ? await processImageForMultipartRequest({
            uri: thumbnailUri,
            type: 'image/jpg',
          })
        : undefined;

      await createStoryMutation({
        variables: {
          input: {
            file,
            type: type === 'photo' ? StoryType.Photo : StoryType.Video,
            backgroundColors,
            thumbnailFile,
          },
        },
        refetchQueries: [
          {
            query: AfterCreateingStoryDocument,
          },
        ],
        onCompleted: (d) => {
          toast.show('??????????????????');
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      setCreatingStory(false);
    }
  };

  return (
    <View style={styles.container}>
      <StoryContainer backgroundColors={backgroundColors}>
        {type === 'photo' ? (
          <FastImage
            source={{
              uri,
            }}
            style={styles.source}
            resizeMode="contain"
          />
        ) : (
          <Video
            source={{ uri }}
            style={styles.source}
            repeat
            resizeMode="contain"
          />
        )}
      </StoryContainer>

      <View
        style={[
          styles.topButtonGroup,
          {
            top: isMoreRecentThanXDevice ? '9%' : '6%',
          },
        ]}
      >
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

      <Pressable style={[styles.shareButton, { bottom: safeAreaBottom + 8 }]}>
        <Text style={styles.shareText} onPress={onCreateStoryPress}>
          ?????????????
        </Text>
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
            <Text style={styles.saveText}>??????????????????</Text>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  source: {
    width: '100%',
    height: '100%',
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
    width: 84,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 32,
    position: 'absolute',
    right: 16,
  },
  shareText: {
    fontWeight: 'bold',
    fontSize: 16,
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
