import { AntDesign } from '@expo/vector-icons';
import { Text, TextProps } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  size?: number;
  label?: string;
  labelStyle?: TextProps['style'];
  onPress?: () => void;
  isChecked: boolean;
};

export const CheckBox = ({
  label,
  labelStyle,
  onPress,
  isChecked,
  size = 22,
}: Props) => {
  const iconSize = size - 4;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.box,
          {
            backgroundColor: isChecked ? theme.primary : '#fff',
            width: size,
            height: size,
            borderWidth: isChecked ? 0 : 1,
            borderColor: isChecked ? undefined : '#6B6B6B',
          },
        ]}
      >
        {isChecked && <AntDesign name="check" size={iconSize} color="#fff" />}
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
