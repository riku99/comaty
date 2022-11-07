import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';
import { RadioButton } from 'src/components/ui/RadioButton';

type Props = {
  isSelected: boolean;
  title: string;
  onSelected: () => void;
};

export const DocumentItem = ({ isSelected, title, onSelected }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onSelected}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <RadioButton size={24} isSelected={isSelected} pointerEvents="none" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer: {},
});
