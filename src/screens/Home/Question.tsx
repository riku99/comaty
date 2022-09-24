import { filter } from 'graphql-anywhere';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionCard } from 'src/components/domain/question/QuestionCard';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  QuestionCardFragment,
  QuestionCardFragmentDoc,
  QuestionScreenDataQuery,
  useQuestionScreenDataQuery,
} from 'src/generated/graphql';

type QuestionItem = QuestionScreenDataQuery['questions']['edges'][number];

export const Question = () => {
  const { data } = useQuestionScreenDataQuery();

  const renderQuestionItem = useCallback(({ item }: { item: QuestionItem }) => {
    return (
      <QuestionCard
        questionData={filter<QuestionCardFragment>(
          QuestionCardFragmentDoc,
          item.node
        )}
      />
    );
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <InfiniteFlatList
        renderItem={renderQuestionItem}
        data={data.questions.edges}
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
