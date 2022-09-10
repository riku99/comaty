import FastImage, { FastImageProps } from 'react-native-fast-image';
import { ProfileImageFragment } from 'src/generated/graphql';
const Youchien = require('src/assets/image/youchien_boy.png');

type Props = Omit<FastImageProps, 'source'> & {
  imageData: ProfileImageFragment;
};

export const ProfileImage = ({ imageData, ...props }: Props) => {
  const hasImage = !!imageData.profileImages.length;
  return (
    <FastImage
      source={hasImage ? { uri: imageData.profileImages[0].url } : Youchien}
      resizeMode={hasImage ? undefined : 'contain'}
      {...props}
    />
  );
};
