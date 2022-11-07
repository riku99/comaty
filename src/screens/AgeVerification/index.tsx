import { Button, Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { theme } from 'src/styles';
import { DocumentItem } from './DocumentItem';

type Props = RootNavigationScreenProp<'AgeVerification'>;

type AgeVerificationDocumentType =
  | 'MENKYOSHO'
  | 'HOKENSYO'
  | 'PASSPORT'
  | 'MY_NUMBER';

export const AgeVerificationScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '年齢確認',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const [selectedDocumentType, setSelectedDocumentType] =
    useState<AgeVerificationDocumentType>('MENKYOSHO');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.text1}>提出する本人確認書類を選択してください</Text>
        <Text style={styles.text2}>
          選択した書類以外の種類を提出すると年齢確認に失敗する可能性があります。
        </Text>

        <DocumentItem
          title="運転免許証"
          isSelected={selectedDocumentType === 'MENKYOSHO'}
          onSelected={() => {
            setSelectedDocumentType('MENKYOSHO');
          }}
        />
        <DocumentItem
          title="健康保険証"
          isSelected={selectedDocumentType === 'HOKENSYO'}
          onSelected={() => {
            setSelectedDocumentType('HOKENSYO');
          }}
        />
        <DocumentItem
          title="パスポート"
          isSelected={selectedDocumentType === 'PASSPORT'}
          onSelected={() => {
            setSelectedDocumentType('PASSPORT');
          }}
        />
        <DocumentItem
          title="マイナンバーカード"
          isSelected={selectedDocumentType === 'MY_NUMBER'}
          onSelected={() => {
            setSelectedDocumentType('MY_NUMBER');
          }}
        />
        <Text
          style={{
            alignSelf: 'flex-start',
            fontSize: 12,
            color: theme.gray.text,
          }}
        >
          ※マイナンバー通知カード不可
        </Text>
      </ScrollView>

      <Button
        containerStyle={{
          paddingHorizontal: 16,
          bottom: 4,
        }}
        title="写真撮影"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    alignItems: 'center',
  },
  text1: {
    color: theme.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  text2: {
    color: theme.gray.text,
    marginTop: 6,
    marginBottom: 12,
  },
});
