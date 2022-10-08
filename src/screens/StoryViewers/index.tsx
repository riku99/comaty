import { filter } from 'graphql-anywhere';
import { useCallback, useLayoutEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  ProfileImageFragment,
  ProfileImageFragmentDoc,
  StoryViewersScreenDataQuery,
  useStoryViewersScreenDataQuery,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'StoryViewers'>;

type UserItem =
  StoryViewersScreenDataQuery['story']['seenList']['edges'][number];

export const StoryViewersScreen = ({ navigation, route }: Props) => {
  const { storyId } = route.params;

  const { data, fetchMore } = useStoryViewersScreenDataQuery({
    variables: {
      storyId,
    },
    fetchPolicy: 'cache-and-network',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '閲覧したユーザー',
    });
  }, [navigation]);

  const renderUserItem = useCallback(
    ({ item }: { item: UserItem }) => {
      const { user } = item.node;
      return (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            navigation.goBack();
            navigation.navigate('UserProfile', {
              id: user.id,
            });
          }}
        >
          <ProfileImage
            imageData={filter<ProfileImageFragment>(
              ProfileImageFragmentDoc,
              user.firstProfileImage
            )}
            style={styles.profileImage}
          />

          <Text style={styles.nickname}>{user.nickname}</Text>
        </Pressable>
      );
    },
    [navigation]
  );

  if (!data?.story) {
    return <Loading />;
  }

  const infiniteLoad = async () => {
    const { pageInfo } = data.story.seenList;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;
      await fetchMore({
        variables: {
          seenListAfter: endCursor ? btoa(endCursor) : undefined,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <InfiniteFlatList
        data={data.story.seenList.edges}
        renderItem={renderUserItem}
        contentContainerStyle={styles.listContents}
        infiniteLoad={infiniteLoad}
        keyExtractor={(item) => item.node.id.toString()}
      />
    </View>
  );
};

const IMAGE_SIZE = 42;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContents: {
    paddingTop: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE,
  },
  nickname: {
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
