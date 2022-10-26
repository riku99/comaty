import { Entypo } from '@expo/vector-icons';
import { Text, TextProps } from '@rneui/themed';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  size?: number;
  label?: string;
  labelStyle?: TextProps['style'];
  isChecked: boolean;
} & ComponentProps<typeof Pressable>;

export const CheckBox = ({
  label,
  labelStyle,
  isChecked,
  size = 22,
  ...pressableProps
}: Props) => {
  const iconSize = size - 6.5;
  return (
    <Pressable style={styles.container} {...pressableProps}>
      <View
        style={[
          styles.box,
          {
            backgroundColor: isChecked ? theme.primary : '#fff',
            width: size,
            height: size,
            borderWidth: isChecked ? 0 : 2,
            borderColor: isChecked ? undefined : theme.gray.formBorder,
          },
        ]}
      >
        {/* {isChecked && <AntDesign name="check" size={iconSize} color="#fff" />} */}
        {isChecked && <Entypo name="check" size={iconSize} color="#fff" />}
      </View>
      {!!label && <Text style={[{ marginLeft: 4 }, labelStyle]}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  box: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
