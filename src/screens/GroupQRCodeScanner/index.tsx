import { Text } from '@rneui/themed';
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from 'react';
import { StyleSheet, Vibration, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'GroupQRCodeScanner'>;

export const GroupQRCodeScannerScreen = ({ navigation }: Props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setScanned(true);
    Vibration.vibrate();
    console.log('type is ' + type);
    console.log('✋ data is ' + data);
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
