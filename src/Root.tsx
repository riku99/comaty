import React from 'react';
import { LoadingOverlay } from 'src/components/LoadingOverlay';
import { RootStack } from 'src/navigations/RootStack';

export const Root = () => {
  return (
    <>
      <RootStack />
      <LoadingOverlay />
    </>
  );
};
