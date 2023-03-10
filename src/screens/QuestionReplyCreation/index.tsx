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
import { useToast } from 'react-native-toast-notifications';
import { CheckBox } from 'src/components/ui/CheckBox';
import { CloseButton } from 'src/components/ui/CloseButton';
import { CommonContentsInputKeyboardAccessory } from 'src/components/ui/CommonContentsInputKeyboardAccessory';
import { HeaderRightCreationButton } from 'src/components/ui/HeaderRightCreationButton';
import { QUESTION_MAX_TEXT_COUNT } from 'src/constants';
import {
  QuestionAndReplysScreenDataDocument,
  QuestionReplysScreenDataDocument,
  useCreateQuestionReplyMutation,
} from 'src/generated/graphql';
import { processImagesForMultipartRequest } from 'src/helpers/processImagesForMultipartRequest';

type Props = RootNavigationScreenProp<'QuestionReplyCreation'>;

export const QuestionReplyCreationScreen = ({ navigation, route }: Props) => {
  const params = route.params;
  const isAnswerToQuestion = params.replyTo === 'question';
  const [text, setText] = useState('');
  const [images, setImages] = useState<{ uri: string; type: string }[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef<Input>(null);
  const textInputId = 'textInput';
  const [isAnonymity, setIsAnonymity] = useState(false);
  const [createQuestionReply] = useCreateQuestionReplyMutation();
  const toast = useToast();

  const onAnswerOrReplyPress = useCallback(async () => {
    if (!text) {
      return;
    }

    navigation.goBack();
    try {
      const files = await processImagesForMultipartRequest(images);
      await createQuestionReply({
        variables: {
          input: {
            text,
            isAnonymity,
            images: files,
            questionId: isAnswerToQuestion ? params.id : undefined,
            questionReplyId: isAnswerToQuestion ? undefined : params.id,
          },
        },
        refetchQueries: [
          {
            query: isAnswerToQuestion
              ? QuestionAndReplysScreenDataDocument
              : QuestionReplysScreenDataDocument,
            variables: {
              id: params.id,
            },
          },
        ],
        onCompleted: () => {
          const toastText = isAnswerToQuestion
            ? '??????????????????'
            : '??????????????????';
          toast.show(toastText);
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  }, [text, isAnonymity, createQuestionReply, images, params]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params.replyTo === 'question' ? '???????????????' : '??????',
      headerLeft: () => <CloseButton />,
      headerRight: () => (
        <HeaderRightCreationButton
          title={params.replyTo === 'question' ? '????????????' : '????????????'}
          onPress={onAnswerOrReplyPress}
          disable={text.length === 0 || text.length > QUESTION_MAX_TEXT_COUNT}
        />
      ),
    });
  }, [navigation, params, onAnswerOrReplyPress, text]);

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
          return { uri: asset.uri, type: asset.type };
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
            ? `${params.name}??????????????????????????????????????????`
            : `${params.name}???????????????????????????`
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
            label={isAnswerToQuestion ? '?????????????????????' : '?????????????????????'}
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
