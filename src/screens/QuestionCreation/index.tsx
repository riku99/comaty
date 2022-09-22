import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { CloseButton } from 'src/components/ui/CloseButton';
import { PostAndQuestionInput } from 'src/components/ui/PostAndQuestionInput';

type Props = RootNavigationScreenProp<'QuestionCreation'>;

export const QuestionCreationScreen = ({ navigation }: Props) => {
  const [text, setText] = useState('');
  const [images, setImages] = useState<{ uri: string; mime: string }[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'そこ質の作成',
      headerLeft: () => <CloseButton />,
    });
  }, [navigation]);

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
      <PostAndQuestionInput
        text={text}
        setText={setText}
        placeholder={'なんでも気軽に質問してみよう！'}
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
