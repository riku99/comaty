import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { PostCard } from 'src/components/domain/post/PostCard';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  ActivityPostsDocument,
  ActivityScreenDataQuery,
  PostCardFragment,
  PostCardFragmentDoc,
  useActivityScreenDataQuery,
} from 'src/generated/graphql';
import { Stories } from './Stories';

type PostItem = ActivityScreenDataQuery['posts']['edges'][number];

const TAKE_POST_COUNT = 20;

export const Activity = () => {
  const { data, fetchMore } = useActivityScreenDataQuery({
    variables: {
      postsFirst: TAKE_POST_COUNT,
    },
  });

  const renderPostItem = useCallback(({ item }: { item: PostItem }) => {
    return (
      <MotiView
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 700,
          type: 'timing',
        }}
      >
        <PostCard
          postData={filter<PostCardFragment>(PostCardFragmentDoc, item.node)}
        />
      </MotiView>
    );
  }, []);

  if (!data) {
    return <Loading />;
  }

  const infiniteLoadPost = async () => {
    const { pageInfo } = data.posts;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;
      await fetchMore({
        variables: {
          postsAfter: endCursor ? btoa(endCursor) : undefined,
          postsFirst: TAKE_POST_COUNT,
        },
        query: ActivityPostsDocument,
      });
    }
  };

  return (
    <View style={styles.container}>
      <InfiniteFlatList<PostItem>
        data={data.posts.edges}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.node.id.toString()}
        contentContainerStyle={{ paddingTop: 16 }}
        ListHeaderComponent={() => <Stories />}
        infiniteLoad={infiniteLoadPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
