import { ComponentProps } from 'react';
import { StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import { theme } from 'src/styles';

type Props = ComponentProps<typeof RNTextInput>;

export const TextInput = ({ ...inputProps }: Props) => {
  const { style: inputStyle, ...propsWithoutStyle } = inputProps;
  return (
    <View>
      <RNTextInput
        selectionColor={theme.primary}
        style={[styles.input, inputStyle]}
        {...propsWithoutStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
  },
});
