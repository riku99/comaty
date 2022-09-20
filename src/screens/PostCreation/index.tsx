import { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useToast } from 'react-native-toast-notifications';
import { CloseButton } from 'src/components/ui/CloseButton';
import { HeaderRightCreationButton } from 'src/components/ui/HeaderRightCreationButton';
import { PostInput } from 'src/components/ui/PostInput';
import { POST_MAX_TEXT_COUNT } from 'src/constants';
import { processImagesForMultipartRequest } from 'src/helpers/processImagesForMultipartRequest';
import { useCreatePost, useCreatingPost } from 'src/hooks/post';

type Props = RootNavigationScreenProp<'PostCreation'>;

export const PostCreationScreen = ({ navigation }: Props) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState<{ uri: string; mime: string }[]>([]);
  const toast = useToast();
  const { setCreatingPost } = useCreatingPost();
  const { createPost } = useCreatePost();

  const onPostPress = useCallback(async () => {
    if (!text) {
      return;
    }

    navigation.goBack();
    setCreatingPost(true);
    try {
      const files = await processImagesForMultipartRequest(images);
      await createPost({
        input: {
          text,
          images: files,
        },
        onCompleted: () => {
          toast.show('投稿しました', { type: 'success' });
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      setCreatingPost(false);
    }
  }, [createPost, text, navigation, images]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '投稿',
      headerShadowVisible: false,
      headerLeft: () => <CloseButton />,
      headerRight: () => (
        <HeaderRightCreationButton
          title="投稿する"
          disable={text.length === 0 || text.length > POST_MAX_TEXT_COUNT}
          onPress={onPostPress}
        />
      ),
    });
  }, [navigation, onPostPress, text]);

  const onSelectedImages = (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorCode) {
      return;
    }
    const d = response.assets?.map((asset) => {
      return { uri: asset.uri, mime: asset.type };
    });
    setImages(d);
  };

  const onSelectedImageDeletePress = (uri: string) => {
    setImages((c) => c.filter((img) => img.uri !== uri));
  };

  return (
    <View style={styles.container}>
      <PostInput
        text={text}
        setText={setText}
        placeholder={'気軽に投稿、共有しましょう！'}
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
  postText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#29b0ff',
  },
});
