import { filter } from 'graphql-anywhere';
import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Post } from 'src/components/domain/post/Post';
import {
  ActivityScreenDataQuery,
  PostFragment,
  PostFragmentDoc,
  useActivityScreenDataQuery,
} from 'src/generated/graphql';
import { range } from 'src/utils';
import { Stories } from './Stories';

type PostItem = ActivityScreenDataQuery['posts']['edges'][number];

export const Activity = () => {
  const { data } = useActivityScreenDataQuery();

  const renderPostItem = useCallback(({ item }: { item: PostItem }) => {
    return <Post postData={filter<PostFragment>(PostFragmentDoc, item.node)} />;
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
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
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
