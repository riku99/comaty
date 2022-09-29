import { Text } from '@rneui/themed';
import { Pressable, StyleSheet } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export const HeaderRightButton = ({
  onPress,
  title,
  disabled = false,
}: Props) => {
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <Text
        style={[
          styles.title,
          {
            color: disabled ? theme.gray.disable : theme.primary,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
