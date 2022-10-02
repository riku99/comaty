import { useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
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
          onCapturePhotoSuccess={(photo) => {
            FastImage.preload([
              {
                uri: photo.path,
              },
            ]);
            setTimeout(() => {
              setCapturedPhotoUri(photo.path);
            }, 300);
          }}
          onSelectDataFromCameraRoll={(uri, type) => {
            console.log('Run');
            if (getImageOrVideoType(type) === 'image') {
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
