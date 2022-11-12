import { Button, Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AgeVerificationDocumentType,
  useVerifyAgeMutation,
} from 'src/generated/graphql';
import { processImageForMultipartRequest } from 'src/helpers/processImagesForMultipartRequest';
import { useLoadingOverlayVisible } from 'src/hooks/app/useLoadingOverlayVisible';

type Props = RootNavigationScreenProp<'ConfirmAgeVerificationDocumentPhoto'>;

const getDocumentTypeName = (type: AgeVerificationDocumentType) => {
  switch (type) {
    case AgeVerificationDocumentType.Menkyosyo:
      return '免許証';
    case AgeVerificationDocumentType.Hokensyo:
      return '健康保険証';
    case AgeVerificationDocumentType.Passport:
      return 'パスポート';
    case AgeVerificationDocumentType.MyNumber:
      return 'マイナンバーカード';
  }
};

export const ConfirmAgeVerificationDocumentPhotoScreen = ({
  navigation,
  route,
}: Props) => {
  const {
    params: { imageData, selectedDocumentType },
  } = route;
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [verifyAgeMutation] = useVerifyAgeMutation();
  const { setLoadingVisible } = useLoadingOverlayVisible();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '書類の確認',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const onSubmitButtonPress = async () => {
    try {
      setLoadingVisible(true);

      const file = await processImageForMultipartRequest({
        uri: imageData.uri,
        type: imageData.type,
      });
      await verifyAgeMutation({
        variables: {
          input: {
            file,
            type: selectedDocumentType,
          },
        },
        onCompleted: () => {
          console.log('OK');
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
      <Text style={styles.text1}>{`提出する書類: ${getDocumentTypeName(
        selectedDocumentType
      )}`}</Text>
      <Image
        source={{ uri: imageData.uri }}
        resizeMode="contain"
        style={styles.image}
      />

      <Button
        title="提出する"
        containerStyle={[
          styles.button,
          {
            bottom: safeAreaBottom + 4,
          },
        ]}
        onPress={onSubmitButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: 240,
    marginTop: 20,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
});
