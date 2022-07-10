import { useReactiveVar } from '@apollo/client';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import {
  CreateUserError,
  useCreateUserMutation,
  useGetInitialDataLazyQuery,
  useGetMeLazyQuery,
} from 'src/generated/graphql';
import { loggedInVar } from 'src/stores/loggedIn';
import { getGraphQLError } from 'src/utils';

GoogleSignin.configure({
  webClientId: Config.GOOGLE_WEB_CLIENT_ID,
});

export const useLoggedIn = () => {
  const loggedIn = useReactiveVar(loggedInVar);

  const setLoggedIn = useCallback((value: boolean) => {
    loggedInVar(value);
  }, []);

  return {
    loggedIn,
    setLoggedIn,
  };
};

export const useSignUpWithEmail = () => {
  const [createUserMutation] = useCreateUserMutation();
  const { setLoggedIn } = useLoggedIn();

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
          onCompleted: () => {
            setLoggedIn(true);
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
    [createUserMutation, setLoggedIn]
  );

  return {
    signUpWithEmail,
  };
};

export const useSignUpWithApple = () => {
  const [meQuery] = useGetMeLazyQuery();
  const [createUser] = useCreateUserMutation();
  const { setLoggedIn } = useLoggedIn();
  const [getInitialData] = useGetInitialDataLazyQuery();

  const signUpWithApple = useCallback(async () => {
    try {
      const appleAuthResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL],
      });

      if (!appleAuthResponse.identityToken) {
        Alert.alert('無効なアカウントです');
        return;
      }

      const { identityToken, nonce } = appleAuthResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
      );
      const appleData = await auth().signInWithCredential(appleCredential);

      const idToken = await appleData.user.getIdToken();

      const { data: meData } = await meQuery({
        fetchPolicy: 'no-cache',
      });

      if (!meData?.me) {
        try {
          await createUser({
            variables: {
              input: {
                idToken,
                email: appleData.user.email,
              },
            },
            onCompleted: () => {
              setLoggedIn(true);
            },
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        await getInitialData({
          fetchPolicy: 'network-only',
          onCompleted: () => {
            setLoggedIn(true);
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [createUser, getInitialData, meQuery, setLoggedIn]);

  return {
    signUpWithApple,
  };
};

export const useSignUpWithGoogle = () => {
  const [meQuery] = useGetMeLazyQuery();
  const [createUser] = useCreateUserMutation();
  const { setLoggedIn } = useLoggedIn();
  const [getInitialData] = useGetInitialDataLazyQuery();

  const signUpWithGoogle = useCallback(async () => {
    try {
      const { idToken: googleIdToken } = await GoogleSignin.signIn();
      const googleCredential =
        auth.GoogleAuthProvider.credential(googleIdToken);
      const googleResult = await auth().signInWithCredential(googleCredential);

      const userIdToken = await googleResult.user.getIdToken();

      const { data: meData } = await meQuery({
        fetchPolicy: 'no-cache',
      });

      if (!meData?.me) {
        try {
          await createUser({
            variables: {
              input: {
                idToken: userIdToken,
                email: googleResult.user.email,
              },
            },
            onCompleted: () => {
              setLoggedIn(true);
            },
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        await getInitialData({
          fetchPolicy: 'network-only',
          onCompleted: () => {
            setLoggedIn(true);
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [createUser, getInitialData, meQuery, setLoggedIn]);

  return {
    signUpWithGoogle,
  };
};
