import { Entypo } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  dotsColor?: string;
  dotsSize: number;
} & ComponentProps<typeof Pressable>;

export const ThreeDots = ({
  dotsSize,
  dotsColor = theme.black,
  ...pressableProps
}: Props) => {
  return (
    <Pressable {...pressableProps}>
      <Entypo name="dots-three-horizontal" color={dotsColor} size={dotsSize} />
    </Pressable>
  );
};
