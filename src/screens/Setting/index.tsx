import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';
import { ListItem } from './ListItem';

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
        <ListItem
          title="アカウント"
          icon={
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={26}
              color={theme.black}
            />
          }
        />

        <ListItem
          title="プッシュ通知"
          icon={<Entypo name="notification" size={24} color={theme.black} />}
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
