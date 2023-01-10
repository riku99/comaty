import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { Badge } from 'src/components/ui/Badge';
import { HeaderLeftTitle } from 'src/components/ui/HeaderLeftTitle';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import { ThreeDots } from 'src/components/ui/ThreeDots';
import {
  MessageRoomListScreenDataDocument,
  useDeleteTalkRoomsWithoutKeptMutation,
  useMessageRoomListScreenDataQuery,
} from 'src/generated/graphql';
import { useMessageRoomBadgeVisible } from 'src/hooks/messageRoom/useMessageRoomBadgeVisible';
import { theme } from 'src/styles';
import { ExchangingMessageRooms } from './ExchangingMessageRooms';
import { NoReplyMessageRooms } from './NoReplyMessageRooms';

type Props = RootNavigationScreenProp<'MessageRoomList'>;

type TopTabParamList = {
  ExchangingMessageRooms: undefined;
  NoReplyMessageRooms: undefined;
};

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export const MessageRoomListScreen = React.memo(({ navigation }: Props) => {
  useMessageRoomListScreenDataQuery();
  const { exchangingMessageRoomsBadge, noReplyMessageRoomsbadge } =
    useMessageRoomBadgeVisible();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteTalkRoomsWithoutKeptMutation] =
    useDeleteTalkRoomsWithoutKeptMutation();
  const toast = useToast();

  const hideModalVisible = () => {
    setModalVisible(false);
  };

  const onModalDeletePress = () => {
    Alert.alert(
      'トークルームを削除',
      'キープ中以外のトークルームが全て削除されます。削除してよろしいですか？',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTalkRoomsWithoutKeptMutation({
                onCompleted: () => {
                  setModalVisible(false);
                  toast.show('削除しました');
                },
                refetchQueries: [MessageRoomListScreenDataDocument],
              });
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
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
            transform: [{ translateX: -16.5 }],
          },
        }}
      >
        <TopTab.Screen
          name="ExchangingMessageRooms"
          component={ExchangingMessageRooms}
          options={{
            tabBarLabel: 'やりとり中',
            tabBarBadge: () => (
              <>
                {exchangingMessageRoomsBadge && (
                  <View style={styles.badgeContainer}>
                    <Badge size={6} />
                  </View>
                )}
              </>
            ),
          }}
        />
        <TopTab.Screen
          name="NoReplyMessageRooms"
          component={NoReplyMessageRooms}
          options={{
            tabBarLabel: '未返信',
            tabBarBadge: () => (
              <>
                {noReplyMessageRoomsbadge && (
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
            onPress: onModalDeletePress,
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
    right: 52,
  },
});
