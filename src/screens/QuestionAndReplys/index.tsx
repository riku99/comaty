import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = RootNavigationScreenProp<'QuestionAndReplys'>;

export const QuestionAndReplysScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '質問と返信',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
