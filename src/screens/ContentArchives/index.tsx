import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLayoutEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';
import { Posts } from './Posts';
import { Stories } from './Stories';

type Props = RootNavigationScreenProp<'ContentArchives'>;

type TopTabParamList = {
  Posts: undefined;
  Stories: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export const ContentArchivesScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      title: 'アーカイブ',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TopTab.Navigator
        screenOptions={{
          lazy: true,
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
            marginLeft: screenWidth / 6,
            transform: [{ translateX: -16.5 }],
          },
        }}
      >
        <TopTab.Screen
          name="Posts"
          component={Posts}
          options={{
            tabBarLabel: '投稿',
          }}
        />
        <TopTab.Screen
          name="Stories"
          component={Stories}
          options={{
            tabBarLabel: 'ストーリー',
          }}
        />
      </TopTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const { width: screenWidth } = Dimensions.get('window');
