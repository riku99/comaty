import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useCallback } from 'react';
import { loginProviders } from 'src/constants';
import {
  useCreateUserMutation,
  useGetInitialDataLazyQuery,
  useGetMeLazyQuery,
} from 'src/generated/graphql';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';
import { useLoggedIn } from './useLoggedIn';

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

      await meQuery({
        fetchPolicy: 'no-cache',
        onCompleted: async (meData) => {
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
                  storage.set(
                    mmkvStorageKeys.loginProviders,
                    loginProviders.google
                  );
                },
              });
            } catch (e) {
              console.log(e);
            }
          } else {
            try {
              await getInitialData({
                fetchPolicy: 'network-only',
                onCompleted: () => {
                  setLoggedIn(true);
                  storage.set(
                    mmkvStorageKeys.loginProviders,
                    loginProviders.google
                  );
                },
              });
            } catch (e) {
              console.log(e);
            }
          }
        },
      });
    } catch (e) {
      console.log(e);
    }
  }, [createUser, getInitialData, meQuery, setLoggedIn]);

  return {
    signUpWithGoogle,
  };
};
