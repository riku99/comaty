import MaskedView from '@react-native-masked-view/masked-view';
import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

export const TopMessage = () => {
  return (
    <View>
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <View style={styles.maskElement}>
            <Text style={styles.message1}>誰にでも自由にメッセージ</Text>
            <Text style={[styles.message1, { marginTop: 4 }]}>を送ろう！</Text>
          </View>
        }
      >
        <View
          style={[styles.maskElementText, { backgroundColor: '#5f54ff' }]}
        />
        <View
          style={[styles.maskElementText, { backgroundColor: '#665cff' }]}
        />
        <View
          style={[styles.maskElementText, { backgroundColor: '#685eff' }]}
        />
        <View
          style={[styles.maskElementText, { backgroundColor: '#6d63ff' }]}
        />
        <View
          style={[styles.maskElementText, { backgroundColor: '#776eff' }]}
        />
      </MaskedView>

      <Text style={styles.alert}>
        ⚠︎年齢確認が完了していない場合はプランをアップグレードしてもメッセージができません。
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  maskedView: {
    flexDirection: 'row',
    height: 78,
  },
  maskElement: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
  },
  maskElementText: {
    flex: 1,
    height: '100%',
  },
  alert: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
    color: theme.gray.text,
  },
});
