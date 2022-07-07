import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { EmailLoginScreen } from 'src/screens/EmaiLogin';
import { SignInScreen } from 'src/screens/SignIn';

export type AuthStackParamList = {
  SignIn: undefined;
  EmailLogin: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
    </Stack.Navigator>
  );
};
