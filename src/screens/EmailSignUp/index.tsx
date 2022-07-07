import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { EmailForm } from 'src/components/EmailForm';

type Props = RootNavigationScreenProp<'EmailSignUp'>;

export const EmailSignUpScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ユーザー登録',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <EmailForm />
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
