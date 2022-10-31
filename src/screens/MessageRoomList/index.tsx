import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useLayoutEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Badge } from 'src/components/ui/Badge';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import { ThreeDots } from 'src/components/ui/ThreeDots';
import { useMessageRoomListScreenDataQuery } from 'src/generated/graphql';
import { useMessageRoomBadgeVisible } from 'src/hooks/messageRoom/useMessageRoomBadgeVisible';
import { theme } from 'src/styles';
import { KeptMessageRooms } from './KeptMessageRooms';
import { MessagesFromOtherParty } from './MesagesFromOtherParty';
import { MessagesFromMySelf } from './MessagesFromMySelf';

type Props = RootNavigationScreenProp<'MessageRoomList'>;

type TopTabParamList = {
  FromMySelf: undefined;
  FromOtherParty: undefined;
  Kept: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export const MessageRoomListScreen = React.memo(({ navigation }: Props) => {
  useMessageRoomListScreenDataQuery();
  const { mySelfBadgeVisible, otherPartyBadgeVisible, keptBadgeVisible } =
    useMessageRoomBadgeVisible();
  const [modalVisible, setModalVisible] = useState(false);

  const hideModalVisible = () => {
    setModalVisible(false);
  };

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
      headerRight: () => (
        <ThreeDots
          dotsSize={20}
          style={{
            marginRight: 16,
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      ),
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
            marginLeft: screenWidth / 6,
            transform: [{ translateX: -50 }],
          },
        }}
      >
        <TopTab.Screen
          name="Kept"
          component={KeptMessageRooms}
          options={{
            tabBarLabel: 'キープ中',
            tabBarBadge: () => (
              <>
                {keptBadgeVisible && (
                  <View style={styles.badgeContainer}>
                    <Badge size={6} />
                  </View>
                )}
              </>
            ),
          }}
        />
        <TopTab.Screen
          name="FromOtherParty"
          component={MessagesFromOtherParty}
          options={{
            tabBarLabel: '相手から',
            tabBarBadge: () => (
              <>
                {otherPartyBadgeVisible && (
                  <View style={styles.badgeContainer}>
                    <Badge size={6} />
                  </View>
                )}
              </>
            ),
          }}
        />
        <TopTab.Screen
          name="FromMySelf"
          component={MessagesFromMySelf}
          options={{
            tabBarLabel: '自分から',
            tabBarBadge: () => (
              <>
                {mySelfBadgeVisible && (
                  <View style={styles.badgeContainer}>
                    <Badge size={6} />
                  </View>
                )}
              </>
            ),
          }}
        />
      </TopTab.Navigator>

      <OverlayModal
        isVisible={modalVisible}
        onBackdropPress={hideModalVisible}
        onCancel={hideModalVisible}
        items={[
          {
            title: 'キープ中以外を全て削除',
            onPress: () => {},
            titleColor: theme.red,
          },
        ]}
      />
    </View>
  );
});

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    right: 32,
  },
});
