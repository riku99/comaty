import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';

type Props = {
  text: string;
  isMyMseeage: boolean;
};

export const MessageBubble = ({ text, isMyMseeage }: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isMyMseeage ? '#6778FF' : '#ECECEC',
          },
        ]}
      >
        <Text
          style={{
            color: isMyMseeage ? '#fff' : undefined,
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  bubble: {
    padding: 10,
    borderRadius: 12,
  },
});
