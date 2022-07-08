import auth from '@react-native-firebase/auth';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { CreateUserError, useCreateUserMutation } from 'src/generated/graphql';
import { getGraphQLError } from 'src/utils';

export const useSignUpWithEmail = () => {
  const [createUserMutation] = useCreateUserMutation();

  const signUpWithEmail = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const { user: firebaseUser } =
          await auth().createUserWithEmailAndPassword(email, password);
        const idToken = await firebaseUser.getIdToken();

        const result = await createUserMutation({
          variables: {
            input: {
              idToken,
              email: firebaseUser.email,
            },
          },
          onError: (e) => {
            const gqlError = getGraphQLError(e, 0);

            if (gqlError) {
              if (gqlError.code === CreateUserError.AlreadyUserExisting) {
                Alert.alert('既にユーザーが存在しています');
              }
            }
          },
        });

        return result.data.createUser.id;
      } catch (error) {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('メールアドレスは既に使用されています');
          return;
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('無効なメールアドレスです');
          return;
        }

        if (error.code === 'auth/weak-password') {
          Alert.alert('パスワードは8文字以上にしてください');
          return;
        }

        Alert.alert(
          '何らかのエラーが発生しました',
          'メールアドレス、パスワードをもう一度確認してください'
        );
      }
    },
    []
  );

  return {
    signUpWithEmail,
  };
};
