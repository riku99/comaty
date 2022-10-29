import { Text } from '@rneui/themed';
import {
  ActivityIndicator, InputAccessoryView,
  Pressable,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import {
  InputComposerDataInMessageRoomScreenFragment
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me/useMyId';
import { theme } from 'src/styles';

type Props = {
  inputValue: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
  isSending: boolean;
  onKeepRequestPress: () => void;
  fragmentData: InputComposerDataInMessageRoomScreenFragment;
  onAcceptRequestPress: () => void
};

export const InputComposer = ({
  inputValue,
  onChangeText,
  onSendPress,
  isSending,
  onKeepRequestPress,
  fragmentData,
  onAcceptRequestPress
}: Props) => {
  const sendDisabled = !inputValue || isSending;
  const textInputId = 'textInput';
  const myId = useMyId();

  const renderKeepingRequest = () => {
    if (fragmentData.kept) {
      return (
        <Text
          style={[
            styles.keepRequest,
            {
              color: '#C2C2C2',
            },
          ]}
        >
          キープ中
        </Text>
      );
    } else {
      return !!fragmentData?.keepingRequest ? (
        fragmentData.keepingRequest?.requestUser.id === myId ? (
          <View>
            <Text
              style={[
                styles.keepRequest,
                {
                  color: '#C2C2C2',
                },
              ]}
            >
              リクエスト済み
            </Text>
          </View>
        ) : (
          <Pressable onPress={onAcceptRequestPress}>
            <Text style={styles.keepRequest}>
              キープリクエストが届いています
            </Text>
          </Pressable>
        )
      ) : (
        <Pressable onPress={onKeepRequestPress}>
          <Text style={styles.keepRequest}>キープリクエスト</Text>
        </Pressable>
      );
    }
  };

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
            {renderKeepingRequest()}
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
