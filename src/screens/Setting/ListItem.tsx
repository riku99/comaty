import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  title: string;
  icon: JSX.Element;
  onPress?: () => void;
};

export const ListItem = ({ title, icon, onPress }: Props) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: pressed ? theme.gray.pressed : undefined,
            },
          ]}
        >
          <View style={styles.iconAndTitle}>
            {icon}
            <Text style={styles.title}>{title}</Text>
          </View>

          <FontAwesome
            name="angle-right"
            size={24}
            color={theme.gray.rightIcon}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 48,
  },
  iconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginLeft: 8,
  },
});
