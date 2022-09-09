import { Text } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  text: string;
};

export const Tag = ({ text }: Props) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{`#${text}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    borderWidth: 0.5,
    borderColor: theme.boarderGray,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  tagText: {
    fontWeight: 'bold',
  },
});
