import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { filter } from 'graphql-anywhere';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import {
  ExchangingMessageRoomListScreenDataDocument,
  ExchangingMessageRoomListScreenDataQuery,
  RoomListItemInMessageRoomListScreenFragment,
  RoomListItemInMessageRoomListScreenFragmentDoc,
  useDeleteMessageRoomMutation,
  useExchangingMessageRoomListScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';
import { deleteRoomWithAlert, useSortedRoomListWithPin } from './helpers';
import { RoomListItem } from './RoomListItem';

type RoomItem =
  ExchangingMessageRoomListScreenDataQuery['me']['exchangingMessageRooms'][number];

export const ExchangingMessageRooms = React.memo(() => {
  const { data } = useExchangingMessageRoomListScreenDataQuery();
  const navigation = useNavigation<RootNavigationProp<'MessageRoomList'>>();
  const [longPressedItemId, setLongPressedItemId] = useState<number | null>(
    null
  );
  const [deleteMessageRoomMutation] = useDeleteMessageRoomMutation();
  const toast = useToast();
  const {
    sortedRoomList,
    setPinnedIdsWithStorage,
    isPinned,
    deletePinnedIdWithStorage,
    pinnedIds,
  } = useSortedRoomListWithPin({
    data,
    target: 'exchangingMessageRooms',
  });

  const renderRoomItem = useCallback(
    ({ item }: { item: RoomItem }) => {
      const { id, partner } = item;

      const onPress = () => {
        navigation.navigate('MessageRoom', {
          roomId: id,
          userId: partner.id,
        });
      };

      const pinned = isPinned(item.id);

      const onLongPress = () => {
        setLongPressedItemId(id);
      };

      return (
        <RoomListItem
          fragmentData={filter<RoomListItemInMessageRoomListScreenFragment>(
            RoomListItemInMessageRoomListScreenFragmentDoc,
            item
          )}
          onPress={onPress}
          onLongPress={onLongPress}
          pinned={pinned}
        />
      );
    },
    [navigation, setLongPressedItemId, pinnedIds]
  );

  const onDeletePress = () => {
    if (!longPressedItemId) {
      return;
    }

    deleteRoomWithAlert(async () => {
      try {
        await deleteMessageRoomMutation({
          variables: {
            id: longPressedItemId,
          },
          onCompleted: () => {
            toast.show('削除しました');
          },
          refetchQueries: [
            {
              query: ExchangingMessageRoomListScreenDataDocument,
            },
          ],
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLongPressedItemId(null);
      }
    });
  };

  const onPinPress = () => {
    if (!longPressedItemId) {
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLongPressedItemId(null);
    setPinnedIdsWithStorage(longPressedItemId);
  };

  const onUnpinPress = () => {
    if (!longPressedItemId) {
      return;
    }

    deletePinnedIdWithStorage(longPressedItemId);
    setLongPressedItemId(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  if (!data?.me) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedRoomList}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
      />

      <OverlayModal
        isVisible={!!longPressedItemId}
        onBackdropPress={() => {
          setLongPressedItemId(null);
        }}
        onCancel={() => {
          setLongPressedItemId(null);
        }}
        items={[
          {
            title: isPinned(longPressedItemId) ? 'ピン解除' : 'ピン留め',
            onPress: isPinned(longPressedItemId) ? onUnpinPress : onPinPress,
          },
          { title: '削除', titleColor: theme.red, onPress: onDeletePress },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {},
});
