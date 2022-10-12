import { filter } from 'graphql-anywhere';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  MessageRoomListFromMySelfScreenDataQuery,
  RoomListItemInMessageRoomListScreenFragment,
  RoomListItemInMessageRoomListScreenFragmentDoc,
  useMessageRoomListFromMySelfScreenDataQuery,
} from 'src/generated/graphql';
import { RoomListItem } from './RoomListItem';

type RoomItem =
  MessageRoomListFromMySelfScreenDataQuery['me']['messageRoomsFromMySelf'][number];

export const MessagesFromMySelf = React.memo(() => {
  const { data } = useMessageRoomListFromMySelfScreenDataQuery();

  const renderRoomItem = useCallback(({ item }: { item: RoomItem }) => {
    return (
      <RoomListItem
        fragmentData={filter<RoomListItemInMessageRoomListScreenFragment>(
          RoomListItemInMessageRoomListScreenFragmentDoc,
          item
        )}
      />
    );
  }, []);

  if (!data?.me) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.me.messageRoomsFromMySelf}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 10,
            }}
          />
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
});
