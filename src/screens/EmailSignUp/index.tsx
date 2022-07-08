import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/BottomAnimatedButton';
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

  const disabeld = !email || !password || password.length < 8;

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
        onPress={() => {
          console.log(email);
          console.log(password);
        }}
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
