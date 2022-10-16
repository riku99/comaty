import { useLayoutEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SimpleListItem } from 'src/components/ui/SimpleListItem';
import { useLogout } from 'src/hooks/auth/useLogout';

type Props = RootNavigationScreenProp<'AccountSetting'>;

export const AccountSettingScreen = ({ navigation }: Props) => {
  const { logout } = useLogout();

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
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SimpleListItem title="ログアウト" onPress={onLogoutPress} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
