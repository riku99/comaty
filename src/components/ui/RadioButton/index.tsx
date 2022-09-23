import { Text, TextProps } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  size: number;
  isSelected: boolean;
  label: string;
  labelStyle?: TextProps['style'];
  onPress?: () => void;
};

export const RadioButton = ({
  size,
  isSelected,
  label,
  labelStyle,
  onPress,
}: Props) => {
  const innerSize = size - 10;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.outer,
          {
            width: size,
            height: size,
            borderRadius: size,
            borderWidth: 2,
            borderColor: isSelected ? theme.primary : '#6B6B6B',
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
