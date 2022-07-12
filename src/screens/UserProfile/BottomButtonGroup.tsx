import { Feather, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

export const BottomButtonGroup = () => {
  return (
    <View style={styles.content}>
      <Pressable style={styles.showGroupButton}>
        <MaterialIcons name="group" size={ICON_SIZE} color={theme.secondary} />
      </Pressable>
      <Pressable style={styles.sendMessageButton}>
        <Feather name="send" size={ICON_SIZE} color="white" />
      </Pressable>
    </View>
  );
};

const ICON_SIZE = 26;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
  },
  showGroupButton: {
    width: 58,
    height: 58,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1eaf2',
  },
  sendMessageButton: {
    width: 58,
    height: 58,
    borderRadius: 100,
    backgroundColor: theme.primary,
    marginLeft: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
