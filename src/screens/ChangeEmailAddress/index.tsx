import { Input, Text } from '@rneui/themed';
import debounce from 'lodash.debounce';
import { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/ui/BottomAnimatedButton';
import { Loading } from 'src/components/ui/Loading';
import { useChangeEmailAddressScreenDataQuery } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { isValidEmail } from 'src/utils';

type Props = RootNavigationScreenProp<'ChangeEmailAddress'>;

export const ChangeEmailAddressScreen = ({ navigation }: Props) => {
  const { data, loading } = useChangeEmailAddressScreenDataQuery();

  const [newEmailAddress, setNewEmailAddress] = useState('');
  const [emailInputIsFocused, setEmailInputIsFocused] = useState(false);
  const [emailInputIsError, setEmailInputIsError] = useState(false);
  const [newEmailIsValid, setNewEmailIsValid] = useState(false);
  const borderBottomColor = emailInputIsError
    ? theme.red
    : emailInputIsFocused
    ? theme.primary
    : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'メールアドレスを変更',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const checkEmailInputValidation = useCallback(
    debounce((email) => {
      if (email) {
        setNewEmailIsValid(isValidEmail(email));
        setEmailInputIsError(!isValidEmail(email));
      }
    }, 700),
    [setEmailInputIsError]
  );

  if (loading) {
    return <Loading />;
  }

  if (!data?.me) {
    return null;
  }

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
      <Text style={styles.currentEmail}>{data.me.email}</Text>

      <Text style={[{ marginTop: 32 }, styles.label]}>新規</Text>
      <Input
        autoFocus
        value={newEmailAddress}
        onChange={({ nativeEvent }) => {
          setNewEmailAddress(nativeEvent.text);
          checkEmailInputValidation(nativeEvent.text);
        }}
        containerStyle={{
          paddingHorizontal: 0,
          marginTop: 6,
        }}
        inputContainerStyle={{
          borderBottomColor,
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
        errorMessage={
          emailInputIsError
            ? 'メールアドレスを正しく入力してください。'
            : undefined
        }
        errorStyle={{
          marginLeft: 0,
        }}
      />
      <BottomAnimatedButton
        title="次へ"
        disabled={emailInputIsError || !newEmailIsValid || !newEmailAddress}
      />
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
