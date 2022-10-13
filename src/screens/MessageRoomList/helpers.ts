import { Alert } from 'react-native';

export const deleteRoomWithAlert = (onDeletePress: () => Promise<void>) => {
  Alert.alert('削除してよろしいですか？', '元に戻すことはできません', [
    {
      text: 'キャンセル',
      style: 'cancel',
    },
    {
      text: '削除',
      style: 'destructive',
      onPress: onDeletePress,
    },
  ]);
};
