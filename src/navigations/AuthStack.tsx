import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { EmailSignInScreen } from 'src/screens/EmailSignIn';
import { EmailSignUpScreen } from 'src/screens/EmailSignUp';
import { SignUpScreen } from 'src/screens/SignUp';

export type AuthStackParamList = {
  SignUp: undefined;
  EmailSignUp: undefined;
  EmailSignIn: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
      <Stack.Screen name="EmailSignIn" component={EmailSignInScreen} />
    </Stack.Navigator>
  );
};
