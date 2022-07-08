import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/BottomAnimatedButton';
import { EmailForm } from 'src/components/EmailForm';
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

  const { signUpWithEmail } = useSignUpWithEmail();

  const onSignUpPress = async () => {
    // await signUpWithEmail({
    //   email,
    //   password,
    // });
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
        title="次へ"
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
