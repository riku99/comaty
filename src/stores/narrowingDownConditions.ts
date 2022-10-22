import { makeVar } from '@apollo/client';
import { ApproximateRange, NarrowingDownInput } from 'src/generated/graphql';

export type NarrowingDownConditionsData = NarrowingDownInput;

export const narrowingDownConditionsVar = makeVar<NarrowingDownConditionsData>({
  range: ApproximateRange.Normal,
  minAge: 18,
  maxAge: 30,
});
