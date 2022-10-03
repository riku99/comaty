import { useReactiveVar } from '@apollo/client';
import { creatingStoryVar } from 'src/stores/creatingStory';

export const useCreatingStory = () => {
  const creatingStory = useReactiveVar(creatingStoryVar);

  const setCreatingStory = (value: boolean) => {
    creatingStoryVar(value);
  };

  return {
    creatingStory,
    setCreatingStory,
  };
};
