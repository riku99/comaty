import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';
import { HeaderRightCreationButton } from 'src/components/ui/HeaderRightCreationButton';
import { PostInput } from 'src/components/ui/PostInput';

type Props = RootNavigationScreenProp<'PostReply'>;

export const PostReply = ({ navigation }: Props) => {
  const [text, setText] = useState('');

  const onReplyPress = async () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '返信',
      headerLeft: () => <CloseButton />,
      headerRight: () => (
        <HeaderRightCreationButton title="返信する" onPress={onReplyPress} />
      ),
    });
  }, [navigation]);

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
