import { useApolloClient } from '@apollo/client';
import auth from '@react-native-firebase/auth';
import { useLayoutEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SimpleListItem } from 'src/components/ui/SimpleListItem';
import { useDeleteAccountMutation } from 'src/generated/graphql';
import { useLoadingOverlayVisible } from 'src/hooks/app/useLoadingOverlayVisible';
import { useLoggedIn } from 'src/hooks/auth/useLoggedIn';
import { useLogout } from 'src/hooks/auth/useLogout';
import { storage } from 'src/storage/mmkv';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'AccountSetting'>;

export const AccountSettingScreen = ({ navigation }: Props) => {
  const { logout } = useLogout();
  const [deleteAccountMutation] = useDeleteAccountMutation();
  const { setLoadingVisible } = useLoadingOverlayVisible();
  const client = useApolloClient();
  const { setLoggedIn } = useLoggedIn();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'アカウント設定',
    });
  }, [navigation]);

  const onLogoutPress = () => {
    Alert.alert('ログアウトしてよろしいですか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: 'ログアウト',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const onDeleteAccountPress = async () => {
    Alert.alert(
      'アカウントを削除してよろしいですか？',
      'ストーリ、投稿、メッセージなどのコンテンツが全て削除され、元に戻すことはできません。\nサブスクリプションで課金している方は端末の方から解約をお願いします。',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoadingVisible(true);
              await deleteAccountMutation();
              await auth().signOut();
              await client.clearStore();
              storage.clearAll();
              setLoggedIn(false);
              console.log('🆗 Deleted account');
            } catch (e) {
              console.log(e);
            } finally {
              setLoadingVisible(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SimpleListItem title="ログアウト" onPress={onLogoutPress} />
        <SimpleListItem
          title="アカウント削除"
          titleStyle={{
            color: theme.red,
          }}
          onPress={onDeleteAccountPress}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
