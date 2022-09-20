import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import { useCallback, useState } from 'react';
import { Pressable, RefreshControl, StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { PostCard } from 'src/components/domain/post/PostCard';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  ActivityPostsDocument,
  ActivityScreenDataQuery,
  ActivityStoriesDocument,
  ActivityStoriesFragment,
  ActivityStoriesFragmentDoc,
  PostCardFragment,
  PostCardFragmentDoc,
  useActivityScreenDataQuery,
} from 'src/generated/graphql';
import { useDeletePost } from 'src/hooks/post';
import { theme } from 'src/styles';
import { Stories } from './ActivityStories';
import { CreatingPost } from './CreatingPost';

type PostItem = ActivityScreenDataQuery['posts']['edges'][number];

const TAKE_POST_COUNT = 20;
const TAKE_STORY_COUNT = 15;

export const Activity = () => {
  const { data, fetchMore, refetch } = useActivityScreenDataQuery({
    variables: {
      postsFirst: TAKE_POST_COUNT,
    },
  });
  const navigation = useNavigation<RootNavigationProp<'BottomTab'>>();
  const [refreshing, setRefreshing] = useState(false);
  const { deletePost } = useDeletePost();

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

  const renderPostItem = useCallback(({ item }: { item: PostItem }) => {
    const onPostDelete = async () => {
      await deletePost(item.node.id);
    };

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
          onDelete={onPostDelete}
        />
      </MotiView>
    );
  }, []);

  const infiniteLoadStories = async () => {
    const { pageInfo } = data.stories;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;
      await fetchMore({
        variables: {
          storiesAfter: endCursor ? btoa(endCursor) : undefined,
          storiesFirst: TAKE_STORY_COUNT,
        },
        query: ActivityStoriesDocument,
      });
    }
  };

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
        ListHeaderComponent={
          <View>
            <Stories
              storiesData={filter<ActivityStoriesFragment>(
                ActivityStoriesFragmentDoc,
                data
              )}
              infiniteLoadStories={infiniteLoadStories}
            />

            <CreatingPost />
          </View>
        }
        infiniteLoad={infiniteLoadPost}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Pressable
        style={styles.createButton}
        onPress={() => {
          navigation.navigate('PostCreation');
        }}
      >
        <Ionicons
          name="create-outline"
          size={30}
          color="#fff"
          style={styles.createButtonIcon}
        />
      </Pressable>
    </View>
  );
};

const CREATE_BUTTON_SIZE = 62;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.primary,
    height: CREATE_BUTTON_SIZE,
    width: CREATE_BUTTON_SIZE,
    borderRadius: CREATE_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonIcon: {
    marginLeft: 4,
  },
});
