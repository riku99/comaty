import { Entypo } from '@expo/vector-icons';
import { Button, Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ModalItem, OverlayModal } from 'src/components/ui/OverlayModal';
import { useVerifyAgeMutation } from 'src/generated/graphql';
import { useLoadingOverlayVisible } from 'src/hooks/app/useLoadingOverlayVisible';
import { theme } from 'src/styles';

const MenkyosyoSample = require('src/assets/image/menkyosyo-sample.png');

type Props = RootNavigationScreenProp<'AgeVerification2'>;

export const AgeVerification2Screen = ({ navigation, route }: Props) => {
  const { selectedDocumentType } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '年齢確認2',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [verifyAgeMutation] = useVerifyAgeMutation();
  const { setLoadingVisible } = useLoadingOverlayVisible();
  const [imageData, setImageData] = useState<null | {
    uri: string;
    type: string;
  }>(null);

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
          setLoadingVisible(true);
          const result = await launchImageLibrary({
            selectionLimit: 1,
            mediaType: 'photo',
          });

          hidePhotoModal();

          if (result.didCancel) {
            return;
          }

          const { uri, type } = result.assets[0];

          setImageData({
            uri,
            type,
          });

          navigation.navigate('ConfirmAgeVerificationDocumentPhoto', {
            selectedDocumentType,
            imageData,
          });

          // const file = await processImageForMultipartRequest({ uri, type });

          // await verifyAgeMutation({
          //   variables: {
          //     input: {
          //       file,
          //       type: selectedDocumentType,
          //     },
          //   },
          //   onCompleted: () => {
          //     console.log('Success');
          //   },
          // });
        } catch (e) {
        } finally {
          hidePhotoModal();
          setLoadingVisible(false);
        }
      },
    },
  ];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.text1}>以下の情報を必ず写してください</Text>

          <View style={styles.checkItems}>
            <View style={styles.checkItem}>
              <Entypo name="check" size={22} color={theme.primary} />
              <Text style={styles.checkItemText}>生年月日</Text>
            </View>

            <View style={styles.checkItem}>
              <Entypo name="check" size={22} color={theme.primary} />
              <Text style={styles.checkItemText}>書類名称</Text>
            </View>

            <View style={styles.checkItem}>
              <Entypo name="check" size={22} color={theme.primary} />
              <Text style={styles.checkItemText}>発行元名称</Text>
            </View>
          </View>

          <Text style={styles.text2}>
            上記項目以外の顔写真や住所の部分は隠しても大丈夫です！
          </Text>

          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text>免許証を使用した例</Text>
            <Image
              source={MenkyosyoSample}
              style={{
                width: '100%',
                height: 230,
                marginTop: 4,
              }}
            />
          </View>
        </ScrollView>

        <Button
          containerStyle={{
            paddingHorizontal: 16,
            bottom: 4,
          }}
          title="写真を撮影"
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
    paddingBottom: 20,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkItems: {
    marginTop: 4,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  checkItemText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 4,
  },
  text2: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 32,
  },
});
