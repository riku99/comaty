import { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { PostCard } from 'src/components/domain/post/PostCard';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  TimelineScreenDataQuery,
  useTimelineScreenDataQuery,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'BottomTab'>;

type PostItem = TimelineScreenDataQuery['posts']['edges'][number];

export const TimelineScreen = ({ navigation }: Props) => {
  const { data, fetchMore } = useTimelineScreenDataQuery();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => (
        <View style={{ marginLeft: 16 }}>
          <HeaderLeftTitle title="タイムライン" />
        </View>
      ),
      headerTitle: '',
    });
  }, [navigation]);

  const renderPostItem = useCallback(
    ({ item }: { item: PostItem }) => {
      return <PostCard postData={item.node} onDelete={async () => {}} />;
    },
    [navigation]
  );

  if (!data?.posts) {
    return <Loading />;
  }

  const infiniteLoad = async () => {
    const { pageInfo } = data.posts;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;

      await fetchMore({
        variables: {
          after: endCursor ? btoa(endCursor) : undefined,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <InfiniteFlatList
        data={data.posts.edges}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.node.id.toString()}
        infiniteLoad={infiniteLoad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
