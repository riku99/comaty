import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SimpleListItem } from 'src/components/ui/SimpleListItem';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'Setting'>;

export const SettingScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '設定',
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
          title="プッシュ通知"
          icon={<Entypo name="notification" size={24} color={theme.black} />}
        />

        <SimpleListItem
          title="ユーザー"
          icon={<Feather name="users" size={23} color={theme.black} />}
          onPress={() => {
            navigation.navigate('UserSetting');
          }}
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
