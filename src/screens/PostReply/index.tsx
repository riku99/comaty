import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';

type Props = RootNavigationScreenProp<'PostReply'>;

export const PostReply = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '返信',
      headerLeft: () => <CloseButton />,
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
