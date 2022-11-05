import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/ui/BottomAnimatedButton';
import { EmailForm } from 'src/components/ui/EmailForm';
import { useLoadingOverlayVisible } from 'src/hooks/app/useLoadingOverlayVisible';
import { useSignInWithEmail } from 'src/hooks/auth/useSignInWithEmail';

type Props = RootNavigationScreenProp<'EmailSignIn'>;

export const EmailSignInScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ログイン',
    });
  }, [navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disabeld = !email || !password || password.length < 8;
  const { setLoadingVisible } = useLoadingOverlayVisible();
  const { signInWithEmail } = useSignInWithEmail();

  const onSignInPress = async () => {
    setLoadingVisible(true);
    await signInWithEmail({
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
        title="ログイン"
        onPress={onSignInPress}
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
});
