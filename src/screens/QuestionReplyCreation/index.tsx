import { Input } from '@rneui/base';
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
  StyleSheet,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { CheckBox } from 'src/components/ui/CheckBox';
import { CloseButton } from 'src/components/ui/CloseButton';
import { CommonContentsInputKeyboardAccessory } from 'src/components/ui/CommonContentsInputKeyboardAccessory';
import { HeaderRightCreationButton } from 'src/components/ui/HeaderRightCreationButton';
import { QUESTION_MAX_TEXT_COUNT } from 'src/constants';
import { useCreateQuestionReplyMutation } from 'src/generated/graphql';
import { processImagesForMultipartRequest } from 'src/helpers/processImagesForMultipartRequest';

type Props = RootNavigationScreenProp<'QuestionReplyCreation'>;

export const QuestionReplyCreationScreen = ({ navigation, route }: Props) => {
  const params = route.params;
  const [text, setText] = useState('');
  const [images, setImages] = useState<{ uri: string; mime: string }[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<Input>(null);
  const textInputId = 'textInput';
  const [isAnonymity, setIsAnonymity] = useState(false);
  const [createQuestionReply] = useCreateQuestionReplyMutation();

  const onAnswerOrReplyPress = useCallback(async () => {
    try {
      const files = await processImagesForMultipartRequest(images);
      await createQuestionReply({
        variables: {
          input: {
            text,
            isAnonymity,
            images: files,
            questionId: params.replyTo === 'question' ? params.id : undefined,
            questionReplyId:
              params.replyTo === 'questionReply' ? params.id : undefined,
          },
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }, [text, isAnonymity, createQuestionReply, images, params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '質問に答える',
      headerLeft: () => <CloseButton />,
      headerRight: () => (
        <HeaderRightCreationButton
          title={params.replyTo === 'question' ? '回答する' : '返信する'}
          onPress={onAnswerOrReplyPress}
        />
      ),
    });
  }, [navigation, params, onAnswerOrReplyPress]);

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

      if (!result.didCancel) {
        const d = result.assets?.map((asset) => {
          return { uri: asset.uri, mime: asset.type };
        });
        setImages(d);
      }
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
        placeholder={
          params.replyTo === 'question'
            ? `${params.name}さんの質問に答えてあげよう！`
            : '返信しよう'
        }
        inputAccessoryViewID={textInputId}
        inputContainerStyle={{
          borderBottomWidth: 0,
        }}
        containerStyle={{
          height: screenHeight - keyboardHeight - 110,
        }}
      />

      <InputAccessoryView nativeID={textInputId}>
        <View style={styles.accessoryTopContainer}>
          <CheckBox
            label="匿名で回答"
            isChecked={isAnonymity}
            onPress={() => {
              setIsAnonymity(!isAnonymity);
            }}
          />
        </View>
        <CommonContentsInputKeyboardAccessory
          text={text}
          onCamerarollImagePress={onCamerarollImagePress}
          maxTextCount={QUESTION_MAX_TEXT_COUNT}
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
    paddingTop: 8,
  },
  accessoryTopContainer: {
    paddingHorizontal: 16,
    height: 34,
  },
});
