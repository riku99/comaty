import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';

type Props = RootNavigationScreenProp<'SignIn'>;

export const SignInScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return <View></View>;
};
