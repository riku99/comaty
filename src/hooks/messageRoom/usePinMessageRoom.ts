import { mmkvStorageKeys, storage } from 'src/storage/mmkv';

export const usePinMessageRoom = () => {
  const pinMessageRoom = (id: number) => {
    const pinnedString = storage.getString(
      mmkvStorageKeys.pinnedMessageRoomIds
    );

    if (pinnedString) {
      const pinnedIds = JSON.parse(pinnedString) as number[];

      const newPinnedIds = [
        id,
        ...pinnedIds.filter((pinnedId) => pinnedId !== id),
      ];

      storage.set(
        mmkvStorageKeys.pinnedMessageRoomIds,
        JSON.stringify(newPinnedIds)
      );
    } else {
      storage.set(mmkvStorageKeys.pinnedMessageRoomIds, JSON.stringify([id]));
    }
  };

  return pinMessageRoom;
};
