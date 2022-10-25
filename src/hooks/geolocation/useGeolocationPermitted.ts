import { useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import {
  geolocationPermittedVar,
  GeolocationPermittedVar,
} from 'src/stores/geolocationPermittedVar';

export const useGeolocationPermitted = () => {
  const geolocationPermitted = useReactiveVar(geolocationPermittedVar);

  const setGeolocationPermitted = useCallback(
    (value: GeolocationPermittedVar) => {
      geolocationPermittedVar(value);
    },
    []
  );

  return {
    geolocationPermitted,
    setGeolocationPermitted,
  };
};
