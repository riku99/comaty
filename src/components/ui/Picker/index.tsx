import { Picker as RNPicker } from '@react-native-picker/picker';
import { Text } from '@rneui/themed';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  items: { value: number | string; label: string }[];
} & ComponentProps<typeof RNPicker>;

export const Picker = ({ items, ...pickerProps }: Props) => {
  return (
    <View style={styles.container}>
      <RNPicker style={[styles.picker]} {...pickerProps}>
        {items.map((item, index) => (
          <RNPicker.Item key={index} label={item.label} value={item.value} />
        ))}
      </RNPicker>

      <Pressable style={styles.doneButton}>
        <Text style={styles.doneText}>完了</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    width: '100%',
    bottom: 0,
    borderTopColor: theme.gray.boarder,
    borderTopWidth: 1,
  },
  picker: {
    backgroundColor: '#fff',
    height: 250,
  },
  doneButton: {
    backgroundColor: theme.primary,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    position: 'absolute',
    top: 6,
    right: 14,
  },
  doneText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
