import { Button, Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { AgeVerificationDocumentType } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { DocumentItem } from './DocumentItem';

type Props = RootNavigationScreenProp<'AgeVerification'>;

export const AgeVerificationScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '年齢確認',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const [selectedDocumentType, setSelectedDocumentType] =
    useState<AgeVerificationDocumentType>(
      AgeVerificationDocumentType.Menkyosyo
    );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.text1}>
            提出する本人確認書類を選択してください
          </Text>

          <Text style={styles.text2}>選択した書類を提出してください。</Text>

          <Text style={styles.text2}>
            提出されたデータは年齢確認完了後、速やかに消去されます。
          </Text>

          <View
            style={{
              width: '100%',
              marginTop: 18,
            }}
          >
            <DocumentItem
              title="運転免許証"
              isSelected={
                selectedDocumentType === AgeVerificationDocumentType.Menkyosyo
              }
              onSelected={() => {
                setSelectedDocumentType(AgeVerificationDocumentType.Menkyosyo);
              }}
            />
            <DocumentItem
              title="健康保険証"
              isSelected={
                selectedDocumentType === AgeVerificationDocumentType.Hokensyo
              }
              onSelected={() => {
                setSelectedDocumentType(AgeVerificationDocumentType.Hokensyo);
              }}
            />
            <DocumentItem
              title="パスポート"
              isSelected={
                selectedDocumentType === AgeVerificationDocumentType.Passport
              }
              onSelected={() => {
                setSelectedDocumentType(AgeVerificationDocumentType.Passport);
              }}
            />
            <DocumentItem
              title="マイナンバーカード"
              isSelected={
                selectedDocumentType === AgeVerificationDocumentType.MyNumber
              }
              onSelected={() => {
                setSelectedDocumentType(AgeVerificationDocumentType.MyNumber);
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
          </View>
        </ScrollView>

        <Button
          containerStyle={{
            paddingHorizontal: 16,
            bottom: 4,
          }}
          title="次へ"
          onPress={() => {
            navigation.navigate('AgeVerification2', {
              selectedDocumentType,
            });
          }}
        />
      </SafeAreaView>
    </>
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
    marginTop: 12,
    width: '100%',
  },
});
