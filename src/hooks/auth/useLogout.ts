import { useApolloClient } from '@apollo/client';
import auth from '@react-native-firebase/auth';
import { useCallback } from 'react';
import { useLogoutMutation } from 'src/generated/graphql';
import { storage } from 'src/storage/mmkv';
import { useLoggedIn } from './useLoggedIn';

export const useLogout = () => {
  const client = useApolloClient();
  const [logoutMutation] = useLogoutMutation();
  const { setLoggedIn } = useLoggedIn();

  const logout = useCallback(async () => {
    try {
      const firebaseUser = auth().currentUser;

      // 退会処理の場合もuseSignOutが呼ばれるが、sign out用のミューテーションはいらない
      // アカウント削除処理でfirebaseUserも削除しているのでそれで判定する
      if (!firebaseUser) {
        return;
      }

      await logoutMutation();
    } catch (e) {
      console.log(e);
    } finally {
      await Promise.all([auth().signOut(), client.clearStore()]);
      storage.clearAll();
      setLoggedIn(false);

      console.log('👋 Sign out success!');
    }
  }, [client, logoutMutation]);

  return {
    logout,
  };
};
