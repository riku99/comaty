import { Text } from '@rneui/themed';
import {
  ActivityIndicator,
  InputAccessoryView,
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
  onKeepRequestPress: () => void;
};

export const InputComposer = ({
  inputValue,
  onChangeText,
  onSendPress,
  isSending,
  onKeepRequestPress,
}: Props) => {
  const sendDisabled = !inputValue || isSending;
  const textInputId = 'textInput';

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input]}
          placeholder="メッセージを入力..."
          multiline
          value={inputValue}
          onChangeText={onChangeText}
          inputAccessoryViewID={textInputId}
        />

        <InputAccessoryView nativeID={textInputId}>
          <View style={styles.accessoryContainer}>
            <Pressable onPress={onKeepRequestPress}>
              <Text style={styles.keepRequest}>キープリクエスト</Text>
            </Pressable>
          </View>
        </InputAccessoryView>

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
  accessoryContainer: {
    height: 40,
    justifyContent: 'center',
    paddingLeft: 16,
    borderTopColor: theme.gray.boarder,
    borderTopWidth: 0.5,
    backgroundColor: '#fff',
  },
  keepRequest: {
    fontWeight: 'bold',
    color: theme.primary,
  },
});
