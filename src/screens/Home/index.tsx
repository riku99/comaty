import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { UserCardList } from 'src/components/domain/user/UserCardList';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '近くにいるユーザー',
      headerShadowVisible: false,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22,
      },
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
});
