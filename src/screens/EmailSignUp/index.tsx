import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/BottomAnimatedButton';
import { EmailForm } from 'src/components/EmailForm';
import { useSignUpWithEmail } from 'src/hooks/auth';
import { useLoadingVisible } from 'src/hooks/loadingOverlay';

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

  const { setLoadingVisible } = useLoadingVisible();
  const { signUpWithEmail } = useSignUpWithEmail();

  const onSignUpPress = async () => {
    setLoadingVisible(true);

    const userId = await signUpWithEmail({
      email,
      password,
    });

    setLoadingVisible(false);

    if (userId) {
      navigation.navigate('SexSelection');
    }
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
