import { GenderOfLoveInterest } from 'src/generated/graphql';

export const getGenderOfLoveInterestLabel = (
  value: GenderOfLoveInterest | null
) => {
  switch (value) {
    case null:
      return '未選択';
    case GenderOfLoveInterest.Man:
      return '男性';
    case GenderOfLoveInterest.Woman:
      return '女性';
    case GenderOfLoveInterest.ManWoman:
      return '両方';
  }
};
