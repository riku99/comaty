import { Input, Text } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/ui/BottomAnimatedButton';
import { useUpdateInitialStatusMutation } from 'src/generated/graphql';
import { useDateOfBirth, useNickname, useSex } from 'src/hooks/initialStatus';
import { useLoadingVisible } from 'src/hooks/loadingOverlay';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'NicknameInput'>;

export const NicknameInputScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const [focused, setFocused] = useState(false);
  const { nickname, setNickname } = useNickname();
  const { sex } = useSex();
  const { birthDay, birthMonth, birthYear } = useDateOfBirth();
  const { setLoadingVisible } = useLoadingVisible();
  const [updateInitialStatus] = useUpdateInitialStatusMutation();

  const completionDisabled = !nickname || nickname.length > 8;

  const onCompletionPress = async () => {
    if (!birthDay || !birthMonth || !birthYear || !nickname) {
      Alert.alert(
        '入力が正しく完了していません',
        '初めからやり直してください。'
      );
      return;
    }

    try {
      setLoadingVisible(true);

      await updateInitialStatus({
        variables: {
          input: {
            sex,
            nickname,
            birthDay,
            birthMonth,
            birthYear,
          },
        },
        onCompleted: () => {
          navigation.navigate('BottomTab');
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text h2 style={styles.title}>
          ニックネーム
        </Text>

        <Text style={styles.desc}>
          {'8文字以内で入力してください。\n後から変更できます。'}
        </Text>

        <Input
          containerStyle={styles.inputContainer}
          onChangeText={setNickname}
          onFocus={() => {
            setFocused(true);
          }}
          inputContainerStyle={{
            borderColor: focused ? theme.primary : theme.formBorderGray,
          }}
          style={styles.inputText}
          value={nickname}
        />
      </View>

      <BottomAnimatedButton
        title="完了"
        disabled={completionDisabled}
        onPress={onCompletionPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contents: {
    paddingHorizontal: 14,
  },
  title: {
    marginTop: 14,
  },
  desc: {
    marginTop: 16,
    color: theme.textGray,
    lineHeight: 20,
  },
  inputContainer: {
    marginTop: 16,
  },
  inputText: {
    fontWeight: 'bold',
  },
});
