import { useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { Sex } from 'src/generated/graphql';
import {
  birthDayVar,
  birthMonthVar,
  birthYearVar,
  nicknameVar,
  sexVar,
} from 'src/stores/initialStatus';

export const useNickname = () => {
  const nickname = useReactiveVar(nicknameVar);

  const setNickname = useCallback((value: string) => {
    nicknameVar(value);
  }, []);

  return {
    nickname,
    setNickname,
  };
};

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

// export const useInitialState = () => {
//   const { sex } = useSex();
//   const { birthDay, birthMonth, birthYear } = useDateOfBirth();
//   const { nickname } = useNickname();

//   return {
//     sex,
//     birthYear,
//     birthMonth,
//     birthDay,
//     nickname,
//   };
// };
