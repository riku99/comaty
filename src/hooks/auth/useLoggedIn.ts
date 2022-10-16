import { useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { loggedInVar } from 'src/stores/loggedIn';

export const useLoggedIn = () => {
  const loggedIn = useReactiveVar(loggedInVar);

  const setLoggedIn = useCallback((value: boolean) => {
    loggedInVar(value);
  }, []);

  return {
    loggedIn,
    setLoggedIn,
  };
};
