import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionCard } from 'src/components/domain/question/QuestionCard';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { range } from 'src/utils';

const arr = [...range(0, 20)];

export const Question = () => {
  const renderQuestionItem = useCallback(() => {
    return <QuestionCard />;
  }, []);

  return (
    <View style={styles.container}>
      <InfiniteFlatList
        renderItem={renderQuestionItem}
        data={arr}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 2,
  },
});
