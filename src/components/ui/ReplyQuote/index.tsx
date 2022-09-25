import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';

type Props = {
  text: string;
};

export const ReplyQuote = ({ text }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.quoteLine} />
      <Text style={styles.quoteText} numberOfLines={2} ellipsizeMode="tail">{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quoteLine: {
    width: 6,
    backgroundColor: '#cccccc',
    height: '100%',
    borderRadius: 4,
  },
  quoteText: {
    marginLeft: 6,
    fontWeight: 'bold',
  },
});
