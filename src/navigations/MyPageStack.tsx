import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MyPageScreen } from 'src/screens/MyPage';

export type MyPageStackParamList = {
  MyPageMain: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParamList>();

export const MyPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyPageMain" component={MyPageScreen} />
    </Stack.Navigator>
  );
};
