import { useApolloClient } from '@apollo/client';
import auth from '@react-native-firebase/auth';
import { Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/ui/BottomAnimatedButton';
import { useDeleteAccountMutation } from 'src/generated/graphql';
import { useLoadingOverlayVisible } from 'src/hooks/app/useLoadingOverlayVisible';
import { useLoggedIn } from 'src/hooks/auth/useLoggedIn';
import { storage } from 'src/storage/mmkv';

type Props = RootNavigationScreenProp<'DeleteAccountAlert'>;

export const DeleteAccountAlertScreen = ({ navigation }: Props) => {
  const { setLoadingVisible } = useLoadingOverlayVisible();
  const [deleteAccountMutation] = useDeleteAccountMutation();
  const client = useApolloClient();
  const { setLoggedIn } = useLoggedIn();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'アカウント削除のご注意',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const onDeletePress = async () => {
    Alert.alert(
      'アカウントを削除してよろしいですか？',
      '元に戻すことはできません。',
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
      <Text>色々な注意</Text>

      <BottomAnimatedButton title="削除する" onPress={onDeletePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
