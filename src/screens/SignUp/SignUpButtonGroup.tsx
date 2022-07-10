import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import GoogleIcon from 'src/assets/svg/google.svg';
import { VStack } from 'src/components/VStack';
import { useSignUpWithApple, useSignUpWithGoogle } from 'src/hooks/auth';
import { useLoadingVisible } from 'src/hooks/loadingOverlay';
import { theme } from 'src/styles';

export const SignUpButtonGroup = () => {
  const { setLoadingVisible } = useLoadingVisible();
  const { signUpWithApple } = useSignUpWithApple();
  const { signUpWithGoogle } = useSignUpWithGoogle();
  const navigation = useNavigation<RootNavigationProp<'SignUp'>>();

  const onEmailLoginPress = () => {
    navigation.navigate('EmailSignUp');
  };

  const onApplePress = async () => {
    setLoadingVisible(true);
    await signUpWithApple();
    setLoadingVisible(false);
  };

  const onGooglePress = async () => {
    setLoadingVisible(true);
    await signUpWithGoogle();
    setLoadingVisible(false);
  };

  return (
    <VStack space={18}>
      <Button
        title="メールアドレスで登録"
        onPress={onEmailLoginPress}
        buttonStyle={styles.emailButton}
        icon={
          <MaterialIcons
            name="email"
            color="white"
            size={ICON_SIZE}
            style={styles.buttonIcon}
          />
        }
      />
      <Button
        title="Appleで登録・ログイン"
        buttonStyle={styles.appleButton}
        icon={
          <AntDesign
            name="apple1"
            color="white"
            size={ICON_SIZE}
            style={styles.buttonIcon}
          />
        }
        onPress={onApplePress}
      />
      <Button
        title="Googleで登録・ログイン"
        buttonStyle={styles.googleButton}
        titleStyle={styles.googleButtonTitle}
        onPress={onGooglePress}
        icon={
          <GoogleIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            style={styles.buttonIcon}
          />
        }
      />
    </VStack>
  );
};

const ICON_SIZE = 22;

const styles = StyleSheet.create({
  buttonIcon: {
    position: 'absolute',
    left: 20,
  },
  emailButton: {
    backgroundColor: theme.primary,
  },
  appleButton: {
    backgroundColor: 'black',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.boarderGray,
  },
  googleButtonTitle: {
    color: theme.black,
  },
});
