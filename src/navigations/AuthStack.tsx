import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { EmailSignUpScreen } from 'src/screens/EmailSignUp';
import { SexSelectionScreen } from 'src/screens/SexSelection';
import { SignUpScreen } from 'src/screens/SignUp';

export type AuthStackParamList = {
  SignUp: undefined;
  EmailSignUp: undefined;
  SexSelection: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
      <Stack.Screen name="SexSelection" component={SexSelectionScreen} />
    </Stack.Navigator>
  );
};
