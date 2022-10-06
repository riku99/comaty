import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  width: number;
  setProgressValue: (v: SharedValue<number>) => void;
};

export const Indicator = React.memo(({ width, setProgressValue }: Props) => {
  const frontTranslateX = useSharedValue(-width);
  const frontStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: frontTranslateX.value,
        },
      ],
    };
  });

  useEffect(() => {
    setProgressValue(frontTranslateX);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={[styles.common, styles.back, { width }]}>
      <Animated.View
        style={[styles.common, styles.front, { width }, frontStyle]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  common: {
    height: 3,
    borderRadius: 3,
  },
  back: {
    backgroundColor: '#919191',
    overflow: 'hidden',
  },
  front: {
    backgroundColor: '#fff',
  },
});
