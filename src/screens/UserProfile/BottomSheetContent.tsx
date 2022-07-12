import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from 'src/styles';

export const BottomSheetContent = React.memo(() => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.name}>
        Winter <Text style={styles.age}>24</Text>
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  name: {
    color: theme.black,
    fontWeight: 'bold',
    fontSize: 26,
  },
  age: {
    color: theme.black,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
