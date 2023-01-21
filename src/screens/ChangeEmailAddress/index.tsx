import { Input, Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/ui/BottomAnimatedButton';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'ChangeEmailAddress'>;

export const ChangeEmailAddressScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'メールアドレスを変更',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const [emailInputIsFocused, setEmailInputIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            marginTop: 22,
          },
          styles.label,
        ]}
      >
        現在
      </Text>
      <Text style={styles.currentEmail}>riku@riku.com</Text>

      <Text style={[{ marginTop: 32 }, styles.label]}>新規</Text>
      <Input
        autoFocus
        containerStyle={{
          paddingHorizontal: 0,
          marginTop: 6,
        }}
        inputContainerStyle={{
          borderBottomColor: emailInputIsFocused ? theme.primary : undefined,
          borderBottomWidth: 1.5,
        }}
        inputStyle={{
          fontSize: 16,
          fontWeight: '500',
        }}
        selectionColor={theme.primary}
        placeholder="メールアドレス"
        onFocus={() => {
          setEmailInputIsFocused(true);
        }}
      />
      <BottomAnimatedButton title="次へ" disabled />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: 'bold',
    color: theme.gray.text,
    fontSize: 16,
  },
  currentEmail: {
    fontWeight: '500',
    marginTop: 12,
    fontSize: 16,
  },
});
