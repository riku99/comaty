import { Input } from '@rneui/themed';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Dimensions,
  InputAccessoryView,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';
import { KeyboardAccessory } from './KeyboradAccessory';

type Props = RootNavigationScreenProp<'PostCreation'>;

export const PostCreation = ({ navigation }: Props) => {
  const inputRef = useRef<typeof Input>(null);
  const textInputId = 'textInput';
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '投稿',
      headerLeft: () => <CloseButton />,
    });
  }, [navigation]);

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
    <View style={styles.container}>
      <Input
        // @ts-ignore
        ref={inputRef}
        placeholder="気軽に投稿、共有しよう"
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
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
