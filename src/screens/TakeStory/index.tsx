import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { CreateStory } from './CreateStory';
import { StoryCamera } from './StoryCamera';

type Props = RootNavigationScreenProp<'TakeStory'>;

export const TakeStoryScreen = () => {
  const [capturedPhotoUri, setCapturedPhotoUri] = useState(null);
  const [recordedVidepUri, setRecordedVideoUri] = useState(null);

  return (
    <CreateStory
      sourceType={'photo'}
      uri={capturedPhotoUri ?? recordedVidepUri}
      onBackPress={() => {
        setCapturedPhotoUri(null);
        setRecordedVideoUri(null);
      }}
    />
  );

  return (
    <>
      {!!capturedPhotoUri || !!recordedVidepUri ? (
        <CreateStory
          sourceType={'photo'}
          uri={capturedPhotoUri ?? recordedVidepUri}
        />
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
