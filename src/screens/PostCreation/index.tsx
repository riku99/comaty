import { Input, Text } from '@rneui/themed';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  InputAccessoryView,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';
import { useCreatePostMutation } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { MAX_TEXT_COUNT } from './constants';
import { KeyboardAccessory } from './KeyboradAccessory';

type Props = RootNavigationScreenProp<'PostCreation'>;

export const PostCreationScreen = ({ navigation }: Props) => {
  const inputRef = useRef<typeof Input>(null);
  const textInputId = 'textInput';
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [text, setText] = useState('');
  const [createPostMutation] = useCreatePostMutation();

  const onPostPress = useCallback(async () => {
    if (!text) {
      return;
    }

    try {
      await createPostMutation({
        variables: {
          input: {
            text,
          },
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      navigation.goBack();
    }
  }, [createPostMutation, text, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '投稿',
      headerLeft: () => <CloseButton />,
      headerRight: () => (
        <Pressable onPress={onPostPress}>
          <Text
            style={[
              styles.postText,
              {
                color:
                  text.length === 0 || text.length > MAX_TEXT_COUNT
                    ? theme.gray.disable
                    : theme.creationBule,
              },
            ]}
          >
            投稿
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, onPostPress, text]);

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
        placeholder="気軽に投稿、共有しよう👀"
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
  postText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#29b0ff',
  },
});
