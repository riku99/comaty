import React from 'react';
import { LoadingOverlay } from 'src/components/LoadingOverlay';
import { useLoadingVisible } from 'src/hooks/loadingOverlay';
import { RootStack } from 'src/navigations/RootStack';

export const Root = () => {
  const { loadingVisible } = useLoadingVisible();

  return (
    <>
      <RootStack />
      {loadingVisible && <LoadingOverlay />}
    </>
  );
};
