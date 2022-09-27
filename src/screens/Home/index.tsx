import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { UserCard } from 'src/components/domain/user/UserCard';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  HomeNearByUsersDocument,
  HomeScreenDataQuery,
  useHomeScreenDataQuery,
  UserCardFragment,
  UserCardFragmentDoc,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'BottomTab'>;

type UserListItem = HomeScreenDataQuery['nearbyUsers']['edges'][number];

export const HomeScreen = ({ navigation }: Props) => {
  const { data, fetchMore } = useHomeScreenDataQuery();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => <HeaderLeftTitle title="ホーム🦄" />,
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
            containerStyle={{
              marginTop: index % 2 !== 0 ? 30 : 0,
              transform: [
                { translateY: index % 2 === 0 && index !== 0 ? -15 : 0 },
              ],
            }}
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

  return (
    <View style={styles.container}>
      <InfiniteFlatList
        data={data.nearbyUsers.edges}
        renderItem={renderUser}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
        infiniteLoad={infiniteLoadUsers}
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
  contentContainer: {
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 16,
    transform: [{ scale: 0.97 }],
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
  },
  singleWord: {
    marginTop: 6,
  },
});

// type TopTabParamList = {
//   Activity: undefined;
//   Question: undefined;
// };

// const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

// export const _HomeScreen = ({ navigation }: Props) => {
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShadowVisible: false,
//       headerLeft: () => <HeaderLeftTitle title="ホーム🦄" />,
//       headerTitle: '',
//     });
//   }, [navigation]);

//   return (
//     <>
//       <TopTab.Navigator
//         screenOptions={{
//           tabBarStyle: {
//             height: 40,
//           },
//           tabBarLabelStyle: {
//             fontSize: 12,
//             fontWeight: '500',
//           },
//           tabBarIndicatorStyle: {
//             backgroundColor: theme.primary,
//             width: 100,
//             height: 1.5,
//           },
//           tabBarIndicatorContainerStyle: {
//             marginLeft: screenWidth / 4,
//             transform: [{ translateX: -50 }],
//           },
//         }}
//       >
//         <TopTab.Screen
//           name="Activity"
//           component={Activity}
//           options={{
//             tabBarLabel: 'アクテビティ',
//           }}
//         />
//         <TopTab.Screen
//           name="Question"
//           component={Questions}
//           options={{
//             tabBarLabel: 'そこ質',
//           }}
//         />
//       </TopTab.Navigator>
//     </>
//   );
// };
