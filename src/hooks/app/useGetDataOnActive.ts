import { useEffect } from 'react';
import {
  AppState,
  AppStateStatus,
  NativeEventSubscription,
} from 'react-native';
import {
  GetOnActiveDataDocument,
  GetOnActiveDataQuery,
} from 'src/generated/graphql';
import { useCustomLazyQuery } from 'src/hooks/apollo/useCustomLazyQuery';
import { useLoggedIn } from 'src/hooks/auth/useLoggedIn';

export const useGetDataOnActive = () => {
  const { loggedIn } = useLoggedIn();
  const getOnActiveLazyQuery = useCustomLazyQuery<GetOnActiveDataQuery>(
    GetOnActiveDataDocument
  );

  useEffect(() => {
    let subscription: NativeEventSubscription;

    if (loggedIn) {
      const onChange = async (nextState: AppStateStatus) => {
        if (nextState === 'active') {
          try {
            await getOnActiveLazyQuery();
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
