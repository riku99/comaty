import { ModalItem, OverlayModal } from 'src/components/ui/OverlayModal';
import { useMyId } from 'src/hooks/me';
import { theme } from 'src/styles';

type Props = {
  isVisible: boolean;
  hideMenu: () => void;
  storyUserId: string;
};

export const Modal = ({ isVisible, hideMenu, storyUserId }: Props) => {
  const myId = useMyId();

  const items: ModalItem[] =
    myId === storyUserId
      ? [{ title: '削除', titleColor: theme.red, onPress: () => {} }]
      : [{ title: '報告', onPress: () => {} }];

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
