import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

type Props = {
  children: JSX.Element | JSX.Element[];
  imageSize: number;
  type?: 'gradient' | 'silver' | 'none';
};

export const ProfileStoryOuter = ({
  children,
  imageSize,
  type = 'gradient',
}: Props) => {
  const outerSize = imageSize + 10;
  const whiteOuterSize = outerSize - 5;

  const colors =
    type === 'gradient'
      ? ['#9089fa', '#b289fa', '#e389fa']
      : type === 'silver'
      ? ['#D6D6D6', '#CECECE']
      : [];

  return (
    <LinearGradient
      colors={colors}
      style={[
        styles.outer,
        {
          width: outerSize,
          height: outerSize,
          borderRadius: outerSize,
        },
      ]}
    >
      <View
        style={[
          styles.whiteOuter,
          {
            width: whiteOuterSize,
            height: whiteOuterSize,
            borderRadius: whiteOuterSize,
          },
        ]}
      >
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
