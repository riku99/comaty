import { filter } from 'graphql-anywhere';
import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { PostCard } from 'src/components/domain/post/PostCard';
import {
  ActivityScreenDataQuery,
  PostCardFragment,
  PostCardFragmentDoc,
  useActivityScreenDataQuery,
} from 'src/generated/graphql';
import { range } from 'src/utils';
import { Stories } from './Stories';

type PostItem = ActivityScreenDataQuery['posts']['edges'][number];

export const Activity = () => {
  const { data } = useActivityScreenDataQuery();

  const renderPostItem = useCallback(({ item }: { item: PostItem }) => {
    return (
      <PostCard
        postData={filter<PostCardFragment>(PostCardFragmentDoc, item.node)}
      />
    );
  }, []);

  if (!data) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.posts.edges}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.node.id.toString()}
        contentContainerStyle={{ paddingTop: 16 }}
        ListHeaderComponent={() => <Stories />}
        ListHeaderComponentStyle={{ paddingBottom: 20 }}
        // ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
      />
    </View>
  );
};

const arr = [...range(0, 20)];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
