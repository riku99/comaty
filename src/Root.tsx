import React, { useEffect } from 'react';
import { LoadingOverlay } from 'src/components/ui/LoadingOverlay';
import { useGetInitialDataQuery } from 'src/generated/graphql';
import { useLoggedIn } from 'src/hooks/auth';
import { useLoadingVisible } from 'src/hooks/loadingOverlay';
import { RootStack } from 'src/navigations/RootStack';

export const Root = () => {
  const { loadingVisible } = useLoadingVisible();
  const { data: initialData } = useGetInitialDataQuery();
  const { setLoggedIn } = useLoggedIn();

  useEffect(() => {
    if (initialData?.me) {
      setLoggedIn(true);
    }
  }, [initialData, setLoggedIn]);

  return (
    <>
      <RootStack />
      {loadingVisible && <LoadingOverlay />}
    </>
  );
};
