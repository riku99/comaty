import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { POST_MAX_TEXT_COUNT } from 'src/constants';
import { theme } from 'src/styles';

type Props = {
  text: string;
};

export const KeyboardAccessory = ({ text }: Props) => {
  return (
    <View style={styles.body}>
      <Text
        style={[
          styles.textCount,
          {
            color:
              text.length <= POST_MAX_TEXT_COUNT ? '#9c9c9c' : theme.alertRed,
          },
        ]}
      >{`${text.length} / ${POST_MAX_TEXT_COUNT}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCount: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
