import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { HomeScreen } from 'src/screens/Home';
import { MyPageStack } from './MyPageStack';

export type TabParamList = {
  Home: undefined;
  Notification: undefined;
  Story: undefined;
  Message: undefined;
  MyPage: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTab = React.memo(() => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
});
