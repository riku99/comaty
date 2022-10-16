import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MyGroupScreen } from 'src/screens/MyGroup';
import { MyPageScreen } from 'src/screens/MyPage';
import { MyPostsScreen } from 'src/screens/MyPosts';
import { SettingScreen } from 'src/screens/Setting';

export type MyPageStackParamList = {
  MyPageMain: undefined;
  MyPosts: undefined;
  MyGroup: undefined;
  Setting: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParamList>();

export const MyPageStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="MyPageMain" component={MyPageScreen} />
      <Stack.Screen name="MyPosts" component={MyPostsScreen} />
      <Stack.Screen name="MyGroup" component={MyGroupScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
};
