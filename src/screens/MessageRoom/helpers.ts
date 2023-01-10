import { useApolloClient } from '@apollo/client';
import {
  MessageRoomListScreenDataDocument,
  MessageRoomListScreenDataQuery,
  SendMessageMutation,
} from 'src/generated/graphql';

export const useUpdateRoomListQueryAfterSendingMessage = () => {
  const { cache } = useApolloClient();

  const updateRoomListQueryAfterSendingMessage = ({
    roomId,
    sendMessageData,
  }: {
    roomId: number;
    sendMessageData: SendMessageMutation['createMessage'];
  }) => {
    const cachedMessageRoomListScreenDataQuery =
      cache.readQuery<MessageRoomListScreenDataQuery>({
        query: MessageRoomListScreenDataDocument,
      });

    if (!cachedMessageRoomListScreenDataQuery) {
      return;
    }

    const targetMessageRoom = cachedMessageRoomListScreenDataQuery.me[
      'exchangingMessageRooms'
    ].find((room) => room.id === roomId);

    if (targetMessageRoom) {
      const filtered = cachedMessageRoomListScreenDataQuery.me[
        'exchangingMessageRooms'
      ].filter((room) => room.id !== roomId);

      cache.writeQuery<MessageRoomListScreenDataQuery>({
        query: MessageRoomListScreenDataDocument,
        data: {
          ...cachedMessageRoomListScreenDataQuery,
          me: {
            ...cachedMessageRoomListScreenDataQuery.me,
            exchangingMessageRooms: [
              {
                ...targetMessageRoom,
                lastMessage: {
                  ...targetMessageRoom.lastMessage,
                  ...sendMessageData,
                },
              },
              ...filtered,
            ],
          },
        },
      });
    }
  };

  return {
    updateRoomListQueryAfterSendingMessage,
  };
};
