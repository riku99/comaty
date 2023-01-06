import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const mmkvStorageKeys = {
  loginProviders: 'loginProviders',
  narrowingDownConditions: 'narrowingDownConditions',
  showedCompletedAgeVerificationAlert: 'showedCompletedAgeVerificationAlert',
  pinnedMessageRoomIds: 'pinnedMessageRoomIds',
};
