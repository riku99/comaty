import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BottomTab } from './BottomTab';

export type MainStackParamList = {
  BottomTab: undefined;
};

export const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};
