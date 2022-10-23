import { MaterialCommunityIcons } from '@expo/vector-icons';
import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Pressable, RefreshControl, StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
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
import { useNarrowingDownConditions } from 'src/hooks/app/useNarrowingDownConditions';
import { theme } from 'src/styles';
import { Stories } from './Stories';

type Props = RootNavigationScreenProp<'HomeMain'>;

type UserListItem = HomeScreenDataQuery['nearbyUsers']['edges'][number];

export const HomeScreen = ({ navigation }: Props) => {
  const [gotInitialPosition, setGotInitialPosition] = useState(true);
  const { narrowingDownCinditions } = useNarrowingDownConditions();
  const { data, fetchMore, refetch, loading } = useHomeScreenDataQuery({
    variables: {
      narrowingDownInput: narrowingDownCinditions,
    },
    skip: !gotInitialPosition,
  });
  const isFirstRender = useRef(true);
  const [refreshing, setRefreshing] = useState(false);
  const [
    loadingByChanfingNarrowingDownInput,
    setLoadingByChanfingNarrowingDownInput,
  ] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => <HeaderLeftTitle title="ホーム🦄" />,
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate('NarrowingDown');
          }}
        >
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

  useEffect(() => {
    (async () => {
      const currentPermission = await Geolocation.requestAuthorization(
        'whenInUse'
      );
      if (
        currentPermission === 'granted' ||
        currentPermission === 'restricted'
      ) {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setGotInitialPosition(true);
          },
          (error) => {
            console.log(error);
            // 位置情報許可のグローバルステートをfalseにする
            setGotInitialPosition(true);
          }
        );
      } else {
        // 位置情報許可のグローバルステートをfalseにする
        setGotInitialPosition(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!isFirstRender.current) {
        try {
          setLoadingByChanfingNarrowingDownInput(true);
          await refetch({
            narrowingDownInput: narrowingDownCinditions,
          });
        } catch (e) {
          console.log(e);
        } finally {
          setLoadingByChanfingNarrowingDownInput(false);
        }
      } else {
        isFirstRender.current = false;
      }
    })();
  }, [narrowingDownCinditions]);

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

  if (loading || loadingByChanfingNarrowingDownInput || !gotInitialPosition) {
    return <Loading />;
  }

  if (!data?.me) {
    return null;
  }

  const infiniteLoadUsers = async () => {
    const { pageInfo } = data.nearbyUsers;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;
      try {
        await fetchMore({
          variables: {
            nearbyUsersAfter: endCursor ? btoa(endCursor) : undefined,
            nearbyUsersFirst: TAKE_USER_COUNT,
            narrowingDownInput: narrowingDownCinditions,
          },
          query: HomeNearByUsersDocument,
        });
      } catch (e) {
        console.log(e);
      }
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
          narrowingDownInput: narrowingDownCinditions,
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
          justifyContent: 'space-between',
          paddingHorizontal: 8,
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
