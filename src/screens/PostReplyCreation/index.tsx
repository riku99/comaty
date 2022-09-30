import { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useToast } from 'react-native-toast-notifications';
import { CloseButton } from 'src/components/ui/CloseButton';
import { HeaderRightCreationButton } from 'src/components/ui/HeaderRightCreationButton';
import { PostAndQuestionInput } from 'src/components/ui/PostAndQuestionInput';
import {
  PostDetailScreenDataDocument,
  useCreatePostMutation,
} from 'src/generated/graphql';
import { processImagesForMultipartRequest } from 'src/helpers/processImagesForMultipartRequest';
import { useCreatingPostReply } from 'src/hooks/post';

type Props = RootNavigationScreenProp<'PostReply'>;

export const PostReplyCreationScreen = ({ navigation, route }: Props) => {
  const { postId } = route.params;
  const [text, setText] = useState('');
  const [images, setImages] = useState<{ uri: string; type: string }[]>([]);
  const [createPostMutation] = useCreatePostMutation();
  const toast = useToast();
  const { setCreatingPostReply } = useCreatingPostReply();

  const onReplyPress = useCallback(async () => {
    if (!text) {
      return;
    }

    navigation.goBack();
    setCreatingPostReply(true);
    try {
      const files = await processImagesForMultipartRequest(images);
      await createPostMutation({
        variables: {
          input: {
            text,
            replyTo: postId,
            images: files,
          },
        },
        refetchQueries: [
          {
            query: PostDetailScreenDataDocument,
            variables: {
              id: postId,
            },
          },
        ],
        onCompleted: () => {
          toast.show('返信しました', { type: 'success' });
        },
      });
    } catch (e) {
    } finally {
      setCreatingPostReply(false);
    }
  }, [navigation, text, postId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '返信',
      headerLeft: () => <CloseButton />,
      headerRight: () => (
        <HeaderRightCreationButton title="返信する" onPress={onReplyPress} />
      ),
    });
  }, [navigation, onReplyPress]);

  const onSelectedImages = (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorCode) {
      return;
    }
    const d = response.assets?.map((asset) => {
      return { uri: asset.uri, type: asset.type };
    });
    setImages(d);
  };

  const onSelectedImageDeletePress = (uri: string) => {
    setImages((c) => c.filter((img) => img.uri !== uri));
  };

  return (
    <View style={styles.container}>
      <PostAndQuestionInput
        text={text}
        setText={setText}
        placeholder={'気軽に返信、質問しましょう！'}
        onSelectedImages={onSelectedImages}
        selectedImages={images.map((img) => ({ uri: img.uri }))}
        onSelectedImageDeletePress={onSelectedImageDeletePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
