import React from 'react';
import { CommonContentsInputKeyboardAccessory } from 'src/components/ui/CommonContentsInputKeyboardAccessory';
import { POST_MAX_TEXT_COUNT } from 'src/constants';

type Props = {
  text: string;
  onCamerarollImagePress: () => Promise<void>;
  seletedImages: { uri: string }[];
  onSelectedImageDeletePress: (url: string) => void;
};

export const KeyboardAccessory = ({
  text,
  onCamerarollImagePress,
  seletedImages,
  onSelectedImageDeletePress,
}: Props) => {
  return (
    <CommonContentsInputKeyboardAccessory
      text={text}
      onCamerarollImagePress={onCamerarollImagePress}
      seletedImages={seletedImages}
      onSelectedImageDeletePress={onSelectedImageDeletePress}
      maxTextCount={POST_MAX_TEXT_COUNT}
    />
  );
};
