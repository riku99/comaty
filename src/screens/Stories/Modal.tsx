import { ModalItem, OverlayModal } from 'src/components/ui/OverlayModal';

type Props = {
  isVisible: boolean;
  hideMenu: () => void;
};

export const Modal = ({ isVisible, hideMenu }: Props) => {
  const items: ModalItem[] = [{ title: '報告', onPress: () => {} }];

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
