import { filter } from 'graphql-anywhere';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { UserCardList } from 'src/components/domain/user/UserCardList';
import {
  useNearbyUsersQuery,
  UserCardListFragment,
  UserCardListFragmentDoc,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  const { data, error } = useNearbyUsersQuery();

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

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <UserCardList
        onCardPress={onUserCardPress}
        fragment={filter<UserCardListFragment>(
          UserCardListFragmentDoc,
          data.nearbyUsers
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
