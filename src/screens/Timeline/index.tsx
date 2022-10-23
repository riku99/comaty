import { useCallback, useLayoutEffect, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { PostCard } from 'src/components/domain/post/PostCard';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  TimelineScreenDataQuery,
  useTimelineScreenDataQuery,
} from 'src/generated/graphql';
import { useNarrowingDownConditions } from 'src/hooks/app/useNarrowingDownConditions';
import { useDeletePost } from 'src/hooks/post';

type Props = RootNavigationScreenProp<'Timeline'>;

type PostItem = TimelineScreenDataQuery['posts']['edges'][number];

export const TimelineScreen = ({ navigation }: Props) => {
  const { narrowingDownCinditions } = useNarrowingDownConditions();
  const { data, fetchMore, refetch } = useTimelineScreenDataQuery({
    variables: {
      input: narrowingDownCinditions,
    },
  });

  const [refreshing, setRefreshing] = useState(false);
  const { deletePost } = useDeletePost();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => (
        <View style={{ marginLeft: 16 }}>
          <HeaderLeftTitle title="タイムライン" />
        </View>
      ),
      headerTitle: '',
    });
  }, [navigation]);

  const renderPostItem = useCallback(
    ({ item }: { item: PostItem }) => {
      const onPostDelete = async () => {
        try {
          await deletePost(item.node.id);
        } catch (e) {
          console.log(e);
        }
      };

      return <PostCard postData={item.node} onDelete={onPostDelete} />;
    },
    [navigation]
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({
        input: narrowingDownCinditions,
      });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  if (!data?.posts) {
    return <Loading />;
  }

  const infiniteLoad = async () => {
    const { pageInfo } = data.posts;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;

      await fetchMore({
        variables: {
          after: endCursor ? btoa(endCursor) : undefined,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <InfiniteFlatList
        data={data.posts.edges}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.node.id.toString()}
        infiniteLoad={infiniteLoad}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
