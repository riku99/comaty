import { Input } from '@rneui/themed';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Dimensions, Keyboard, StyleSheet, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';

type Props = RootNavigationScreenProp<'PostCreation'>;

export const PostCreation = ({ navigation }: Props) => {
  const inputRef = useRef<typeof Input>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '投稿',
      headerLeft: () => <CloseButton />,
    });
  }, [navigation]);

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardWillShow', (e) => {
      console.log(e.endCoordinates.height);
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
        placeholder="気軽に投稿、共有しよう"
        multiline
        inputContainerStyle={{
          borderBottomWidth: 0,
        }}
        containerStyle={{
          height: screenHeight - keyboardHeight - 110,
        }}
      />
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
});
