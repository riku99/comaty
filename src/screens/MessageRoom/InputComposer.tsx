import { Text } from '@rneui/themed';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { theme } from 'src/styles';

type Props = {
  inputValue: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
  isSending: boolean;
};

export const InputComposer = ({
  inputValue,
  onChangeText,
  onSendPress,
  isSending,
}: Props) => {
  const sendDisabled = !inputValue || isSending;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="メッセージを入力..."
          multiline
          value={inputValue}
          onChangeText={onChangeText}
        />

        <Pressable onPress={onSendPress} disabled={sendDisabled}>
          {isSending ? (
            <ActivityIndicator />
          ) : (
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
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '94%',
    backgroundColor: '#EFEFEF',
    borderRadius: 18,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    fontSize: 16,
    maxHeight: 88,
  },
  sendButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
