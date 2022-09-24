import { Input } from '@rneui/base';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Dimensions,
  InputAccessoryView,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { CloseButton } from 'src/components/ui/CloseButton';
import { CommonContentsInputKeyboardAccessory } from 'src/components/ui/CommonContentsInputKeyboardAccessory';

type Props = RootNavigationScreenProp<'QuestionReplyCreation'>;

export const QuestionReplyCreationScreen = ({ navigation }: Props) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState<{ uri: string; mime: string }[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<Input>(null);
  const textInputId = 'textInput';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '質問に答える',
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

  const onCamerarollImagePress = async () => {
    try {
      const result = await launchImageLibrary({
        selectionLimit: 4,
        mediaType: 'photo',
      });

      const d = result.assets?.map((asset) => {
        return { uri: asset.uri, mime: asset.type };
      });
      setImages(d);
    } catch (e) {
      console.log(e);
    } finally {
      // @ts-ignore
      inputRef.current?.focus();
    }
  };

  const onSelectedImageDeletePress = (uri: string) => {
    setImages((c) => c.filter((img) => img.uri !== uri));
  };

  return (
    <View style={styles.container}>
      <Input
        // @ts-ignore
        ref={inputRef}
        value={text}
        onChangeText={setText}
        multiline
        placeholder="質問に答えてあげよう!"
        inputAccessoryViewID={textInputId}
        inputContainerStyle={{
          borderBottomWidth: 0,
        }}
        containerStyle={{
          height: screenHeight - keyboardHeight - 110,
        }}
      />

      <InputAccessoryView nativeID={textInputId}>
        <CommonContentsInputKeyboardAccessory
          text={text}
          onCamerarollImagePress={onCamerarollImagePress}
          maxTextCount={300}
          onSelectedImageDeletePress={onSelectedImageDeletePress}
          seletedImages={images}
        />
      </InputAccessoryView>
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
});
