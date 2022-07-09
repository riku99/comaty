import { makeVar, useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { Sex } from 'src/generated/graphql';

const sexVar = makeVar<Sex>(Sex.Male);
const birthYearVar = makeVar<number | null>(null);
const birthMonthVar = makeVar<number | null>(null);
const birthDayVar = makeVar<number | null>(null);

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

export const useDateOfBirth = () => {
  const birthYear = useReactiveVar(birthYearVar);
  const birthMonth = useReactiveVar(birthMonthVar);
  const birthDay = useReactiveVar(birthDayVar);

  const setDateOfBirth = useCallback(
    ({
      birthYear,
      birthMonth,
      birthDay,
    }: {
      birthYear: number;
      birthMonth: number;
      birthDay: number;
    }) => {
      birthYearVar(birthYear);
      birthMonthVar(birthMonth);
      birthDayVar(birthDay);
    },
    []
  );

  return {
    birthYear,
    birthMonth,
    birthDay,
    setDateOfBirth,
  };
};
