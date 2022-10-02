import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { CreateStory } from './CreateStory';
import { StoryCamera } from './StoryCamera';

type Props = RootNavigationScreenProp<'TakeStory'>;

export const TakeStoryScreen = () => {
  const [capturedPhotoUri, setCapturedPhotoUri] = useState(null);
  const [recordedVidepUri, setRecordedVideoUri] = useState(null);

  return (
    <>
      {!!capturedPhotoUri || !!recordedVidepUri ? (
        <CreateStory />
      ) : (
        <StoryCamera
          onRecordVideoSuccess={(video) => {
            console.log(video.path);
            setRecordedVideoUri(video.path);
          }}
          onCapturePhotoSuccess={(photo) => {
            console.log(photo.path);
            setCapturedPhotoUri(photo.path);
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
