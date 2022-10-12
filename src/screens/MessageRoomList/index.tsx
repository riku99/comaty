import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useLayoutEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { useMessageRoomListScreenDataQuery } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { MessagesFromOtherParty } from './MesagesFromOtherParty';
import { MessagesFromMySelf } from './MessagesFromMySelf';

type Props = RootNavigationScreenProp<'MessageRoomList'>;

type TopTabParamList = {
  FromMySelf: undefined;
  FromOtherParty: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export const MessageRoomListScreen = React.memo(({ navigation }: Props) => {
  const { data } = useMessageRoomListScreenDataQuery();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            marginLeft: 16,
          }}
        >
          <HeaderLeftTitle title="メッセージ" />
        </View>
      ),
      headerTitle: '',
      title: '',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
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
          name="FromOtherParty"
          component={MessagesFromOtherParty}
          options={{
            tabBarLabel: '相手から',
          }}
        />
        <TopTab.Screen
          name="FromMySelf"
          component={MessagesFromMySelf}
          options={{
            tabBarLabel: '自分から',
          }}
        />
      </TopTab.Navigator>
    </View>
  );
});

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
