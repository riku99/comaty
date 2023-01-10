import { useMessageRoomListScreenDataQuery } from 'src/generated/graphql';
import { useMyId } from '../me/useMyId';

export const useMessageRoomBadgeVisible = () => {
  const { data } = useMessageRoomListScreenDataQuery();
  const myId = useMyId();
  const exchangingMessageRoomsBadge = data?.me?.exchangingMessageRooms.some(
    (room) => {
      return !room.lastMessage?.read && room.lastMessage?.sender.id !== myId;
    }
  );
  const noReplyMessageRoomsbadge = data?.me?.noReplyMessageRooms.some(
    (room) => {
      return !room.lastMessage?.read && room.lastMessage?.sender.id !== myId;
    }
  );

  return {
    exchangingMessageRoomsBadge,
    noReplyMessageRoomsbadge,
  };
};
