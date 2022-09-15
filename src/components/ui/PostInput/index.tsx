import { Input } from '@rneui/themed';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, InputAccessoryView, Keyboard } from 'react-native';
import { KeyboardAccessory } from './KeyboradAccessory';

type Props = {
  text: string;
  setText: (t: string) => void;
  placeholder: string
};

export const PostInput = ({ text, setText, placeholder }: Props) => {
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
        <KeyboardAccessory text={text} />
      </InputAccessoryView>
    </>
  );
};

const { height: screenHeight } = Dimensions.get('screen');
