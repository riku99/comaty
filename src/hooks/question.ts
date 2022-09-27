import {
  QuestionsScreenDataDocument,
  QuestionsScreenDataQuery,
  useDeleteQuestionMutation,
} from 'src/generated/graphql';

export const useDeleteQuestion = () => {
  const [deleteQuestionMutation] = useDeleteQuestionMutation();

  const deleteQuestion = async ({ id }: { id: number }) => {
    await deleteQuestionMutation({
      variables: {
        id,
      },
      update: (cache, { data: responseData }) => {
        if (!responseData || !responseData.deleteQuestion.id) {
          return;
        }

        const questionsScreenDataQuery =
          cache.readQuery<QuestionsScreenDataQuery>({
            query: QuestionsScreenDataDocument,
          });
      },
    });
  };

  return {
    deleteQuestion,
  };
};
