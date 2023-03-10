import { Text, TextProps } from '@rneui/themed';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  size: number;
  isSelected: boolean;
  label?: string;
  labelStyle?: TextProps['style'];
} & ComponentProps<typeof Pressable>;

export const RadioButton = ({
  size,
  isSelected,
  label,
  labelStyle,
  ...pressableProps
}: Props) => {
  const innerSize = size - 10;
  return (
    <Pressable style={styles.container} {...pressableProps}>
      <View
        style={[
          styles.outer,
          {
            width: size,
            height: size,
            borderRadius: size,
            borderWidth: 2,
            borderColor: isSelected ? theme.primary : theme.gray.formBorder,
          },
        ]}
      >
        {isSelected && (
          <View
            style={{
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize,
              backgroundColor: theme.primary,
            }}
          />
        )}
      </View>

      <Text style={[styles.lebel, labelStyle]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lebel: {
    marginLeft: 4,
  },
});
