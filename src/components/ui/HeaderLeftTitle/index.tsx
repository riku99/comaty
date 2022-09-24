import { Text } from '@rneui/themed';
import { StyleSheet } from 'react-native';

type Props = {
  title: string;
};

export const HeaderLeftTitle = ({ title }: Props) => {
  return <Text style={styles.headerTitleStyle}>{title}</Text>;
};

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});
