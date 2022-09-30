import { Text } from '@rneui/themed';
import { Pressable, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import Modal from 'react-native-modal';

export type ModalItem = {
  title: string;
  titleColor?: string;
  onPress: () => void | Promise<void>;
};

type Props = {
  isVisible: boolean;
  items: ModalItem[];
  onCancel: () => void;
  onBackdropPress: () => void;
};

export const OverlayModal = ({
  isVisible,
  items,
  onBackdropPress,
  onCancel,
}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.4}
      style={styles.modal}
      onBackdropPress={onBackdropPress}
    >
      <View style={styles.itemContainer}>
        <>
          {items.map((item, index) => (
            <Pressable
              style={[
                styles.item,
                {
                  marginTop: index !== 0 ? 12 : 0,
                },
              ]}
              key={index}
              onPress={item.onPress}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color: item.titleColor ?? '#4D4D4D',
                  },
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
          <Pressable style={[styles.item, styles.cancel]} onPress={onCancel}>
            <Text style={[styles.itemText]}>キャンセル</Text>
          </Pressable>
        </>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
  },
  itemContainer: {
    paddingBottom: 30,
  },
  item: {
    backgroundColor: '#fff',
    width: '98%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4D4D4D',
  },
  cancel: {
    marginTop: 12,
  },
});
