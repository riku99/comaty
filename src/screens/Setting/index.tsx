import { Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SimpleListItem } from 'src/components/ui/SimpleListItem';
import {
  AgeVerificationStatus,
  useSettingScreenDataQuery,
} from 'src/generated/graphql';
import { useLogout } from 'src/hooks/auth/useLogout';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'Setting'>;

export const SettingScreen = ({ navigation }: Props) => {
  const { data } = useSettingScreenDataQuery();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '設定',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const { logout } = useLogout();

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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
        }}
      >
        <View>
          <Text style={styles.sectionTitle}>アカウント</Text>

          <View style={styles.sectionItems}>
            <SimpleListItem
              title="メールアドレス"
              rightText={'rrr00@gmail.com'}
            />
            <View style={styles.divider} />
            <SimpleListItem
              title="年齢確認"
              onPress={() => {
                if (AgeVerificationStatus.UnderReview) {
                  navigation.navigate('AgeVerificationUnderReview');
                } else {
                  navigation.navigate('AgeVerification');
                }
              }}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>ユーザー</Text>
          <View style={styles.sectionItems}>
            <SimpleListItem
              title="ブロックリスト"
              onPress={() => {
                navigation.navigate('BlockList');
              }}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 70,
          }}
        >
          <SimpleListItem title="ログアウト" onPress={onLogoutPress} />
          <View style={styles.divider} />
          <SimpleListItem
            title="アカウント削除"
            onPress={() => {
              navigation.navigate('DeleteAccountAlert');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  sectionContainer: {
    marginTop: 28,
  },
  sectionTitle: {
    marginLeft: 16,
    color: theme.gray.text,
  },
  sectionItems: {
    marginTop: 8,
  },
  divider: {
    width: '100%',
    height: 0.5,
    backgroundColor: theme.gray.boarder,
    marginLeft: 16,
  },
});
