import { useNavigation } from '@react-navigation/native';
import { filter } from 'graphql-anywhere';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import {
  MessageRoomListFromMySelfScreenDataDocument,
  MessageRoomListFromMySelfScreenDataQuery,
  RoomListItemInMessageRoomListScreenFragment,
  RoomListItemInMessageRoomListScreenFragmentDoc,
  useDeleteMessageRoomMutation,
  useMessageRoomListFromMySelfScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';
import { RoomListItem } from './RoomListItem';

type RoomItem =
  MessageRoomListFromMySelfScreenDataQuery['me']['messageRoomsFromMySelf'][number];

export const MessagesFromMySelf = React.memo(() => {
  const { data } = useMessageRoomListFromMySelfScreenDataQuery();
  const navigation = useNavigation<RootNavigationProp<'MessageRoomList'>>();
  const [longPressedItemId, setLongPressedItemId] = useState<number | null>(
    null
  );
  const [deleteMessageRoomMutation] = useDeleteMessageRoomMutation();
  const toast = useToast();

  const renderRoomItem = useCallback(
    ({ item }: { item: RoomItem }) => {
      const { id, partner } = item;

      const onPress = () => {
        navigation.navigate('MessageRoom', {
          roomId: id,
          userId: partner.id,
        });
      };

      const onLongPress = () => {
        setLongPressedItemId(id);
      };

      return (
        <RoomListItem
          fragmentData={filter<RoomListItemInMessageRoomListScreenFragment>(
            RoomListItemInMessageRoomListScreenFragmentDoc,
            item
          )}
          onPress={onPress}
          onLongPress={onLongPress}
        />
      );
    },
    [navigation, setLongPressedItemId]
  );

  const onDeletePress = () => {
    if (!longPressedItemId) {
      return;
    }

    Alert.alert('削除してよろしいですか？', '元に戻すことはできません', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '削除',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMessageRoomMutation({
              variables: {
                id: longPressedItemId,
              },
              onCompleted: () => {
                toast.show('削除しました');
              },
              refetchQueries: [
                {
                  query: MessageRoomListFromMySelfScreenDataDocument,
                },
              ],
            });
          } catch (e) {
            console.log(e);
          } finally {
            setLongPressedItemId(null);
          }
        },
      },
    ]);
  };

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

      <OverlayModal
        isVisible={!!longPressedItemId}
        onBackdropPress={() => {
          setLongPressedItemId(null);
        }}
        onCancel={() => {
          setLongPressedItemId(null);
        }}
        items={[
          { title: '削除', titleColor: theme.red, onPress: onDeletePress },
        ]}
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
