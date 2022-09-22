import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLayoutEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { theme } from 'src/styles';
import { Activity } from './Activity';
import { Question } from './Question';

type Props = RootNavigationScreenProp<'BottomTab'>;

type TopTabParamList = {
  Activity: undefined;
  Question: undefined;
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
          name="Question"
          component={Question}
          options={{
            tabBarLabel: 'そこ質',
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
