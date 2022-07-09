import { makeVar, useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { Sex } from 'src/generated/graphql';

const sexVar = makeVar<Sex>(Sex.Male);

export const useSex = () => {
  const sex = useReactiveVar(sexVar);

  const setSex = useCallback((value: Sex) => {
    sexVar(value);
  }, []);

  return {
    sex,
    setSex,
  };
};
