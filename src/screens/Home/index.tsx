import { MaterialCommunityIcons } from '@expo/vector-icons';
import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import { useCallback, useLayoutEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { UserCard } from 'src/components/domain/user/UserCard';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  HomeNearByUsersDocument,
  HomeScreenDataQuery,
  HomeStoriesDocument,
  HomeStoriesFragment,
  useHomeScreenDataQuery,
  UserCardFragment,
  UserCardFragmentDoc,
} from 'src/generated/graphql';
import { theme } from 'src/styles';
import { Stories } from './Stories';

type Props = RootNavigationScreenProp<'HomeMain'>;

type UserListItem = HomeScreenDataQuery['nearbyUsers']['edges'][number];

export const HomeScreen = ({ navigation }: Props) => {
  const { data, fetchMore } = useHomeScreenDataQuery();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => <HeaderLeftTitle title="ホーム🦄" />,
      headerRight: () => (
        <Pressable>
          <MaterialCommunityIcons
            name="text-search"
            size={24}
            color={theme.black}
          />
        </Pressable>
      ),
      headerTitle: '',
    });
  }, [navigation]);

  const renderUser = useCallback(
    ({ item, index }: { item: UserListItem; index: number }) => {
      return (
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: {
              type: 'timing',
              duration: 1200,
            },
            scale: {
              type: 'timing',
              duration: 500,
            },
          }}
          delay={(index % TAKE_USER_COUNT) * CARD_DELAY}
        >
          <UserCard
            onPress={(id: string) => {
              navigation.navigate('UserProfile', { id });
            }}
            userCardData={filter<UserCardFragment>(
              UserCardFragmentDoc,
              item.node
            )}
          />
        </MotiView>
      );
    },
    []
  );

  if (!data) {
    return <Loading />;
  }

  const infiniteLoadUsers = async () => {
    const { pageInfo } = data.nearbyUsers;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;
      await fetchMore({
        variables: {
          nearbyUsersAfter: endCursor ? btoa(endCursor) : undefined,
          nearbyUsersFirst: TAKE_USER_COUNT,
        },
        query: HomeNearByUsersDocument,
      });
    }
  };

  const infiniteLoadStories = async () => {
    const { pageInfo } = data.storyUsers;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;
      await fetchMore({
        variables: {
          storiesAfter: endCursor ? btoa(endCursor) : undefined,
          storiesFirst: TAKE_USER_COUNT,
        },
        query: HomeStoriesDocument,
      });
    }
  };
  return (
    <View style={styles.container}>
      <InfiniteFlatList
        data={data.nearbyUsers.edges}
        renderItem={renderUser}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
        infiniteLoad={infiniteLoadUsers}
        ListHeaderComponent={
          <Stories
            storiesData={filter<HomeStoriesFragment>(HomeStoriesDocument, data)}
            infiniteLoadStories={infiniteLoadStories}
          />
        }
        ListHeaderComponentStyle={styles.listHeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const TAKE_USER_COUNT = 20;
const CARD_DELAY = 170;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    paddingTop: 8,
    paddingBottom: 12,
  },
});
