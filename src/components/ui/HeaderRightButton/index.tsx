import { Text } from '@rneui/themed';
import { Pressable, StyleSheet } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  title: string;
  onPress: () => void;
};

export const HeaderRightButton = ({ onPress, title }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.primary,
  },
});
