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
import { LoadingWithMyProfileImage } from 'src/components/domain/me/LoadingWithMyProfileImage';
import { UserCard } from 'src/components/domain/user/UserCard';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { NoGeolocationPermission } from 'src/components/ui/NoGeolocationPermission';
import {
  HomeNearByUsersDocument,
  HomeScreenDataQuery,
  HomeStoriesDocument,
  HomeStoriesFragment,
  Order,
  useHomeScreenDataQuery,
  UserCardFragment,
  UserCardFragmentDoc,
  UserCursor,
} from 'src/generated/graphql';
import { useNarrowingDownConditions } from 'src/hooks/app/useNarrowingDownConditions';
import { useGeolocationPermitted } from 'src/hooks/geolocation/useGeolocationPermitted';
import { theme } from 'src/styles';
import { getRandomArrayIndex } from 'src/utils';
import { Stories } from './Stories';

type Props = RootNavigationScreenProp<'HomeMain'>;
type UserListItem = HomeScreenDataQuery['nearbyUsers']['edges'][number];

const userCursors = [
  UserCursor.IncrememtValue,
  UserCursor.Value1,
  UserCursor.Value2,
];

const userOrderList = [Order.Asc, Order.Desc];

export const HomeScreen = ({ navigation }: Props) => {
  const [initialPosition, setInitialPosition] = useState<{
    latitude: number;
    longitude: number;
  }>(null);
  const [cursor, setCursor] = useState(
    userCursors[getRandomArrayIndex(userCursors.length)]
  );
  // 初回のカーソルが IncrememtValue の場合は新しく作成されたユーザー順に最初は出したい
  const [order, setOrder] = useState(
    cursor === UserCursor.IncrememtValue
      ? Order.Desc
      : userOrderList[getRandomArrayIndex(userOrderList.length)]
  );
  const { narrowingDownCinditions } = useNarrowingDownConditions();
  const { data, fetchMore, refetch, loading } = useHomeScreenDataQuery({
    variables: {
      narrowingDownInput: {
        ...narrowingDownCinditions,
        latitude: initialPosition?.latitude ?? undefined,
        longitude: initialPosition?.longitude ?? undefined,
      },
      cursorInput: {
        cursor,
        order,
      },
    },
    skip: !initialPosition,
  });
  const isFirstRender = useRef(true);
  const [refreshing, setRefreshing] = useState(false);
  const [
    loadingByChanfingNarrowingDownInput,
    setLoadingByChanfingNarrowingDownInput,
  ] = useState(false);
  const { setGeolocationPermitted, geolocationPermitted } =
    useGeolocationPermitted();

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
        setGeolocationPermitted(true);
        Geolocation.getCurrentPosition(
          (position) => {
            setInitialPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.log(error);
            setGeolocationPermitted(false);
          }
        );
      } else {
        setGeolocationPermitted(false);
      }
    })();
  }, [setGeolocationPermitted]);

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
  }, [narrowingDownCinditions, refetch]);

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
    [navigation]
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const newCursor = userCursors[getRandomArrayIndex(userCursors.length)];
      const newOrder = userOrderList[getRandomArrayIndex(userOrderList.length)];
      setCursor(newCursor);
      setOrder(newOrder);
      await refetch({
        cursorInput: {
          cursor: newCursor,
          order: newOrder,
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  if (geolocationPermitted === false) {
    return <NoGeolocationPermission />;
  }

  if (loading || loadingByChanfingNarrowingDownInput || !initialPosition) {
    return <LoadingWithMyProfileImage />;
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
            cursorInput: {
              cursor,
              order,
            },
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
