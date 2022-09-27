import { filter } from 'graphql-anywhere';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import { UserCardList } from 'src/components/domain/user/UserCardList';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { Loading } from 'src/components/ui/Loading';
import {
  HomeNearByUsersDocument,
  useHomeScreenDataQuery,
  UserCardListFragment,
  UserCardListFragmentDoc,
} from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  const { data, fetchMore } = useHomeScreenDataQuery();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerLeft: () => <HeaderLeftTitle title="ホーム🦄" />,
      headerTitle: '',
    });
  }, [navigation]);

  const onUserCardPress = (id: string) => {
    navigation.navigate('UserProfile', { id });
  };

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
      <UserCardList
        onCardPress={onUserCardPress}
        userListData={filter<UserCardListFragment>(
          UserCardListFragmentDoc,
          data.nearbyUsers
        )}
        infiniteLoad={infiniteLoadUsers}
        takeItemCount={TAKE_USER_COUNT}
      />
    </View>
  );
};

const TAKE_USER_COUNT = 20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
