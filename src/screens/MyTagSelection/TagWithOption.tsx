import { AntDesign } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Tag } from 'src/components/ui/Tag';

type Props = {
  text: string;
  onOptionPress: () => void;
};

export const TagWithOption = ({ text, onOptionPress }: Props) => {
  return (
    <View>
      <Tag text={text} />

      <Pressable
        style={styles.optionButton}
        onPress={onOptionPress}
        hitSlop={10}
      >
        <AntDesign name="minus" size={18} color="#fff" />
      </Pressable>
    </View>
  );
};

const BUTTON_SIZE = 18;

const styles = StyleSheet.create({
  container: {},
  optionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE,
    backgroundColor: '#575757',
    position: 'absolute',
    bottom: -8,
    right: -6,
  },
});
