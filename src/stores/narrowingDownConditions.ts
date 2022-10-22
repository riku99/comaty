import { makeVar } from '@apollo/client';
import { ApproximateRange, Sex } from 'src/generated/graphql';

export type NarrowingDownConditionsData = {
  sex?: Sex;
  range: ApproximateRange;
  minAge: number;
  maxAge: number;
};

export const narrowingDownConditionsVar = makeVar<NarrowingDownConditionsData>({
  range: ApproximateRange.Normal,
  minAge: 18,
  maxAge: 30,
});
