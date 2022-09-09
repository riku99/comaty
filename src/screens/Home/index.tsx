import { Text } from '@rneui/themed';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { UserCardList } from 'src/components/domain/UserCardList';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
      headerLeft: () => <Text style={styles.headerTitle}>近くのユーザー</Text>,
    });
  }, [navigation]);

  const onUserCardPress = (id: number) => {
    navigation.navigate('UserProfile');
  };

  return (
    <View style={styles.container}>
      <UserCardList onCardPress={onUserCardPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 16,
  },
});
