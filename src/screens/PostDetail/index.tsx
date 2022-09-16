import { Text } from '@rneui/themed';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
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
  const { data, refetch } = usePostDetailScreenDataQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-and-network',
  });
  const [refreshing, setRefreshing] = useState(false);
  const listRef = useRef<FlatList>(null);

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

  const { replyToPost } = data.post;

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={data.post.replys}
        renderItem={renderPosts}
        ListHeaderComponent={
          <View>
            {replyToPost && (
              <Pressable
                style={styles.replyToMessage}
                onPress={() => {
                  navigation.push('PostDetail', {
                    id: replyToPost.id,
                  });
                }}
              >
                <View style={styles.quoteLine} />
                <Text style={styles.quoteText}>{replyToPost.text}</Text>
              </Pressable>
            )}
            <PostCard postData={data.post} disableDetailNavigation />
          </View>
        }
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
