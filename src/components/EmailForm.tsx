import { Input } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
};

export const EmailForm = ({
  email,
  setEmail,
  password,
  setPassword,
}: Props) => {
  const [emailFormFocused, setEmailFormFocused] = useState(false);
  const [passwordFormFocused, setPasswordFormFocused] = useState(false);

  return (
    <>
      <Input
        label="メールアドレス"
        selectionColor={theme.primary}
        inputContainerStyle={{
          borderColor: emailFormFocused ? theme.primary : theme.formBorderGray,
        }}
        onFocus={() => {
          setEmailFormFocused(true);
        }}
        onBlur={() => {
          setEmailFormFocused(false);
        }}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="パスワード"
        containerStyle={styles.passwordContainer}
        placeholder="8文字以上"
        inputContainerStyle={{
          borderColor: passwordFormFocused
            ? theme.primary
            : theme.formBorderGray,
        }}
        onFocus={() => {
          setPasswordFormFocused(true);
        }}
        onBlur={() => {
          setPasswordFormFocused(false);
        }}
        value={password}
        onChangeText={setPassword}
      />
    </>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    marginTop: 20,
  },
});
