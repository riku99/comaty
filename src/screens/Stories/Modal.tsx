import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { ModalItem, OverlayModal } from 'src/components/ui/OverlayModal';
import {
  AfterDeletingStoryDocument,
  OneUserStoriesDocument,
  useDeleteStoryMutation,
  useReportStoryMutation,
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me';
import { theme } from 'src/styles';

type Props = {
  isVisible: boolean;
  hideMenu: () => void;
  storyUserId: string;
  storyId: number;
};

export const Modal = ({ isVisible, hideMenu, storyUserId, storyId }: Props) => {
  const navigation = useNavigation<RootNavigationProp<'Stories'>>();
  const myId = useMyId();
  const [deleteStoryMutation] = useDeleteStoryMutation();
  const [reportStoryMutation] = useReportStoryMutation();
  const toast = useToast();

  const deleteStory = async () => {
    Alert.alert('削除してよろしいですか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '削除',
        style: 'destructive',
        onPress: async () => {
          try {
            navigation.goBack();

            await deleteStoryMutation({
              variables: {
                id: storyId,
              },
              refetchQueries: [
                {
                  query: OneUserStoriesDocument,
                  variables: {
                    id: storyUserId,
                    seenCount: 3,
                  },
                },
                {
                  query: AfterDeletingStoryDocument,
                },
              ],
              onCompleted: () => {
                toast.show('削除しました', { type: 'success' });
              },
            });
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  };

  const onReportPress = () => {
    Alert.alert(
      '不適切な投稿として報告してよろしいですか？',
      '報告したことは相手ユーザーに知らされません',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '報告',
          style: 'destructive',
          onPress: async () => {
            try {
              await reportStoryMutation({
                variables: {
                  id: storyId,
                },
                onCompleted: () => {
                  toast.show('報告しました');
                  hideMenu();
                },
              });
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
  };

  const items: ModalItem[] =
    myId === storyUserId
      ? [{ title: '削除', titleColor: theme.red, onPress: deleteStory }]
      : [{ title: '報告', onPress: onReportPress }];

  return (
    <OverlayModal
      isVisible={isVisible}
      onCancel={() => {
        hideMenu();
      }}
      onBackdropPress={() => {
        hideMenu();
      }}
      items={items}
    />
  );
};
