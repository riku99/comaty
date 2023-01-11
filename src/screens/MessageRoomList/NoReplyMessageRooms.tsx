import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import * as Haptics from 'expo-haptics';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import {
  NoReplyMessageRoomListScreenDataDocument,
  NoReplyMessageRoomListScreenDataQuery,
  useDeleteMessageRoomMutation,
  useNoReplyMessageRoomListScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';
import { deleteRoomWithAlert, useSortedRoomListWithPin } from './helpers';
import { RoomListItem } from './RoomListItem';

type RoomItem =
  NoReplyMessageRoomListScreenDataQuery['me']['noReplyMessageRooms'][number];

export const NoReplyMessageRooms = () => {
  const { data } = useNoReplyMessageRoomListScreenDataQuery();
  const navigation = useNavigation<RootNavigationProp<'MessageRoomList'>>();
  const [longPressedItemId, setLongPressedItemId] = useState<number | null>(
    null
  );
  const toast = useToast();
  const [deleteMessageRoomMutation] = useDeleteMessageRoomMutation();
  const {
    sortedRoomList,
    setPinnedIdsWithStorage,
    isPinned,
    deletePinnedIdWithStorage,
    pinnedIds,
  } = useSortedRoomListWithPin({
    data,
    target: 'noReplyMessageRooms',
  });

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

      const pinned = isPinned(item.id);

      return (
        <RoomListItem
          fragmentData={item}
          onPress={onPress}
          onLongPress={onLongPress}
          pinned={pinned}
        />
      );
    },
    [navigation, setLongPressedItemId, pinnedIds]
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
              query: NoReplyMessageRoomListScreenDataDocument,
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

  const onPinPress = async () => {
    if (!longPressedItemId) {
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLongPressedItemId(null);
    setPinnedIdsWithStorage(longPressedItemId);
  };

  const onUnpinPress = () => {
    if (!longPressedItemId) {
      return;
    }

    deletePinnedIdWithStorage(longPressedItemId);
    setLongPressedItemId(null);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  if (!data?.me) {
    return null;
  }

  const onProfileListButtonPress = () => {
    const ids = sortedRoomList.map((item) => item.partner.id);
    navigation.navigate('MessageUserProfileList', {
      ids,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedRoomList}
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
          {
            title: isPinned(longPressedItemId) ? 'ピン解除' : 'ピン留め',
            onPress: isPinned(longPressedItemId) ? onUnpinPress : onPinPress,
          },
          { title: '削除', titleColor: theme.red, onPress: onDeletePress },
        ]}
      />

      {!!sortedRoomList?.length && (
        <Button
          title="プロフィール一覧"
          containerStyle={styles.profileButtonContainer}
          titleStyle={styles.profileButtonTitle}
          buttonStyle={styles.profileButton}
          onPress={onProfileListButtonPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 4,
    paddingBottom: 16,
  },
  profileButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  profileButtonTitle: {
    color: theme.primary,
  },
  profileButton: {
    backgroundColor: '#fff',
    borderColor: theme.primary,
    borderWidth: 2,
  },
});
