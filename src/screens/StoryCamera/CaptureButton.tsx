import { MotiView } from 'moti';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import {
  CircularProgressBase,
  ProgressRef,
} from 'react-native-circular-progress-indicator';
import { theme } from 'src/styles';

type Props = {
  onPress: () => void;
  onLongPress: () => void;
  onPressOut: () => void;
};

export const CaptureButton = (props: Props) => {
  const videoProgressRef = useRef<ProgressRef>(null);
  const [onLongPressing, setOnLongPressing] = useState(false);
  const [outerProgressValue, setOuterProgressValue] = useState(100);

  useEffect(() => {
    if (onLongPressing) {
      setOuterProgressValue(100);
      videoProgressRef.current?.reAnimate();
    } else {
      videoProgressRef.current?.pause();
      setOuterProgressValue(0);
    }
  }, [onLongPressing]);

  const onLongPress = () => {
    setOnLongPressing(true);
    props.onLongPress();
  };

  const onPressOut = () => {
    setOnLongPressing(false);
    props.onPressOut();
  };

  return (
    <CircularProgressBase
      activeStrokeWidth={onLongPressing ? 4 : 0}
      inActiveStrokeOpacity={0}
      value={outerProgressValue}
      radius={CAPTURE_BUTTON_SIZE - 14}
      duration={15000}
      activeStrokeColor={theme.primary}
      ref={videoProgressRef}
      onAnimationComplete={() => {}}
    >
      <Pressable
        onPress={props.onPress}
        onLongPress={onLongPress}
        onPressOut={onPressOut}
      >
        <MotiView
          style={styles.outer}
          from={{
            scale: 1,
          }}
          animate={{
            scale: onLongPressing ? 1.18 : 1,
            backgroundColor: onLongPressing
              ? 'rgba(134, 134, 134, 0.8)'
              : 'transparent',
            borderColor: onLongPressing ? 'transparent' : '#fff',
            borderWidth: onLongPressing ? 0 : 3,
          }}
          transition={{
            duration: 200,
            type: 'timing',
          }}
        >
          <MotiView
            style={styles.inner}
            from={{ scale: 1, backgroundColor: '#fff' }}
            animate={{
              scale: onLongPressing ? 0.5 : 1,
              backgroundColor: onLongPressing ? 'red' : '#fff',
            }}
            transition={{
              duration: 200,
              type: 'timing',
            }}
          />
        </MotiView>
      </Pressable>
    </CircularProgressBase>
  );
};

const CAPTURE_BUTTON_SIZE = 64;

const styles = StyleSheet.create({
  inner: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE,
  },
  outer: {
    alignSelf: 'center',
    borderRadius: CAPTURE_BUTTON_SIZE + 10,
    width: CAPTURE_BUTTON_SIZE + 10,
    height: CAPTURE_BUTTON_SIZE + 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
