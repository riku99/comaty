type AllStackParamList = import('../navigations/RootStack').RootStackParamList &
  import('../navigations/AuthStack').AuthStackParamList;

type RootNavigationScreenProp<
  T extends keyof AllStackParamList
> = import('@react-navigation/native-stack').NativeStackScreenProps<
  AllStackParamList,
  T
>;

type RootNavigationProp<
  T extends keyof AllStackParamList
> = import('@react-navigation/native-stack').NativeStackNavigationProp<
  AllStackParamList,
  T
>;
