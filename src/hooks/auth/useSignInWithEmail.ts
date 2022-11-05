import auth from '@react-native-firebase/auth';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { loginProviders } from 'src/constants';
import { useGetInitialDataLazyQuery } from 'src/generated/graphql';
import { useLoadingOverlayVisible } from 'src/hooks/app/useLoadingOverlayVisible';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';
import { useLoggedIn } from './useLoggedIn';

export const useSignInWithEmail = () => {
  const { setLoggedIn } = useLoggedIn();
  const [getInitialData] = useGetInitialDataLazyQuery();
  const { setLoadingVisible } = useLoadingOverlayVisible();

  const signInWithEmail = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        await auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        Alert.alert(
          'ログインに失敗しました',
          'メールアドレスまたはパスワードが間違っています。'
        );
        return;
      }

      try {
        await getInitialData({
          onCompleted: (d) => {
            if (d.me) {
              setLoggedIn(true);
              storage.set(mmkvStorageKeys.loginProviders, loginProviders.email);
              setLoadingVisible(false); // lazyQueryのバグでPromiseが返されない場合があるので、このhooks内でもローディング閉じる処理書く
            }
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  return {
    signInWithEmail,
  };
};
