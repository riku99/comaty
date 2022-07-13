import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ChatList } from 'src/screens/ChatList';
import { CreateStoryScreen } from 'src/screens/CreateStory';
import { HomeScreen } from 'src/screens/Home';
import { NotoficationScreen } from 'src/screens/Notification';
import { theme } from 'src/styles';
import { MyPageStack } from './MyPageStack';

export type TabParamList = {
  Home: undefined;
  Notification: undefined;
  CreateStory: undefined;
  ChatList: undefined;
  MyPage: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTab = React.memo(() => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotoficationScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="bells" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateStory"
        component={CreateStoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={ICON_SIZE} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
});

const ICON_SIZE = 24;
