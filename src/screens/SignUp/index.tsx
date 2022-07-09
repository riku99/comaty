import { AntDesign } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

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
        <Button
          title="メールアドレスで登録"
          onPress={onEmailLoginPress}
          buttonStyle={{
            backgroundColor: theme.primary,
          }}
        />
        <Button
          title="Appleで登録・ログイン"
          buttonStyle={{
            backgroundColor: 'black',
          }}
          containerStyle={{
            marginTop: 20,
          }}
          icon={
            <AntDesign
              name="apple1"
              color="white"
              size={22}
              style={{ position: 'absolute', left: 20 }}
            />
          }
        />
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
