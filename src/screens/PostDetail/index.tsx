import { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { PostCard } from 'src/components/domain/post/PostCard';
import { Loading } from 'src/components/ui/Loading';
import {
  PostDetailScreenDataQuery,
  usePostDetailScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'PostDetail'>;

type Item = PostDetailScreenDataQuery['post']['replys'][number];

export const PostDetailScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const { data, refetch } = usePostDetailScreenDataQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

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

  return (
    <View style={styles.container}>
      <FlatList
        data={data.post.replys}
        renderItem={renderPosts}
        ListHeaderComponent={<PostCard postData={data.post} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponentStyle={styles.header}
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
    backgroundColor: theme.gray.background,
  },
  header: {
    paddingBottom: 30,
  },
});
