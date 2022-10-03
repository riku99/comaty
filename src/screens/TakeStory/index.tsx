import * as VideoThumbnails from 'expo-video-thumbnails';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ImageColors from 'react-native-image-colors';
import { StorySource } from 'src/types';
import { getImageOrVideoType } from 'src/utils';
import { CreateStory } from './CreateStory';
import { StoryCamera } from './StoryCamera';

type Props = RootNavigationScreenProp<'TakeStory'>;

export const TakeStoryScreen = ({ navigation }: Props) => {
  const [sourceData, setSourceData] = useState<StorySource>(null);

  return (
    <>
      {sourceData ? (
        <CreateStory
          onBackPress={() => {
            setSourceData(null);
          }}
          sourceData={sourceData}
        />
      ) : (
        <StoryCamera
          onRecordVideoSuccess={async (video) => {
            const { uri: thumbnailUri } =
              await VideoThumbnails.getThumbnailAsync(video.path, {
                time: 100,
              });

            setSourceData({
              uri: video.path,
              type: 'video',
              backgroundColors: [],
              mime: 'video/quicktime',
            });
          }}
          onCapturePhotoSuccess={async (photo) => {
            try {
              setSourceData({
                uri: photo.path,
                type: 'photo',
                backgroundColors: [],
                mime: 'image/jpeg',
              });
            } catch (e) {
              console.log(e);
            }
          }}
          onSelectDataFromCameraRoll={async (uri, type) => {
            if (getImageOrVideoType(type) === 'image') {
              const colorResult = await ImageColors.getColors(uri, {
                cache: true,
                key: uri,
              });
              if (colorResult.platform === 'ios') {
                setSourceData({
                  uri,
                  mime: type,
                  type: 'photo',
                  backgroundColors: [
                    colorResult.background,
                    colorResult.primary,
                  ],
                });
              }
            } else {
              try {
                const { uri: thumbnailUri } =
                  await VideoThumbnails.getThumbnailAsync(uri, {
                    time: 100,
                  });

                const colorResult = await ImageColors.getColors(thumbnailUri, {
                  cache: true,
                  key: uri,
                });

                if (colorResult.platform === 'ios') {
                  setSourceData({
                    uri,
                    type: 'video',
                    backgroundColors: [
                      colorResult.background,
                      colorResult.primary,
                    ],
                    mime: type,
                  });
                }
              } catch (e) {
                console.log(e);
              }
            }
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});
