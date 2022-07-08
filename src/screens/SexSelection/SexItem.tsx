import { Text } from '@rneui/themed';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { theme } from 'src/styles';

export const SexItem = () => {
  return (
    <Pressable style={styles.item}>
      <Text style={styles.title}>男性</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 52,
    backgroundColor: 'rgba(82, 110, 255, 0.25)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: theme.primary,
    fontSize: 18,
  },
});
