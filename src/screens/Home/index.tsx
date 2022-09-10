import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
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
      <TopTab.Navigator>
        <TopTab.Screen name="Activity" component={Activity} />
        <TopTab.Screen name="Help" component={Help} />
      </TopTab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
