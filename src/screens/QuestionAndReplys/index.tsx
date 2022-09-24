import { filter } from 'graphql-anywhere';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionCard } from 'src/components/domain/question/QuestionCard';
import { Loading } from 'src/components/ui/Loading';
import {
  QuestionCardFragment,
  QuestionCardFragmentDoc,
  useQuestionAndReplysScreenDataQuery,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'QuestionAndReplys'>;

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

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <QuestionCard
        questionData={filter<QuestionCardFragment>(
          QuestionCardFragmentDoc,
          data.question
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
