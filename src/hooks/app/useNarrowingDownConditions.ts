import { useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';
import {
  NarrowingDownConditionsData,
  narrowingDownConditionsVar,
} from 'src/stores/narrowingDownConditions';

export const useNarrowingDownConditions = () => {
  const narrowingDownCinditions = useReactiveVar(narrowingDownConditionsVar);

  const setNarrowingDownConditions = useCallback(
    (data: NarrowingDownConditionsData) => {
      storage.set(
        mmkvStorageKeys.narrowingDownConditions,
        JSON.stringify(data)
      );
      narrowingDownConditionsVar(data);
    },
    []
  );

  return {
    narrowingDownCinditions,
    setNarrowingDownConditions,
  };
};
