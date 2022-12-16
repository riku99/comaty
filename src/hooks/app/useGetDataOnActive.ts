import { useEffect } from 'react';
import {
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from 'react-native';
import { useGetOnActiveDataLazyQuery } from 'src/generated/graphql';
import { useLoggedIn } from 'src/hooks/auth/useLoggedIn';

export const useGetDataOnActive = () => {
  const { loggedIn } = useLoggedIn();
  const [getOnActiveLazyQuery] = useGetOnActiveDataLazyQuery();

  useEffect(() => {
    let subscription: NativeEventSubscription;

    if (loggedIn) {
      const onChange = async (nextState: AppStateStatus) => {
        if (nextState === 'active') {
          try {
            const { data } = await getOnActiveLazyQuery({
              fetchPolicy: 'network-only',
            });
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
