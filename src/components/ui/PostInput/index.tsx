import { Input } from '@rneui/themed';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, InputAccessoryView, Keyboard } from 'react-native';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { KeyboardAccessory } from './KeyboradAccessory';

type Props = {
  text: string;
  setText: (t: string) => void;
  placeholder: string;
  onSelectedImages?: (images: Image[]) => void;
  selectedImages: { uri: string }[];
  onSelectedImageDeletePress: (url: string) => void;
};

export const PostInput = ({
  text,
  setText,
  placeholder,
  onSelectedImages,
  selectedImages,
  onSelectedImageDeletePress,
}: Props) => {
  const inputRef = useRef<typeof Input>(null);
  const textInputId = 'textInput';
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    inputRef.current?.focus();
  }, []);

  const onCamerarollImagePress = async () => {
    try {
      const selectedCamerarollImages = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        maxFiles: 4,
      });
      if (onSelectedImages) {
        onSelectedImages(selectedCamerarollImages);
      }
    } catch (e) {
      console.log(e);
    } finally {
      // @ts-ignore
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <Input
        // @ts-ignore
        ref={inputRef}
        placeholder={placeholder}
        multiline
        inputAccessoryViewID={textInputId}
        onChangeText={setText}
        inputContainerStyle={{
          borderBottomWidth: 0,
        }}
        containerStyle={{
          height: screenHeight - keyboardHeight - 110,
        }}
      />

      <InputAccessoryView nativeID={textInputId}>
        <KeyboardAccessory
          text={text}
          onCamerarollImagePress={onCamerarollImagePress}
          seletedImages={selectedImages}
          onSelectedImageDeletePress={onSelectedImageDeletePress}
        />
      </InputAccessoryView>
    </>
  );
};

const { height: screenHeight } = Dimensions.get('screen');
