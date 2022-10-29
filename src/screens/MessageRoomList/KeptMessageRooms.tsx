import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import {
  KeptMessageRoomListScreenDataDocument,
  KeptMessageRoomListScreenDataQuery,
  useDeleteMessageRoomMutation,
  useKeptMessageRoomListScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';
import { deleteRoomWithAlert } from './helpers';
import { RoomListItem } from './RoomListItem';

type RoomItem =
  KeptMessageRoomListScreenDataQuery['me']['keptMessageRooms'][number];

export const KeptMessageRooms = React.memo(() => {
  const { data } = useKeptMessageRoomListScreenDataQuery();
  const navigation = useNavigation<RootNavigationProp<'MessageRoomList'>>();
  const [longPressedItemId, setLongPressedItemId] = useState<number | null>(
    null
  );
  const toast = useToast();
  const [deleteMessageRoomMutation] = useDeleteMessageRoomMutation();

  const sortedList = useMemo(() => {
    if (!data?.me) {
      return [];
    }

    const c = [...data.me.keptMessageRooms];

    c.sort((a, b) => {
      const ad = new Date(Number(a.updatedAt));
      const bd = new Date(Number(b.updatedAt));
      if (ad > bd) {
        return -1;
      } else if (bd > ad) {
        return 1;
      } else {
        return 0;
      }
    });

    return c;
  }, [data]);

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
          fragmentData={item}
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

    deleteRoomWithAlert(async () => {
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
              query: KeptMessageRoomListScreenDataDocument,
            },
          ],
        });
      } catch (e) {
        console.log(e);
      } finally {
        setLongPressedItemId(null);
      }
    });
  };

  if (!data?.me) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedList}
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
    paddingTop: 4,
  },
});
