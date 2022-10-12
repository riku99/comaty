import { filter } from 'graphql-anywhere';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import { btoa } from 'react-native-quick-base64';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import { Loading } from 'src/components/ui/Loading';
import {
  MessageBubbleDataInMessageRoomFragment,
  MessageBubbleDataInMessageRoomFragmentDoc,
  MessageRoomScreenDataDocument,
  MessageRoomScreenDataQuery,
  RoomMessagesInMessageRoomScreenDocument,
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

  const { data, fetchMore } = useMessageRoomScreenDataQuery({
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
  const [
    higherThandefaultInputComposerHeight,
    setHigherThandefaultInputComposerHeight,
  ] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const toast = useToast();

  const composerBottom = useSharedValue(safeAreaBottom);
  const composerStyle = useAnimatedStyle(() => {
    return {
      bottom: composerBottom.value,
    };
  });

  const listHeaderHeight = useSharedValue(
    DEFAULT_INPUT_COMPOSER_HEIGHT + keyboardHeight
  );
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
        e.endCoordinates.height +
          DEFAULT_INPUT_COMPOSER_HEIGHT -
          safeAreaBottom,
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
            marginTop: 4,
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
      setIsSending(true);
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
      toast.show('送信に失敗しました');
    } finally {
      setIsSending(false);
    }
  };

  if (!data?.messageRoom) {
    return <Loading />;
  }

  const infiniteLoad = async () => {
    const { pageInfo } = data.messageRoom.messages;

    if (pageInfo.hasNextPage) {
      const { endCursor } = pageInfo;
      await fetchMore({
        variables: {
          messagesAfter: endCursor ? btoa(endCursor) : undefined,
          messagesFirst: 20,
          id: roomId,
        },
        query: RoomMessagesInMessageRoomScreenDocument,
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <InfiniteFlatList
        renderItem={renderMessageItem}
        data={messages}
        keyExtractor={(item) => item.node.id.toString()}
        keyboardShouldPersistTaps="always"
        ListHeaderComponent={() => <Animated.View style={[listHeaderStyle]} />}
        inverted
        contentContainerStyle={styles.contentContainer}
        infiniteLoad={infiniteLoad}
      />

      <Animated.View
        style={[styles.inputContainer, composerStyle]}
        onLayout={(e) => {
          if (e.nativeEvent.layout.height > DEFAULT_INPUT_COMPOSER_HEIGHT) {
            setHigherThandefaultInputComposerHeight(true);
          } else {
            setHigherThandefaultInputComposerHeight(false);
          }

          if (
            e.nativeEvent.layout.height > DEFAULT_INPUT_COMPOSER_HEIGHT ||
            higherThandefaultInputComposerHeight
          ) {
            listHeaderHeight.value = withTiming(
              keyboardHeight + e.nativeEvent.layout.height - safeAreaBottom
            );
          }
        }}
      >
        <InputComposer
          inputValue={inputText}
          onChangeText={setInputText}
          onSendPress={onSendPress}
          isSending={isSending}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const DEFAULT_INPUT_COMPOSER_HEIGHT = 68;

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
