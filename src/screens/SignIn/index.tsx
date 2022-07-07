import { Button } from '@rneui/themed';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

type Props = RootNavigationScreenProp<'SignIn'>;

export const SignInScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Button title="メールアドレスでログイン" />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
});
