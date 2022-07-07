import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SignInScreen } from 'src/screens/SignIn';
import { BottomTab } from './BottomTab';

export type RootStackParamList = {
  BottomTab: undefined;
  SignIn: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
