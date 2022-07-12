import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = RootNavigationScreenProp<'MyPageMain'>;

export const MyPageScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'マイページ',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
