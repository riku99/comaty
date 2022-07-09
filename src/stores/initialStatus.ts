import { makeVar } from '@apollo/client';
import { Sex } from 'src/generated/graphql';

export const sexVar = makeVar<Sex>(Sex.Male);
export const birthYearVar = makeVar<number | null>(null);
export const birthMonthVar = makeVar<number | null>(null);
export const birthDayVar = makeVar<number | null>(null);
export const nicknameVar = makeVar('');
