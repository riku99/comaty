import { useMessageRoomListScreenDataQuery } from 'src/generated/graphql';
import { useMyId } from '../me/useMyId';

export const useMessageRoomBadgeVisible = () => {
  const { data } = useMessageRoomListScreenDataQuery();
  const myId = useMyId();
  const mySelfBadgeVisible = data?.me?.exchangingMessageRooms.some((room) => {
    return !room.lastMessage?.read && room.lastMessage?.sender.id !== myId;
  });
  const otherPartyBadgeVisible = data?.me?.noReplyMessageRooms.some((room) => {
    return !room.lastMessage?.read && room.lastMessage?.sender.id !== myId;
  });
  const keptBadgeVisible = data?.me?.noReplyMessageRooms.some((room) => {
    return !room.lastMessage?.read && room.lastMessage?.sender.id !== myId;
  });

  return {
    mySelfBadgeVisible,
    otherPartyBadgeVisible,
    keptBadgeVisible,
  };
};
