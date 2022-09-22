import { Input } from '@rneui/themed';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, InputAccessoryView, Keyboard } from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { KeyboardAccessory } from './KeyboradAccessory';

type Props = {
  text: string;
  setText: (t: string) => void;
  placeholder: string;
  onSelectedImages?: (response: ImagePickerResponse) => void;
  selectedImages: { uri: string }[];
  onSelectedImageDeletePress: (url: string) => void;
};

export const PostAndQuestionInput = ({
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
      const result = await launchImageLibrary({
        selectionLimit: 4,
        mediaType: 'photo',
      });

      if (onSelectedImages) {
        onSelectedImages(result);
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
