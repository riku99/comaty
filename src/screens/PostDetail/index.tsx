import { useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import { PostCard } from 'src/components/domain/post/PostCard';
import { Loading } from 'src/components/ui/Loading';
import {
  GetPostError,
  useDeletePostMutation,
  usePostDetailScreenDataQuery,
} from 'src/generated/graphql';
import { getGraphQLError } from 'src/utils';

type Props = RootNavigationScreenProp<'PostDetail'>;

export const PostDetailScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const { data, loading } = usePostDetailScreenDataQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
    onError: (e) => {
      const gqError = getGraphQLError(e, 0);
      if (gqError && gqError.code === GetPostError.NotFound) {
        Alert.alert('投稿が見つかりません', '', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    },
  });

  const [deletePostMutation] = useDeletePostMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '投稿',
      headerShadowVisible: false,
    });
  }, [navigation]);

  if (loading) {
    return <Loading />;
  }

  const deleteHeaderPost = async () => {
    try {
      await deletePostMutation({
        variables: {
          id: data.post.id,
        },
        onCompleted: () => navigation.goBack(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PostCard
      postData={data.post}
      disableDetailNavigation
      onDelete={deleteHeaderPost}
    />
  );
};
