import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useEffect, useState } from 'react';

export const useFirstCameraRollPhotoUri = () => {
  const [firstPhotoUri, setFirstPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const photo = await CameraRoll.getPhotos({ first: 1 });
      if (photo.edges.length) {
        setFirstPhotoUri(photo.edges[0].node.image.uri);
      }
    })();
  }, []);

  return firstPhotoUri;
};
