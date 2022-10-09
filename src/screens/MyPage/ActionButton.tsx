import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
  icon: JSX.Element;
  title: string;
  onPress?: () => void;
  buttonSize: number;
};

export const ActionButton = ({ icon, title, onPress, buttonSize }: Props) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.actionButton,
          {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize,
          },
        ]}
      >
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

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
  },
  title: {
    fontWeight: 'bold',
    color: '#3E3E3E',
    marginTop: 8,
  },
});
