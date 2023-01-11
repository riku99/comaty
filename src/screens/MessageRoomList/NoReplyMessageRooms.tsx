import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import * as Haptics from 'expo-haptics';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import {
  NoReplyMessageRoomListScreenDataDocument,
  NoReplyMessageRoomListScreenDataQuery,
  useDeleteMessageRoomMutation,
  useNoReplyMessageRoomListScreenDataQuery,
} from 'src/generated/graphql';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';
import { theme } from 'src/styles';
import { deleteRoomWithAlert, sortRooms } from './helpers';
import { RoomListItem } from './RoomListItem';

type RoomItem =
  NoReplyMessageRoomListScreenDataQuery['me']['noReplyMessageRooms'][number];

export const NoReplyMessageRooms = () => {
  const { data } = useNoReplyMessageRoomListScreenDataQuery();
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

  const isPinned = (id: number) => pinnedIds.includes(id);

  const sortedList = useMemo(() => {
    if (!data?.me) {
      return [];
    }

    let pinnedRooms: RoomItem[] = [];
    let notPinnedRooms: RoomItem[] = [];

    if (pinnedIds.length) {
      data.me.noReplyMessageRooms.forEach((room) => {
        if (isPinned(room.id)) {
          pinnedRooms.push(room);
        } else {
          notPinnedRooms.push(room);
        }
      });
    } else {
      notPinnedRooms = [...data.me.noReplyMessageRooms];
    }

    sortRooms(pinnedRooms);
    sortRooms(notPinnedRooms);

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

      const pinned = isPinned(item.id);

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
              query: NoReplyMessageRoomListScreenDataDocument,
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLongPressedItemId(null);

    if (!longPressedItemId) {
      return;
    }

    const newPinnedIds = [
      longPressedItemId,
      ...pinnedIds.filter((id) => id !== longPressedItemId),
    ];

    storage.set(
      mmkvStorageKeys.pinnedMessageRoomIds,
      JSON.stringify(newPinnedIds)
    );

    setPinnedIds(newPinnedIds);
  };

  const onUnpinPress = () => {
    setLongPressedItemId(null);

    if (!longPressedItemId) {
      return;
    }

    const newPinnedIds = pinnedIds.filter((_id) => _id !== longPressedItemId);

    storage.set(
      mmkvStorageKeys.pinnedMessageRoomIds,
      JSON.stringify(newPinnedIds)
    );

    setPinnedIds(newPinnedIds);
  };

  if (!data?.me) {
    return null;
  }

  const onProfileListButtonPress = () => {
    const ids = sortedList.map((item) => item.partner.id);
    navigation.navigate('MessageUserProfileList', {
      ids,
    });
  };

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
          {
            title: isPinned(longPressedItemId) ? 'ピン解除' : 'ピン留め',
            onPress: isPinned(longPressedItemId) ? onUnpinPress : onPinPress,
          },
          { title: '削除', titleColor: theme.red, onPress: onDeletePress },
        ]}
      />

      {!!sortedList?.length && (
        <Button
          title="プロフィール一覧"
          containerStyle={styles.profileButtonContainer}
          titleStyle={styles.profileButtonTitle}
          buttonStyle={styles.profileButton}
          onPress={onProfileListButtonPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 4,
    paddingBottom: 16,
  },
  profileButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  profileButtonTitle: {
    color: theme.primary,
  },
  profileButton: {
    backgroundColor: '#fff',
    borderColor: theme.primary,
    borderWidth: 2,
  },
});
