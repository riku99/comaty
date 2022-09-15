import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLayoutEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { theme } from 'src/styles';
import { Activity } from './Activity';
import { Help } from './Help';

type Props = RootNavigationScreenProp<'BottomTab'>;

type TopTabParamList = {
  Activity: undefined;
  Help: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ホーム🦄',
    });
  }, [navigation]);

  return (
    <>
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 40,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          tabBarIndicatorStyle: {
            backgroundColor: theme.primary,
            width: 100,
            height: 1.5,
          },
          tabBarIndicatorContainerStyle: {
            marginLeft: screenWidth / 4,
            transform: [{ translateX: -50 }],
          },
        }}
      >
        <TopTab.Screen
          name="Activity"
          component={Activity}
          options={{
            tabBarLabel: 'アクテビティ',
          }}
        />
        <TopTab.Screen
          name="Help"
          component={Help}
          options={{
            tabBarLabel: 'ヘルプ！',
          }}
        />
      </TopTab.Navigator>
    </>
  );
};

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
