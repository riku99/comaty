import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SimpleListItem } from 'src/components/ui/SimpleListItem';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'Setting'>;

export const SettingScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '設定',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SimpleListItem
          title="アカウント"
          icon={
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={26}
              color={theme.black}
            />
          }
          onPress={() => {
            navigation.navigate('AccountSetting');
          }}
        />

        <SimpleListItem
          title="ユーザー"
          icon={<Feather name="users" size={23} color={theme.black} />}
          onPress={() => {
            navigation.navigate('UserSetting');
          }}
        />

        <SimpleListItem
          title="年齢確認"
          onPress={() => {
            navigation.navigate('AgeVerification');
          }}
          style={{
            backgroundColor: '#fff',
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
});
