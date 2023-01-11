import { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import {
  ExchangingMessageRoomListScreenDataQuery,
  NoReplyMessageRoomListScreenDataQuery,
} from 'src/generated/graphql';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';

type RoomItem =
  | ExchangingMessageRoomListScreenDataQuery['me']['exchangingMessageRooms'][number]
  | NoReplyMessageRoomListScreenDataQuery['me']['noReplyMessageRooms'][number];

export const deleteRoomWithAlert = (onDeletePress: () => Promise<void>) => {
  Alert.alert('削除してよろしいですか？', '元に戻すことはできません', [
    {
      text: 'キャンセル',
      style: 'cancel',
    },
    {
      text: '削除',
      style: 'destructive',
      onPress: onDeletePress,
    },
  ]);
};

export const sortRooms = <T extends { updatedAt: string }>(rooms: T[]) => {
  rooms.sort((a, b) => {
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
};

export const useSortedRoomListWithPin = ({
  data,
  target,
}:
  | {
      data: ExchangingMessageRoomListScreenDataQuery;
      target: 'exchangingMessageRooms';
    }
  | {
      data: NoReplyMessageRoomListScreenDataQuery;
      target: 'noReplyMessageRooms';
    }) => {
  const pinnedIdsString = storage.getString(
    mmkvStorageKeys.pinnedMessageRoomIds
  );
  const _pinnedIds = pinnedIdsString
    ? (JSON.parse(pinnedIdsString) as number[])
    : [];
  const [pinnedIds, setPinnedIds] = useState(_pinnedIds);

  const isPinned = (id: number) => pinnedIds.includes(id);

  const sortedRoomList = useMemo(() => {
    if (!data?.me) {
      return [];
    }

    let pinnedRooms: RoomItem[] = [];
    let notPinnedRooms: RoomItem[] = [];

    if (target === 'exchangingMessageRooms') {
      if (pinnedIds.length) {
        data.me.exchangingMessageRooms.forEach((room) => {
          if (isPinned(room.id)) {
            pinnedRooms.push(room);
          } else {
            notPinnedRooms.push(room);
          }
        });
      } else {
        notPinnedRooms = [...data.me.exchangingMessageRooms];
      }
    } else {
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
    }

    sortRooms(pinnedRooms);
    sortRooms(notPinnedRooms);

    return [...pinnedRooms, ...notPinnedRooms];
  }, [data, pinnedIds, target]);

  const setPinnedIdsWithStorage = (selectedRoomId: number) => {
    const newPinnedIds = [
      selectedRoomId,
      ...pinnedIds.filter((id) => id !== selectedRoomId),
    ];

    storage.set(
      mmkvStorageKeys.pinnedMessageRoomIds,
      JSON.stringify(newPinnedIds)
    );

    setPinnedIds(newPinnedIds);
  };

  const deletePinnedIdWithStorage = (selectedRoomId: number) => {
    const newPinnedIds = pinnedIds.filter((_id) => _id !== selectedRoomId);

    storage.set(
      mmkvStorageKeys.pinnedMessageRoomIds,
      JSON.stringify(newPinnedIds)
    );

    setPinnedIds(newPinnedIds);
  };

  return {
    pinnedIds,
    sortedRoomList,
    setPinnedIdsWithStorage,
    deletePinnedIdWithStorage,
    isPinned,
  };
};
