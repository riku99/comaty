import React, { useEffect } from 'react';
import { LoadingOverlay } from 'src/components/LoadingOverlay';
import { useGetMeQuery } from 'src/generated/graphql';
import { useLoggedIn } from 'src/hooks/auth';
import { useLoadingVisible } from 'src/hooks/loadingOverlay';
import { RootStack } from 'src/navigations/RootStack';

export const Root = () => {
  const { loadingVisible } = useLoadingVisible();
  const { data: meData } = useGetMeQuery();
  const { setLoggedIn } = useLoggedIn();

  useEffect(() => {
    if (meData?.me) {
      setLoggedIn(true);
    }
  }, [meData]);

  return (
    <>
      <RootStack />
      {loadingVisible && <LoadingOverlay />}
    </>
  );
};
