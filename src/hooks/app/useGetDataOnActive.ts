import { useEffect } from 'react';
import {
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from 'react-native';
import { useGetOnActiveDataQuery } from 'src/generated/graphql';
import { useLoggedIn } from 'src/hooks/auth/useLoggedIn';

export const useGetDataOnActive = () => {
  const { loggedIn } = useLoggedIn();
  // lazyQuery不具合あるのでrefetch + skip で対応
  const { refetch } = useGetOnActiveDataQuery({
    skip: true,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    let subscription: NativeEventSubscription;

    if (loggedIn) {
      const onChange = async (nextState: AppStateStatus) => {
        if (nextState === 'active') {
          try {
            refetch();
          } catch (e) {
            console.log(e);
          }
        }
      };

      subscription = AppState.addEventListener('change', onChange);
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [loggedIn, refetch]);
};
