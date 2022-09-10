import { filter } from 'graphql-anywhere';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { UserCardList } from 'src/components/domain/user/UserCardList';
import { Loading } from 'src/components/ui/Loading';
import {
  useNearbyUsersQuery,
  UserCardListFragment,
  UserCardListFragmentDoc,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  // スクリーン変更する際にクエリ名も変更する
  const { data, fetchMore } = useNearbyUsersQuery({
    variables: {
      first: TAKE_USER_COUNT,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'この辺にいるユーザー👀',
      headerShadowVisible: false,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 22,
      },
    });
  }, [navigation]);

  const onUserCardPress = (id: string) => {
    navigation.navigate('UserProfile', { id });
  };

  if (!data) {
    return <Loading />;
  }

  const infiniteLoad = async () => {
    const { pageInfo } = data.nearbyUsers;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;
      await fetchMore({
        variables: {
          after: endCursor ? btoa(endCursor) : undefined,
          first: TAKE_USER_COUNT,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <UserCardList
        onCardPress={onUserCardPress}
        userListData={filter<UserCardListFragment>(
          UserCardListFragmentDoc,
          data.nearbyUsers
        )}
        infiniteLoad={infiniteLoad}
        takeItemCount={TAKE_USER_COUNT}
      />
    </View>
  );
};

const TAKE_USER_COUNT = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
