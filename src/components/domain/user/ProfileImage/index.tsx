import FastImage, { FastImageProps } from 'react-native-fast-image';
import { ProfileImageFragment } from 'src/generated/graphql';
const Youchien = require('src/assets/image/youchien_boy.png');

type Props = Omit<FastImageProps, 'source'> & {
  imageData: ProfileImageFragment | null;
};

export const ProfileImage = ({ imageData, ...props }: Props) => {
  return (
    <FastImage
      source={imageData ? { uri: imageData.url } : Youchien}
      resizeMode={imageData ? undefined : 'contain'}
      {...props}
    />
  );
};
