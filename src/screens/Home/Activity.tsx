import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { PostCard } from 'src/components/domain/post/PostCard';
import { Loading } from 'src/components/ui/Loading';
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
      <MotiView
        from={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1000,
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

  return (
    <View style={styles.container}>
      <FlatList
        data={data.posts.edges}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.node.id.toString()}
        contentContainerStyle={{ paddingTop: 16 }}
        ListHeaderComponent={() => <Stories />}
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
