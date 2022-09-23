import { NativeModules } from 'react-native';
import { CandidateLocation, LatLng } from './types';

const { LocalSearchManager } = NativeModules;

export const searchForLocations = async (
  query: string
): Promise<CandidateLocation[]> => {
  return await LocalSearchManager.searchForLocations(query);
};

export const searchForCoodinate = async (query: string): Promise<LatLng> => {
  return await LocalSearchManager.searchForCoodinate(query);
};
