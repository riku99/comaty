import { filter } from 'graphql-anywhere';
import { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { PostCard } from 'src/components/domain/post/PostCard';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  MyPostsScreenDataDocument,
  MyPostsScreenDataQuery,
  PostCardFragment,
  PostCardFragmentDoc,
  useDeletePostMutation,
  useMyPostsScreenDataQuery,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'MyPosts'>;

type PostItem = MyPostsScreenDataQuery['me']['posts']['edges'][number];

export const MyPostsScreen = ({ navigation }: Props) => {
  const { data } = useMyPostsScreenDataQuery({
    fetchPolicy: 'network-only',
  });
  const [deletePostMutation] = useDeletePostMutation();
  const toast = useToast();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'マイ投稿',
    });
  }, [navigation]);

  const renderPostItem = useCallback(
    ({ item }: { item: PostItem }) => {
      const onDelete = async () => {
        try {
          await deletePostMutation({
            variables: {
              id: item.node.id,
            },
            refetchQueries: [
              {
                query: MyPostsScreenDataDocument,
              },
            ],
            onCompleted: () => {
              toast.show('削除しました');
            },
          });
        } catch (e) {
          console.log(e);
        }
      };

      return (
        <PostCard
          postData={filter<PostCardFragment>(PostCardFragmentDoc, item.node)}
          onDelete={onDelete}
        />
      );
    },
    [navigation]
  );

  if (!data?.me) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <InfiniteFlatList
        data={data.me.posts.edges}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.node.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
