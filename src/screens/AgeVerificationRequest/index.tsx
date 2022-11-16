import { Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Card from 'src/assets/svg/professional-card.svg';
import { BottomAnimatedButton } from 'src/components/ui/BottomAnimatedButton';

type Props = RootNavigationScreenProp<'AgeVerificationRequest'>;

export const AgeVerificationRequestScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Card
        width={200}
        height={200}
        style={{
          alignSelf: 'center',
        }}
      />
      <Text style={styles.requestText}>
        メッセージをするには年齢確認が必要です。
      </Text>

      <BottomAnimatedButton
        title="年齢確認をする"
        onPress={() => {
          navigation.navigate('AgeVerification');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  requestText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 20,
  },
});
