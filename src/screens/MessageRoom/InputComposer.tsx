import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  inputValue: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
};

export const InputComposer = ({
  inputValue,
  onChangeText,
  onSendPress,
}: Props) => {
  const sendDisabled = !inputValue;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="メッセージを入力..."
          multiline
          value={inputValue}
          onChangeText={onChangeText}
        />

        <Pressable onPress={onSendPress} disabled={sendDisabled}>
          <Text
            style={[
              styles.sendButton,
              {
                color: sendDisabled ? '#737373' : theme.primary,
              },
            ]}
          >
            送信
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    height: 38,
    width: '94%',
    backgroundColor: '#EFEFEF',
    borderRadius: 18,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    height: '100%',
    fontSize: 16,
  },
  sendButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
