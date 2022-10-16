import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/ui/BottomAnimatedButton';
import { EmailForm } from 'src/components/ui/EmailForm';
import { useLoadingOverlayVisible } from 'src/hooks/app/useLoadingOverlayVisible';
import { useSignUpWithEmail } from 'src/hooks/auth';

type Props = RootNavigationScreenProp<'EmailSignUp'>;

export const EmailSignUpScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ユーザー登録',
    });
  }, [navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disabeld = !email || !password || password.length < 8;

  const { setLoadingVisible } = useLoadingOverlayVisible();
  const { signUpWithEmail } = useSignUpWithEmail();

  const onSignUpPress = async () => {
    setLoadingVisible(true);

    await signUpWithEmail({
      email,
      password,
    });

    setLoadingVisible(false);
  };

  return (
    <View style={styles.container}>
      <EmailForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />

      <BottomAnimatedButton
        title="登録"
        onPress={onSignUpPress}
        disabled={disabeld}
      />
    </View>
  );
};

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
