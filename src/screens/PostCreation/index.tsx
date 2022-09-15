import { Text } from '@rneui/themed';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';
import { PostInput } from 'src/components/ui/PostInput';
import { useCreatePostMutation } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { MAX_TEXT_COUNT } from './constants';

type Props = RootNavigationScreenProp<'PostCreation'>;

export const PostCreationScreen = ({ navigation }: Props) => {
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

  return (
    <View style={styles.container}>
      <PostInput text={text} setText={setText} />
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
