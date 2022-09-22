import { StyleSheet, View } from 'react-native';
import { QuestionCard } from 'src/components/domain/question/QuestionCard';

export const Question = () => {
  return (
    <View style={styles.container}>
      <QuestionCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
