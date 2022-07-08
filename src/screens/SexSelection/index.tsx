import { Text } from '@rneui/themed';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/BottomAnimatedButton';
import { theme } from 'src/styles';
import { SexItem } from './SexItem';

type Props = RootNavigationScreenProp<'SexSelection'>;

export const SexSelectionScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text h2>性別</Text>
        <Text
          style={{
            marginTop: 18,
            color: theme.textGray,
          }}
        >
          一度登録した性別は変更できません。
        </Text>

        <SexItem />
      </View>

      <BottomAnimatedButton title="次へ" />
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
});
