import { useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
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
          onRecordVideoSuccess={(video) => {
            setSourceData({
              uri: video.path,
              type: 'video',
              backgroundColors: [],
              mime: 'video/mp4',
            });
          }}
          onCapturePhotoSuccess={async (photo) => {
            FastImage.preload([
              {
                uri: photo.path,
              },
            ]);

            const colorResult = await ImageColors.getColors(photo.path, {
              cache: true,
              key: photo.path,
            });

            setTimeout(() => {
              if (colorResult.platform === 'ios') {
                setSourceData({
                  uri: photo.path,
                  type: 'photo',
                  backgroundColors: [
                    colorResult.background,
                    colorResult.primary,
                  ],
                  mime: 'image/jpg',
                });
              }
            }, 300);
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
              setSourceData({
                uri,
                type: 'video',
                backgroundColors: [],
                mime: 'video/mp4',
              });
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
