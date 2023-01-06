import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import {
  MessageRoomListFromOtherPartyScreenDataDocument,
  MessageRoomListFromOtherPartyScreenDataQuery,
  useDeleteMessageRoomMutation,
  useMessageRoomListFromOtherPartyScreenDataQuery,
} from 'src/generated/graphql';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';
import { theme } from 'src/styles';
import { deleteRoomWithAlert } from './helpers';
import { RoomListItem } from './RoomListItem';

type RoomItem =
  MessageRoomListFromOtherPartyScreenDataQuery['me']['messageRoomsFromOtherParty'][number];

export const MessagesFromOtherParty = () => {
  const { data } = useMessageRoomListFromOtherPartyScreenDataQuery();
  const navigation = useNavigation<RootNavigationProp<'MessageRoomList'>>();
  const [longPressedItemId, setLongPressedItemId] = useState<number | null>(
    null
  );
  const toast = useToast();
  const [deleteMessageRoomMutation] = useDeleteMessageRoomMutation();
  const pinnedIdsString = storage.getString(
    mmkvStorageKeys.pinnedMessageRoomIds
  );
  const _pinnedIds = pinnedIdsString
    ? (JSON.parse(pinnedIdsString) as number[])
    : [];
  const [pinnedIds, setPinnedIds] = useState(_pinnedIds);

  const sortedList = useMemo(() => {
    if (!data?.me) {
      return [];
    }

    let pinnedRooms: RoomItem[] = [];
    let notPinnedRooms: RoomItem[] = [];

    if (pinnedIds.length) {
      data.me.messageRoomsFromOtherParty.forEach((room) => {
        if (pinnedIds.includes(room.id)) {
          pinnedRooms.push(room);
        } else {
          notPinnedRooms.push(room);
        }
      });
    } else {
      notPinnedRooms = [...data.me.messageRoomsFromOtherParty];
    }

    notPinnedRooms.sort((a, b) => {
      const ad = new Date(Number(a.updatedAt));
      const bd = new Date(Number(b.updatedAt));
      if (ad > bd) {
        return -1;
      } else if (bd > ad) {
        return 1;
      } else {
        return 0;
      }
    });

    return [...pinnedRooms, ...notPinnedRooms];
  }, [data, pinnedIds]);

  const renderRoomItem = useCallback(
    ({ item }: { item: RoomItem }) => {
      const { id, partner } = item;

      const onPress = () => {
        navigation.navigate('MessageRoom', {
          roomId: id,
          userId: partner.id,
        });
      };

      const onLongPress = () => {
        setLongPressedItemId(id);
      };

      const pinned = pinnedIds.includes(item.id);

      return (
        <RoomListItem
          fragmentData={item}
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
              query: MessageRoomListFromOtherPartyScreenDataDocument,
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

  const onPinPress = async () => {
    const pinnedString = storage.getString(
      mmkvStorageKeys.pinnedMessageRoomIds
    );

    if (pinnedString) {
      const pinnedIds = JSON.parse(pinnedString) as number[];

      const newPinnedIds = [
        longPressedItemId,
        ...pinnedIds.filter((id) => id !== longPressedItemId),
      ];

      storage.set(
        mmkvStorageKeys.pinnedMessageRoomIds,
        JSON.stringify(newPinnedIds)
      );
    } else {
      storage.set(
        mmkvStorageKeys.pinnedMessageRoomIds,
        JSON.stringify([longPressedItemId])
      );
    }

    setLongPressedItemId(null);
  };

  if (!data?.me) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedList}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 10,
            }}
          />
        )}
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
          { title: 'ピン留め', onPress: onPinPress },
          { title: '削除', titleColor: theme.red, onPress: onDeletePress },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 4,
  },
});
