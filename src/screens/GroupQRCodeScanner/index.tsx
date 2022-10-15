import { Text } from '@rneui/themed';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { StyleSheet, Vibration, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';
import { LoadingOverlay } from 'src/components/ui/LoadingOverlay';
import {
  ConfirmGroupOwnerInGroupQrCodeFragment,
  GroupQrCodeOwnerInGroupQrCodeDocument,
  GroupQrCodeOwnerInGroupQrCodeQuery,
} from 'src/generated/graphql';
import { useCustomLazyQuery } from 'src/hooks/apollo/useCustomLazyQuery';
import { theme } from 'src/styles';
import { GroupQRCodeValue } from 'src/types';
import { ConfirmGroupOwner } from './ConfimGroupOwner';

type Props = RootNavigationScreenProp<'GroupQRCodeScanner'>;

export const GroupQRCodeScannerScreen = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loadingOverlayVisible, setLoadingOverlayVisible] = useState(false);
  const groupQRCodeUserLazyQuery =
    useCustomLazyQuery<GroupQrCodeOwnerInGroupQrCodeQuery>(
      GroupQrCodeOwnerInGroupQrCodeDocument
    );
  const [dataForConfirmingOwner, setDataForConfirmingOwner] =
    useState<null | ConfirmGroupOwnerInGroupQrCodeFragment>(null);

  useEffect(() => {
    const getBarCodeScannerPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }: BarCodeEvent) => {
    try {
      setScanned(true);
      setLoadingOverlayVisible(true);
      Vibration.vibrate();
      const codeValue = JSON.parse(data) as GroupQRCodeValue;
      const { data: responseData } = await groupQRCodeUserLazyQuery({
        id: codeValue.ownerId,
      });
      if (responseData?.user) {
        setDataForConfirmingOwner(responseData.user);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingOverlayVisible(false);
    }
  };

  if (hasPermission === null) {
    return null;
  }

  if (hasPermission === false) {
    return (
      <View
        style={[
          styles.container,
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Text>カメラへのアクセスが許可されていません。</Text>

        <View style={styles.closeButton}>
          <CloseButton size={36} />
        </View>
      </View>
    );
  }

  if (dataForConfirmingOwner) {
    const onCancelPress = () => {
      setDataForConfirmingOwner(null);
      setScanned(false);
    };

    const onMakeMemberPress = async () => {};

    return (
      <ConfirmGroupOwner
        fragmentData={dataForConfirmingOwner}
        onCancelPress={onCancelPress}
        onMakeMemberPress={onMakeMemberPress}
      />
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />

      <View style={styles.bottomContainer}>
        <Text
          style={{
            color: theme.gray.text,
          }}
        >
          QRコードをスキャンしてグループになれます。
        </Text>
      </View>

      <View style={styles.closeButton}>
        <CloseButton color={'#fff'} size={36} />
      </View>

      {loadingOverlayVisible && <LoadingOverlay />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scanner: {
    width: '100%',
    height: '70%',
  },
  bottomContainer: {
    alignItems: 'center',
    height: '30%',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
});
