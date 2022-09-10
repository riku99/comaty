import { filter } from 'graphql-anywhere';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { UserCardList } from 'src/components/domain/user/UserCardList';
import { Loading } from 'src/components/ui/Loading';
import {
  useNearbyUsersScreenDataQuery,
  UserCardListFragment,
  UserCardListFragmentDoc,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const NearbyUsersScreen = ({ navigation }: Props) => {
  const { data, fetchMore } = useNearbyUsersScreenDataQuery({
    variables: {
      first: TAKE_USER_COUNT,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'この辺にいるユーザー👀',
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
