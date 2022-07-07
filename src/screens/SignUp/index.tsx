import { Button } from '@rneui/themed';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

type Props = RootNavigationScreenProp<'SignUp'>;

export const SignUpScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const onEmailLoginPress = () => {
    navigation.navigate('EmailSignUp');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Button title="メールアドレスで登録" onPress={onEmailLoginPress} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
});
