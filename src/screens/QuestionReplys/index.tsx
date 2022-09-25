import { Text } from '@rneui/themed';
import { filter } from 'graphql-anywhere';
import { useCallback, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { QuestionCard } from 'src/components/domain/question/QuestionCard';
import { Loading } from 'src/components/ui/Loading';
import { ReplyQuote } from 'src/components/ui/ReplyQuote';
import {
  QuestionCardFragment,
  QuestionCardFragmentDoc,
  QuestionReplysScreenDataQuery,
  useQuestionReplysScreenDataQuery,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'QuestionReplys'>;

type ReplyItem =
  QuestionReplysScreenDataQuery['questionReply']['replys'][number];

export const QuestionReplysScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const { data } = useQuestionReplysScreenDataQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '返信',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const renderReply = useCallback(({ item }: { item: ReplyItem }) => {
    return <QuestionCard questionData={item} isReply />;
  }, []);

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.questionReply.replys}
        renderItem={renderReply}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <ReplyQuote
              text={
                !!data.questionReply.question
                  ? data.questionReply.question.text
                  : data.questionReply.questionReply.text
              }
            />
            <QuestionCard
              questionData={filter<QuestionCardFragment>(
                QuestionCardFragmentDoc,
                data.questionReply
              )}
              isReply
              disableNavigateToDetail
            />
            <Text style={styles.listText}>返信一覧</Text>
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
  listText: {
    marginTop: 14,
    marginLeft: 14,
    fontWeight: 'bold',
    color: '#848484',
  },
  replyTo: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quoteLine: {
    width: 6,
    backgroundColor: '#cccccc',
    height: '100%',
    borderRadius: 4,
  },
  quoteText: {
    marginLeft: 6,
    fontWeight: 'bold',
  },
});
