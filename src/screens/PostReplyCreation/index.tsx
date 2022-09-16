import { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';
import { HeaderRightCreationButton } from 'src/components/ui/HeaderRightCreationButton';
import { PostInput } from 'src/components/ui/PostInput';
import { useCreatePostMutation } from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'PostReply'>;

export const PostReplyCreationScreen = ({ navigation, route }: Props) => {
  const { postId } = route.params;
  const [text, setText] = useState('');
  const [createPostMutation] = useCreatePostMutation();

  const onReplyPress = useCallback(async () => {
    if (!text) {
      return;
    }

    try {
      await createPostMutation({
        variables: {
          input: {
            text,
            replyTo: postId,
          },
        },
      });
    } catch (e) {
    } finally {
      navigation.goBack();
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

  return (
    <View style={styles.container}>
      <PostInput
        text={text}
        setText={setText}
        placeholder={'気軽に返信、質問しましょう！'}
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
