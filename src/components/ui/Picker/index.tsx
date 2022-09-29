import { Picker as RNPicker } from '@react-native-picker/picker';
import { Text } from '@rneui/themed';
import { AnimatePresence, MotiView } from 'moti';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  isVisible: boolean;
  items: { value: number | string; label: string }[];
  hidePicker: () => void;
} & ComponentProps<typeof RNPicker>;

export const Picker = ({
  isVisible,
  items,
  hidePicker,
  ...pickerProps
}: Props) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <MotiView
          from={{
            translateY: 250,
          }}
          animate={{
            translateY: 0,
          }}
          transition={{
            duration: 200,
            type: 'timing',
          }}
          exit={{
            translateY: 250,
          }}
        >
          <View style={styles.container}>
            <RNPicker style={[styles.picker]} {...pickerProps}>
              {items.map((item, index) => (
                <RNPicker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </RNPicker>

            <Pressable style={styles.doneButton} onPress={hidePicker}>
              <Text style={styles.doneText}>完了</Text>
            </Pressable>
          </View>
        </MotiView>
      )}
    </AnimatePresence>
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
    height: 250,
  },
  picker: {
    backgroundColor: '#fff',
    marginTop: 12,
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
