import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Badge } from 'src/components/ui/Badge';
import { ContentCreationButton } from 'src/components/ui/ContentCreationButton';
import { useContentsCreationVisible } from 'src/hooks/appVisible';
import { useMessageRoomBadgeVisible } from 'src/hooks/messageRoom/useMessageRoomBadgeVisible';
import { CreateStoryScreen } from 'src/screens/CreateStory';
import { MessageRoomListScreen } from 'src/screens/MessageRoomList';
import { TimelineScreen } from 'src/screens/Timeline';
import { theme } from 'src/styles';
import { HomeStack } from './HomeStack';
import { MyPageStack } from './MyPageStack';

export type TabParamList = {
  Home: undefined;
  Timeline: undefined;
  CreateStory: undefined;
  MessageRoomList: undefined;
  MyPage: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const BottomTab = React.memo(() => {
  const { setContentsCreationModalVisible } = useContentsCreationVisible();
  const { mySelfBadgeVisible, otherPartyBadgeVisible } =
    useMessageRoomBadgeVisible();

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
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home-minus' : 'home-minus-outline'}
              size={ICON_SIZE}
              color={theme.black}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'card-text' : 'card-text-outline'}
              size={ICON_SIZE}
              color={theme.black}
            />
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
        name="MessageRoomList"
        component={MessageRoomListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name={
                  focused
                    ? 'chatbubble-ellipses'
                    : 'chatbubble-ellipses-outline'
                }
                size={ICON_SIZE}
                color={theme.black}
              />

              {true && (
                <View style={styles.badge}>
                  <Badge size={6} />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              size={ICON_SIZE}
              color={theme.black}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
});

const ICON_SIZE = 24;

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
});
