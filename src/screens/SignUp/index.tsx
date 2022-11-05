import { Text } from '@rneui/themed';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { SignUpButtonGroup } from './SignUpButtonGroup';

type Props = RootNavigationScreenProp<'SignUp'>;

export const SignUpScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <SignUpButtonGroup />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 18,
          }}
          onPress={() => {
            navigation.navigate('EmailSignIn');
          }}
        >
          既にメールアドレスで登録済みの方
        </Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
});
