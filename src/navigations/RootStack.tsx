import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MainStack } from './MainStack';

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainStack} />
    </Stack.Navigator>
  );
};
