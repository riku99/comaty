import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = RootNavigationScreenProp<'MyTagSelection'>;

export const MyTagSelectionScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'マイタグの編集',
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
