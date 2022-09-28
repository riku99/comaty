import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

type Props = {
  children: JSX.Element;
  imageSize: number;
};

export const ProfileStoryOuter = ({ children, imageSize }: Props) => {
  const outerSize = imageSize + 12;
  const whiteOuterSize = outerSize - 6;

  return (
    <LinearGradient
      colors={['#9089fa', '#b289fa', '#e389fa']}
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
