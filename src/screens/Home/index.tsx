import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stories } from './Stories';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Stories />

      <View style={styles.nearbyUserContents}>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nearbyUserContents: {
    paddingHorizontal: 16,
  },
});
