import { Button } from '@rneui/themed';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmailForm } from 'src/components/EmailForm';

type Props = RootNavigationScreenProp<'EmailSignUp'>;

export const EmailSignUpScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ユーザー登録',
    });
  }, [navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const disabeld = !email || !password || password.length < 8;

  return (
    <View style={styles.container}>
      <EmailForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <Animated.View style={[styles.buttonContainer, buttonContainerStyle]}>
        <Button
          title="登録"
          onPress={() => {
            console.log(email);
            console.log(password);
          }}
          disabled={disabeld}
        />
      </Animated.View>
    </View>
  );
};

const BUTTON_BOTTOM = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
});
