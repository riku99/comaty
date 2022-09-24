import { filter } from 'graphql-anywhere';
import { useCallback, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { QuestionCard } from 'src/components/domain/question/QuestionCard';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  QuestionCardFragment,
  QuestionCardFragmentDoc,
  QuestionsScreenDataQuery,
  useQuestionsScreenDataQuery,
} from 'src/generated/graphql';

type QuestionItem = QuestionsScreenDataQuery['questions']['edges'][number];

export const Questions = () => {
  const { data, refetch } = useQuestionsScreenDataQuery();
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
