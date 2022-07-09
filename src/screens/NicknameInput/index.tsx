import { Input, Text } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/BottomAnimatedButton';
import { useNickname } from 'src/stores/initialStatus';
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

  const completionDisabled = !nickname || nickname.length > 8;

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
        />
      </View>

      <BottomAnimatedButton title="完了" disabled={completionDisabled} />
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
