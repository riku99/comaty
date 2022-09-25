import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = RootNavigationScreenProp<'QuestionReplys'>;

export const QuestionReplysScreen = ({ navigation, route }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '返信',
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
