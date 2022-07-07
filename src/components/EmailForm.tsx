import { Input } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from 'src/styles';

export const EmailForm = () => {
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
      />
    </>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    marginTop: 20,
  },
});
