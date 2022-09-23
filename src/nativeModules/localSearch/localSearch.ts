import { NativeModules } from 'react-native';
import { CandidateLocation } from './types';

const { LocalSearchManager } = NativeModules;

export const searchForLocations = async (
  query: string
): Promise<CandidateLocation[]> => {
  return await LocalSearchManager.searchForLocations(query);
};
