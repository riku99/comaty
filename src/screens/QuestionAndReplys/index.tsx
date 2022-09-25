import { Text } from '@rneui/themed';
import { filter } from 'graphql-anywhere';
import { useCallback, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { QuestionCard } from 'src/components/domain/question/QuestionCard';
import { Loading } from 'src/components/ui/Loading';
import {
  QuestionAndReplysScreenDataQuery,
  QuestionCardFragment,
  QuestionCardFragmentDoc,
  useQuestionAndReplysScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'QuestionAndReplys'>;

type ReplyItem = QuestionAndReplysScreenDataQuery['question']['replys'][number];

export const QuestionAndReplysScreen = ({ navigation, route }: Props) => {
  const { id: questionId } = route.params;
  const { data } = useQuestionAndReplysScreenDataQuery({
    variables: {
      id: questionId,
    },
    fetchPolicy: 'cache-and-network',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '質問と返信',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const renderReply = useCallback(({ item }: { item: ReplyItem }) => {
    return (
      <QuestionCard
        questionData={filter<QuestionCardFragment>(
          QuestionCardFragmentDoc,
          item
        )}
        isReply
      />
    );
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.question.replys}
        renderItem={renderReply}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <QuestionCard
              questionData={filter<QuestionCardFragment>(
                QuestionCardFragmentDoc,
                data.question
              )}
            />
            <Text
              style={{
                marginTop: 14,
                marginLeft: 14,
                fontWeight: 'bold',
                color: theme.gray.text,
              }}
            >
              返信一覧
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    marginBottom: 12,
  },
});
