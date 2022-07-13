import React from 'react';
import { StyleSheet, View } from 'react-native';

export const ChatList = React.memo(() => {
  return <View style={styles.container}></View>;
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
