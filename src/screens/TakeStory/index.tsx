import { useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageColors from 'react-native-image-colors';
import { getImageOrVideoType } from 'src/utils';
import { CreateStory } from './CreateStory';
import { StoryCamera } from './StoryCamera';

type Props = RootNavigationScreenProp<'TakeStory'>;

export const TakeStoryScreen = ({ navigation }: Props) => {
  const [capturedPhotoUri, setCapturedPhotoUri] = useState(null);
  const [recordedVidepUri, setRecordedVideoUri] = useState(null);

  return (
    <>
      {!!capturedPhotoUri || !!recordedVidepUri ? (
        <CreateStory
          sourceType={capturedPhotoUri ? 'photo' : 'video'}
          uri={capturedPhotoUri ?? recordedVidepUri}
          onBackPress={() => {
            setCapturedPhotoUri(null);
            setRecordedVideoUri(null);
          }}
        />
      ) : (
        <StoryCamera
          onRecordVideoSuccess={(video) => {
            setRecordedVideoUri(video.path);
          }}
          onCapturePhotoSuccess={async (photo) => {
            FastImage.preload([
              {
                uri: photo.path,
              },
            ]);

            setTimeout(() => {
              setCapturedPhotoUri(photo.path);
            }, 300);
          }}
          onSelectDataFromCameraRoll={async (uri, type) => {
            if (getImageOrVideoType(type) === 'image') {
              const result = await ImageColors.getColors(uri, {
                fallback: '#228B22',
                cache: true,
                key: uri,
              });
              console.log(result);
              setCapturedPhotoUri(uri);
            } else {
              setRecordedVideoUri(uri);
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
