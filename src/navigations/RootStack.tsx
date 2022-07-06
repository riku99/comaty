import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BottomTab } from './BottomTab';

export type RootStackParamList = {
  BottomTab: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
