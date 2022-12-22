import { useApolloClient } from '@apollo/client';
import {
  MessageRoomListScreenDataDocument,
  MessageRoomListScreenDataQuery,
  SendMessageMutation,
} from 'src/generated/graphql';

export type TargetRoomList =
  | 'keptMessageRooms'
  | 'messageRoomsFromOtherParty'
  | 'messageRoomsFromMySelf';

export const useUpdateRoomListQueryAfterSendingMessage = () => {
  const { cache } = useApolloClient();

  const updateRoomListQueryAfterSendingMessage = ({
    target,
    roomId,
    sendMessageData,
  }: {
    target: TargetRoomList;
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
      target
    ].find((room) => room.id === roomId);

    if (targetMessageRoom) {
      const filtered = cachedMessageRoomListScreenDataQuery.me[target].filter(
        (room) => room.id !== roomId
      );

      cache.writeQuery<MessageRoomListScreenDataQuery>({
        query: MessageRoomListScreenDataDocument,
        data: {
          ...cachedMessageRoomListScreenDataQuery,
          me: {
            ...cachedMessageRoomListScreenDataQuery.me,
            [target]: [
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
