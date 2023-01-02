import MaskedView from '@react-native-masked-view/masked-view';
import { Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'PlanSelection'>;

export const PlanSelectionScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <MaskedView
          style={{
            flexDirection: 'row',
            marginTop: 38,
            height: 78,
          }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 26,
                }}
              >
                誰にでも自由にメッセージ
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 26,
                  marginTop: 4,
                }}
              >
                を送ってみよう！
              </Text>
            </View>
          }
        >
          <View
            style={{ flex: 1, height: '100%', backgroundColor: '#5f54ff' }}
          />
          <View
            style={{ flex: 1, height: '100%', backgroundColor: '#665cff' }}
          />
          <View
            style={{ flex: 1, height: '100%', backgroundColor: '#685eff' }}
          />
          <View
            style={{ flex: 1, height: '100%', backgroundColor: '#6d63ff' }}
          />
          <View
            style={{ flex: 1, height: '100%', backgroundColor: '#776eff' }}
          />
        </MaskedView>

        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: '500',
            marginTop: 8,
            color: theme.gray.text,
          }}
        >
          {
            '⚠︎年齢確認が完了していない場合はプランをアップグレードしてもメッセージができません。\n先に年齢確認を完了させることをおすすめします。'
          }
        </Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topTitle: {
    marginTop: 32,
  },
});
