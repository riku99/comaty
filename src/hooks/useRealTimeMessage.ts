import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import {
  useExchangingMessageRoomListScreenDataQuery,
  useMessageRoomScreenDataQuery,
  useMyIdQuery,
} from 'src/generated/graphql';

export const useRealTimeMessage = () => {
  const { data } = useMyIdQuery({ fetchPolicy: 'cache-only' });
  const myId = data?.me.id;
  const [snapshotMessageRoomId, setSnapshptMessageRoomId] = useState<
    number | null
  >(null);
  const [
    refetchExchangingMessageRoomList,
    setRefetchExchangingMessageRoomList,
  ] = useState(false);

  useExchangingMessageRoomListScreenDataQuery({
    skip: !refetchExchangingMessageRoomList,
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      setRefetchExchangingMessageRoomList(false);
    },
  });

  useMessageRoomScreenDataQuery({
    skip: !snapshotMessageRoomId,
    variables: {
      id: snapshotMessageRoomId,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      setSnapshptMessageRoomId(null);
    },
  });

  // firestoreでのメッセージのリアルタイム通信
  useEffect(() => {
    let unsubscribe: () => void;

    if (myId) {
      unsubscribe = firestore()
        .collection('Messages')
        .where('recipientId', '==', myId)
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot((querySnapshot) => {
          if (querySnapshot && querySnapshot.docs.length) {
            const doc =
              querySnapshot.docs[querySnapshot.docs.length - 1].data();

            if (typeof doc.messageRoomId === 'number') {
              setSnapshptMessageRoomId(doc.messageRoomId);
              setRefetchExchangingMessageRoomList(true);
            }
          }
        });
    }

    return () => {
      if (unsubscribe) {
        console.log('unsubscribe firestore snapshot');
        unsubscribe();
      }
    };
  }, [myId]);
};
