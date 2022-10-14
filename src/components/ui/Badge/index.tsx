import { MotiView } from 'moti';
import { theme } from 'src/styles';

type Props = {
  size: number;
  color?: string;
};

export const Badge = ({ size, color = theme.primary }: Props) => {
  return (
    <MotiView
      style={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color,
      }}
      from={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        duration: 300,
        type: 'timing',
      }}
    />
  );
};
