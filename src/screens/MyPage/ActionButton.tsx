import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
  icon: JSX.Element;
  title: string;
  onPress?: () => void;
};

export const ActionButton = ({ icon, title, onPress }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.actionButton}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const ACTION_BUTTON_SIZE = 66;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#fff',
    shadowColor: 'rgba(100, 100, 111, 0.6)',
    shadowOffset: {
      width: 2,
      height: 7,
    },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: ACTION_BUTTON_SIZE,
    height: ACTION_BUTTON_SIZE,
    borderRadius: ACTION_BUTTON_SIZE,
  },
  title: {
    fontWeight: 'bold',
    color: '#3E3E3E',
    marginTop: 8,
  },
});
