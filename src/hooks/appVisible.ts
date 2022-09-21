import { useReactiveVar } from '@apollo/client';
import { contentsCreationModalVisibleVar } from '../stores/contentsCreationModalVisible';

export const useContentsCreationVisible = () => {
  const contentsCreationModalVisible = useReactiveVar(
    contentsCreationModalVisibleVar
  );

  const setContentsCreationModalVisible = (value: boolean) => {
    contentsCreationModalVisibleVar(value);
  };

  return {
    contentsCreationModalVisible,
    setContentsCreationModalVisible,
  };
};
