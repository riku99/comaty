import { Text } from '@rneui/themed';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomAnimatedButton } from 'src/components/BottomAnimatedButton';
import { VStack } from 'src/components/VStack';
import { Sex } from 'src/generated/graphql';
import { useSex } from 'src/hooks/initialStatus';
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

  const { setSex, sex } = useSex();

  const onNextPress = () => {
    navigation.navigate('DateOfBirthInput');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text h2 style={styles.title}>
          性別
        </Text>
        <Text style={styles.desc}>一度登録した性別は変更できません。</Text>

        <VStack style={styles.items} space={16}>
          <SexItem
            title="男性"
            isSelected={sex === Sex.Male}
            onPress={() => setSex(Sex.Male)}
          />
          <SexItem
            title="女性"
            isSelected={sex === Sex.Female}
            onPress={() => setSex(Sex.Female)}
          />
          <SexItem
            title="無回答"
            isSelected={sex === Sex.NotSelected}
            onPress={() => setSex(Sex.NotSelected)}
          />
        </VStack>
      </View>

      <BottomAnimatedButton title="次へ" onPress={onNextPress} />
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
  items: {
    marginTop: 20,
  },
  title: {
    marginTop: 14,
  },
  desc: {
    marginTop: 18,
    color: theme.textGray,
  },
});
