import { makeVar } from '@apollo/client';

export type GeolocationPermittedVar = boolean | null;

export const geolocationPermittedVar = makeVar<GeolocationPermittedVar>(null);
