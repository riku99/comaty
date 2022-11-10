import { Button, Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { launchImageLibrary } from 'react-native-image-picker';
import { ModalItem, OverlayModal } from 'src/components/ui/OverlayModal';
import { processImageForMultipartRequest } from 'src/helpers/processImagesForMultipartRequest';
import { theme } from 'src/styles';
import { DocumentItem } from './DocumentItem';

type Props = RootNavigationScreenProp<'AgeVerification'>;

type AgeVerificationDocumentType =
  | 'MENKYOSYO'
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
    useState<AgeVerificationDocumentType>('MENKYOSYO');
  const [photoModalVisible, setPhotoModalVisible] = useState(false);

  const hidePhotoModal = () => {
    setPhotoModalVisible(false);
  };

  const photoModalItems: ModalItem[] = [
    {
      title: 'カメラで撮る',
      onPress: () => {
        hidePhotoModal();
      },
    },
    {
      title: 'カメラロールから選択',
      onPress: async () => {
        try {
          const result = await launchImageLibrary({
            selectionLimit: 1,
            mediaType: 'photo',
          });

          if (result.didCancel) {
            return;
          }

          const { uri, type } = result.assets[0];

          const file = await processImageForMultipartRequest({ uri, type });
        } catch (e) {
        } finally {
          hidePhotoModal();
        }
      },
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.text1}>
            提出する本人確認書類を選択してください
          </Text>

          <Text style={styles.text2}>選択した書類を提出してください。</Text>

          <Text style={styles.text2}>
            ハッキリと書類が写っている写真を提出してください。
          </Text>

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
              isSelected={selectedDocumentType === 'MENKYOSYO'}
              onSelected={() => {
                setSelectedDocumentType('MENKYOSYO');
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
          </View>
        </ScrollView>

        <Button
          containerStyle={{
            paddingHorizontal: 16,
            bottom: 4,
          }}
          title="次へ"
          onPress={() => {
            setPhotoModalVisible(true);
          }}
        />
      </SafeAreaView>

      <OverlayModal
        isVisible={photoModalVisible}
        items={photoModalItems}
        onBackdropPress={hidePhotoModal}
        onCancel={hidePhotoModal}
      />
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
