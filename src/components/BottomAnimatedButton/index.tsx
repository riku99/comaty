import { Button } from '@rneui/themed';
import React, { ComponentProps, useEffect } from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = ComponentProps<typeof Button>;

export const BottomAnimatedButton = (props: Props) => {
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const initialButtonButtom = Math.max(safeAreaBottom, BUTTON_BOTTOM);

  const buttonBottom = useSharedValue(initialButtonButtom);
  const buttonContainerStyle = useAnimatedStyle(() => {
    return {
      bottom: buttonBottom.value,
    };
  });

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardWillShow', (e) => {
      buttonBottom.value = withTiming(e.endCoordinates.height + BUTTON_BOTTOM, {
        duration: e.duration,
      });
    });

    return () => {
      subscription.remove();
    };
  }, [buttonBottom, safeAreaBottom]);

  return (
    <Animated.View style={[styles.buttonContainer, buttonContainerStyle]}>
      <Button {...props} />
    </Animated.View>
  );
};

const BUTTON_BOTTOM = 8;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
});
