import { useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { UserCard } from 'src/components/domain/user/UserCard';
import { Loading } from 'src/components/ui/Loading';
import {
  GroupMembersScreenDataQuery,
  useGroupMembersScreenDataQuery,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'GroupMembers'>;

type UserItem = GroupMembersScreenDataQuery['group']['members'][number];

export const GroupMembersScreen = ({ navigation, route }: Props) => {
  const { groupId, userId } = route.params;
  const { data, loading } = useGroupMembersScreenDataQuery({
    variables: {
      groupId,
    },
  });

  const filteredMembers = useMemo(() => {
    if (!data) {
      return;
    }

    return data.group.members.filter((m) => m.user.id !== userId);
  }, [data]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '一緒にいるユーザー',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const renderUserItem = useCallback(({ item }: { item: UserItem }) => {
    const onPress = () => {
      navigation.push('UserProfile', {
        id: item.user.id,
      });
    };

    return <UserCard userCardData={item.user} onPress={onPress} />;
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data.group) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredMembers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}
        numColumns={2}
        contentContainerStyle={styles.memberContaienr}
        ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memberContaienr: {
    paddingTop: 12,
    paddingBottom: 32,
  },
});
