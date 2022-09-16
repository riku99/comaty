import { useCallback, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { PostCard } from 'src/components/domain/post/PostCard';
import { Loading } from 'src/components/ui/Loading';
import {
  PostDetailScreenDataQuery,
  usePostDetailScreenDataQuery,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'PostDetail'>;

type Item = PostDetailScreenDataQuery['post']['replys'][number];

export const PostDetailScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const { data } = usePostDetailScreenDataQuery({
    variables: {
      id,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '投稿・返信',
    });
  }, [navigation]);

  const renderPosts = useCallback(({ item }: { item: Item }) => {
    return <PostCard postData={item} />;
  }, []);

  if (!data) {
    return <Loading />;
  }

  console.log(data.post.replys);
  return (
    <View style={styles.container}>
      <FlatList
        data={data.post.replys}
        renderItem={renderPosts}
        ListHeaderComponent={<PostCard postData={data.post} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
