import { useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { loadingOverlayVisibleVar } from 'src/stores/loadingOverlay';

export const useLoadingOverlayVisible = () => {
  const loadingVisible = useReactiveVar(loadingOverlayVisibleVar);

  const setLoadingVisible = useCallback((value: boolean) => {
    loadingOverlayVisibleVar(value);
  }, []);

  return {
    loadingVisible,
    setLoadingVisible,
  };
};
