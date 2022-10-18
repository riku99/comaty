import { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { PostCard } from 'src/components/domain/post/PostCard';
import { Loading } from 'src/components/ui/Loading';
import { usePostDetailScreenDataQuery } from 'src/generated/graphql';
import { useDeletePost } from 'src/hooks/post';

type Props = RootNavigationScreenProp<'PostDetail'>;

export const PostDetailScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const { data } = usePostDetailScreenDataQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });
  const { deletePost } = useDeletePost();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '投稿・返信',
      headerShadowVisible: false,
    });
  }, [navigation]);

  if (!data) {
    return <Loading />;
  }

  const deleteHeaderPost = async () => {
    await deletePost(data.post.id);
    navigation.goBack();
  };

  return (
    <PostCard
      postData={data.post}
      disableDetailNavigation
      onDelete={deleteHeaderPost}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 30,
  },
  replyToMessage: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quoteLine: {
    width: 6,
    backgroundColor: '#cccccc',
    height: '100%',
    borderRadius: 4,
  },
  quoteText: {
    marginLeft: 6,
    fontWeight: 'bold',
  },
});
