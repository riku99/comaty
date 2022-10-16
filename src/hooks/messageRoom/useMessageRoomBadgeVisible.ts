import { useMessageRoomListScreenDataQuery } from 'src/generated/graphql';
import { useMyId } from '../me/useMyId';

export const useMessageRoomBadgeVisible = () => {
  const { data } = useMessageRoomListScreenDataQuery();
  const myId = useMyId();
  const mySelfBadgeVisible = data?.me?.messageRoomsFromMySelf.some((room) => {
    return (
      !room.messages.edges[0]?.node.read &&
      room.messages.edges[0]?.node.sender.id !== myId
    );
  });
  const otherPartyBadgeVisible = data?.me?.messageRoomsFromOtherParty.some(
    (room) => {
      return (
        !room.messages.edges[0]?.node.read &&
        room.messages.edges[0]?.node.sender.id !== myId
      );
    }
  );

  return {
    mySelfBadgeVisible,
    otherPartyBadgeVisible,
  };
};
