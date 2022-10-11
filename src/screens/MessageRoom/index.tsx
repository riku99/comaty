import { filter } from 'graphql-anywhere';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from 'src/components/ui/Loading';
import {
  MessageBubbleDataInMessageRoomFragment,
  MessageBubbleDataInMessageRoomFragmentDoc,
  MessageRoomScreenDataDocument,
  MessageRoomScreenDataQuery,
  useMessageRoomScreenDataQuery,
  useSendMessageMutation,
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me';
import { HeaderLeft } from './HeaderLeft';
import { InputComposer } from './InputComposer';
import { MessageBubble } from './MessageBubble';
import { BubbleType } from './types';

type Props = RootNavigationScreenProp<'MessageRoom'>;

type MessageItem =
  MessageRoomScreenDataQuery['messageRoom']['messages']['edges'][number];

export const MessageRoomScreen = ({ navigation, route }: Props) => {
  const { userId, roomId } = route.params;
  const myId = useMyId();

  const { data } = useMessageRoomScreenDataQuery({
    variables: {
      id: roomId,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => <HeaderLeft userId={userId} />,
    });
  }, [userId, navigation]);

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [inputText, setInputText] = useState('');
  const [sendMessageMutation] = useSendMessageMutation();

  const composerBottom = useSharedValue(safeAreaBottom);
  const composerStyle = useAnimatedStyle(() => {
    return {
      bottom: composerBottom.value,
    };
  });

  const listHeaderHeight = useSharedValue(60 + keyboardHeight);
  const listHeaderStyle = useAnimatedStyle(() => {
    return {
      height: listHeaderHeight.value,
    };
  });

  useEffect(() => {
    if (data?.messageRoom.messages) {
      setMessages(data?.messageRoom.messages.edges);
    }
  }, [data?.messageRoom.messages]);

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardWillShow', (e) => {
      composerBottom.value = withTiming(e.endCoordinates.height, {
        duration: e.duration,
      });

      listHeaderHeight.value = withTiming(
        e.endCoordinates.height + 60 - safeAreaBottom,
        {
          duration: e.duration,
        }
      );

      setKeyboardHeight(e.endCoordinates.height);
    });

    return () => {
      subscription.remove();
    };
  }, [safeAreaBottom]);

  const renderMessageItem = useCallback(
    ({ item, index }: { item: MessageItem; index: number }) => {
      const { sender } = item.node;
      const isMyMessage = sender.id === myId;

      const previousData = messages[index - 1];
      const latorData = messages[index + 1];

      const previousDataSender = previousData?.node?.sender;
      const latorDataSender = latorData?.node?.sender;

      let bubbleType: BubbleType = 'notChunk';

      if (isMyMessage) {
        if (previousDataSender?.id === myId && latorDataSender?.id === myId) {
          bubbleType = 'middleChunk';
        } else if (latorDataSender?.id === myId) {
          bubbleType = 'bottomChunk';
        } else if (previousDataSender?.id === myId) {
          bubbleType = 'topChunk';
        }
      } else {
        if (
          previousData &&
          previousDataSender?.id !== myId &&
          latorData &&
          latorDataSender?.id !== myId
        ) {
          bubbleType = 'middleChunk';
        } else if (latorData && latorDataSender?.id !== myId) {
          bubbleType = 'bottomChunk';
        } else if (previousData && previousDataSender?.id !== myId) {
          bubbleType = 'topChunk';
        }
      }

      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
            marginTop: 2,
          }}
        >
          <MessageBubble
            isMyMseeage={isMyMessage}
            bubbleType={bubbleType}
            fragmentData={filter<MessageBubbleDataInMessageRoomFragment>(
              MessageBubbleDataInMessageRoomFragmentDoc,
              item.node
            )}
          />
        </View>
      );
    },
    [messages]
  );

  const onSendPress = async () => {
    try {
      setInputText('');
      await sendMessageMutation({
        variables: {
          roomId,
          input: {
            text: inputText,
          },
        },
        update: (cache, { data: responseData }) => {
          if (!responseData) {
            return;
          }

          const cachedMessageRoomScreenDataQuery =
            cache.readQuery<MessageRoomScreenDataQuery>({
              query: MessageRoomScreenDataDocument,
              variables: {
                id: roomId,
              },
            });

          if (cachedMessageRoomScreenDataQuery) {
            const newEdge = {
              node: responseData.createMessage,
              cursor: '',
            };
            const newEdges = [
              newEdge,
              ...cachedMessageRoomScreenDataQuery.messageRoom.messages.edges,
            ];

            cache.writeQuery({
              query: MessageRoomScreenDataDocument,
              data: {
                messageRoom: {
                  ...cachedMessageRoomScreenDataQuery.messageRoom,
                  messages: {
                    ...cachedMessageRoomScreenDataQuery.messageRoom.messages,
                    edges: newEdges,
                  },
                },
              },
            });
          }
        },
      });
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  if (!data?.messageRoom) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        renderItem={renderMessageItem}
        data={messages}
        keyExtractor={(item) => item.node.id.toString()}
        keyboardShouldPersistTaps="always"
        ListHeaderComponent={() => <Animated.View style={[listHeaderStyle]} />}
        inverted
        contentContainerStyle={styles.contentContainer}
      />

      <Animated.View style={[styles.inputContainer, composerStyle]}>
        <InputComposer
          inputValue={inputText}
          onChangeText={setInputText}
          onSendPress={onSendPress}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingBottom: 4,
    justifyContent: 'flex-end',
  },
  inputContainer: {
    position: 'absolute',
    width: '100%',
  },
});
