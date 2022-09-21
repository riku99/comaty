import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable } from 'react-native';
import { ContentCreationButton } from 'src/components/ui/ContentCreationButton';
import { useContentsCreationVisible } from 'src/hooks/appVisible';
import { ChatList } from 'src/screens/ChatList';
import { CreateStoryScreen } from 'src/screens/CreateStory';
import { HomeScreen } from 'src/screens/Home';
import { NearbyUsersScreen } from 'src/screens/NearbyUsers';
import { theme } from 'src/styles';
import { MyPageStack } from './MyPageStack';

export type TabParamList = {
  Home: undefined;
  NearbyUsers: undefined;
  CreateStory: undefined;
  ChatList: undefined;
  MyPage: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTab = React.memo(() => {
  const { setContentsCreationModalVisible } = useContentsCreationVisible();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.black,
        tabBarStyle: {
          borderTopWidth: 0,
        },
        headerShadowVisible: false,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 22,
        },
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
        name="NearbyUsers"
        component={NearbyUsersScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateStory"
        component={CreateStoryScreen}
        options={{
          tabBarButton: (props) => {
            return (
              <Pressable
                style={[props.style, { justifyContent: 'center' }]}
                onPress={() => {
                  setContentsCreationModalVisible(true);
                }}
              >
                <ContentCreationButton />
              </Pressable>
            );
          },
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

const ICON_SIZE = 22;
