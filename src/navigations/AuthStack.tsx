import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { EmailSignUpScreen } from 'src/screens/EmailSignUp';
import { SignUpScreen } from 'src/screens/SignUp';

export type AuthStackParamList = {
  SignUp: undefined;
  EmailSignUp: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
    </Stack.Navigator>
  );
};
