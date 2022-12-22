import { filter } from 'graphql-anywhere';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
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
import { MESSAGE_REPLY_LIMIT_TIME } from 'src/constants';
import {
  AgeVerificationStatus,
  CreateMessageError,
  GetMessageRoomError,
  InputComposerDataInMessageRoomScreenFragment,
  InputComposerDataInMessageRoomScreenFragmentDoc,
  MessageBubbleDataInMessageRoomFragment,
  MessageBubbleDataInMessageRoomFragmentDoc,
  MessageRoomListScreenDataDocument,
  MessageRoomScreenDataDocument,
  MessageRoomScreenDataQuery,
  RoomMessagesInMessageRoomScreenDocument,
  useAcceptKeepingRequestMutation,
  useKeepRequestMutation,
  useMessageRoomScreenDataQuery,
  useReadMessageMutation,
  useSendMessageMutation,
} from 'src/generated/graphql';
import { useCustomLazyQuery } from 'src/hooks/apollo/useCustomLazyQuery';
import { useMyId } from 'src/hooks/me';
import { getGraphQLError } from 'src/utils';
import { HeaderLeft } from './HeaderLeft';
import {
  TargetRoomList,
  useUpdateRoomListQueryAfterSendingMessage,
} from './helpers';
import { InputComposer } from './InputComposer';
import { MessageBubble } from './MessageBubble';
import { BubbleType } from './types';

type Props = RootNavigationScreenProp<'MessageRoom'>;

type MessageItem =
  MessageRoomScreenDataQuery['messageRoom']['messages']['edges'][number];

export const MessageRoomScreen = ({ navigation, route }: Props) => {
  const { userId, roomId } = route.params;
  const myId = useMyId();
  const messageRoomListLazyQuery = useCustomLazyQuery(
    MessageRoomListScreenDataDocument
  );

  const { data, fetchMore } = useMessageRoomScreenDataQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      id: roomId,
    },
    onError: (e) => {
      const glError = getGraphQLError(e, 0);
      if (glError?.code === GetMessageRoomError.NotFound) {
        Alert.alert('トークルームが見つかりません', '', [
          {
            text: 'OK',
            onPress: async () => {
              navigation.goBack();
              try {
                await messageRoomListLazyQuery();
              } catch (e) {
                console.log(e);
              }
            },
          },
        ]);
      }
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
  const [readMessageMutation] = useReadMessageMutation();
  const [keepRequestMutation] = useKeepRequestMutation();
  const [acceptKeepingRequestMutation] = useAcceptKeepingRequestMutation();
  const { updateRoomListQueryAfterSendingMessage } =
    useUpdateRoomListQueryAfterSendingMessage();

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

  // 年齢確認が完了しているかどうかチェック
  useEffect(() => {
    if (!data?.me) {
      return;
    }

    if (data.me.ageVerificationStatus === AgeVerificationStatus.UnderReview) {
      navigation.navigate('AgeVerificationUnderReview');
      return;
    }

    if (data.me.ageVerificationStatus !== AgeVerificationStatus.Completed) {
      navigation.navigate('AgeVerificationRequest');
      return;
    }
  }, [data]);

  useEffect(() => {
    if (data?.messageRoom.messages) {
      setMessages(data?.messageRoom.messages.edges);
    }
  }, [data?.messageRoom.messages, setMessages]);

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
  }, [safeAreaBottom, composerBottom, listHeaderHeight]);

  useEffect(() => {
    (async () => {
      const ms = data?.messageRoom.messages;
      if (ms?.edges.length) {
        const lastMessage = ms.edges[0].node;
        if (lastMessage.sender.id !== myId) {
          await readMessageMutation({
            variables: {
              messageId: lastMessage.id,
            },
          });
        }
      }
    })();
  }, [data?.messageRoom.messages, myId, readMessageMutation]);

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
    [messages, myId]
  );

  const onSendPress = async () => {
    if (data.me.ageVerificationStatus === AgeVerificationStatus.UnderReview) {
      navigation.navigate('AgeVerificationUnderReview');
      return;
    }

    if (data.me.ageVerificationStatus !== AgeVerificationStatus.Completed) {
      navigation.navigate('AgeVerificationRequest');
      return;
    }

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
              variables: {
                id: roomId,
              },
              data: {
                ...cachedMessageRoomScreenDataQuery,
                messageRoom: {
                  ...cachedMessageRoomScreenDataQuery.messageRoom,
                  messages: {
                    ...cachedMessageRoomScreenDataQuery.messageRoom.messages,
                    edges: newEdges,
                  },
                },
              },
            });

            const target: TargetRoomList = data?.messageRoom.kept
              ? 'keptMessageRooms'
              : data?.messageRoom.sender.id === myId
              ? 'messageRoomsFromMySelf'
              : 'messageRoomsFromOtherParty';

            updateRoomListQueryAfterSendingMessage({
              target,
              roomId,
              sendMessageData: responseData.createMessage,
            });
          }
        },
        refetchQueries: [
          // {
          //   query: MessageRoomListScreenDataDocument,
          // },
        ],
      });
    } catch (e) {
      const glError = getGraphQLError(e, 0);
      if (glError.code === CreateMessageError.NotFoundMessageRoom) {
        Alert.alert('トークルームが見つかりません', '', [
          {
            text: 'OK',
            onPress: async () => {
              navigation.goBack();
              try {
                await messageRoomListLazyQuery();
              } catch (e) {
                console.log(e);
              }
            },
          },
        ]);
      } else {
        console.log(e);
        toast.show('送信に失敗しました');
      }
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

  const onKeepRequestPress = () => {
    Alert.alert(
      'キープリクエストしますか？',
      `キープリクエストが承認された場合、${MESSAGE_REPLY_LIMIT_TIME}分の返信制限時間がなくなります。`,
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: 'リクエスト',
          onPress: async () => {
            try {
              await keepRequestMutation({
                variables: {
                  messageRoomId: roomId,
                },
              });
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
  };

  const onAcceptRequestPress = () => {
    if (!data.messageRoom.keepingRequest) {
      return;
    }

    Alert.alert(
      'リクエストを承認しますか？',
      `キープリクエストが承認された場合、${MESSAGE_REPLY_LIMIT_TIME}分の返信制限時間がなくなります。`,
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '承認',
          onPress: async () => {
            try {
              await acceptKeepingRequestMutation({
                variables: {
                  id: data.messageRoom.keepingRequest.id,
                },
                refetchQueries: [
                  {
                    query: MessageRoomListScreenDataDocument,
                  },
                ],
              });
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
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
          onKeepRequestPress={onKeepRequestPress}
          fragmentData={filter<InputComposerDataInMessageRoomScreenFragment>(
            InputComposerDataInMessageRoomScreenFragmentDoc,
            data.messageRoom
          )}
          onAcceptRequestPress={onAcceptRequestPress}
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
