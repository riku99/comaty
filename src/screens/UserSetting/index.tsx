import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SimpleListItem } from 'src/components/ui/SimpleListItem';

type Props = RootNavigationScreenProp<'UserSetting'>;

export const UserSettingScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ユーザー設定',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SimpleListItem
          title="ブロックリスト"
          onPress={() => {
            navigation.navigate('BlockList');
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
