import { Text } from '@rneui/themed';
import LottieView from 'lottie-react-native';
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Done from 'src/assets/lottie/done.json';
import { BottomAnimatedButton } from 'src/components/BottomAnimatedButton';

type Props = RootNavigationScreenProp<'SignUpCompletion'>;

export const SignUpCompletionScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, [navigation]);

  const onNextPress = () => {
    navigation.navigate('SexSelection');
  };

  return (
    <View style={styles.container}>
      <View style={styles.doneContainer}>
        <LottieView source={Done} autoPlay loop={false} style={styles.done} />
      </View>

      <Text style={styles.doneText}>登録が完了しました!</Text>
      <Text style={styles.doneText2}>
        初めにアプリで必要な情報を入力してください。
      </Text>

      <BottomAnimatedButton title="入力画面へ" onPress={onNextPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  doneContainer: {
    marginTop: 100,
  },
  done: {
    width: 140,
    height: 140,
  },
  doneText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 14,
  },
  doneText2: {
    fontWeight: 'bold',
    marginTop: 24,
    fontSize: 17,
  },
});
