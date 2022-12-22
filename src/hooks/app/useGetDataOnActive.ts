import { useEffect } from 'react';
import {
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from 'react-native';
import {
  useGetOnActiveDataLazyQuery,
  useGetOnActiveDataQuery,
} from 'src/generated/graphql';
import { useLoggedIn } from 'src/hooks/auth/useLoggedIn';

export const useGetDataOnActive = () => {
  const { loggedIn } = useLoggedIn();
  const [getOnActiveLazyQuery] = useGetOnActiveDataLazyQuery();
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
  }, [loggedIn, getOnActiveLazyQuery]);
};
