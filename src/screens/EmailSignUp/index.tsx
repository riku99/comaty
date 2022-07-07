import { Input } from '@rneui/base';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'EmailSignUp'>;

export const EmailSignUpScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ユーザー登録',
    });
  }, [navigation]);

  const [emailFormFocused, setEmailFormFocused] = useState(false);

  return (
    <View style={styles.container}>
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
        containerStyle={{ marginTop: 20 }}
        placeholder="8文字以上"
      />
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
});
