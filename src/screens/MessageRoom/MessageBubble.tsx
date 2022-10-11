import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { BubbleType } from './types';

type Props = {
  text: string;
  isMyMseeage: boolean;
  bubbleType: BubbleType;
};

export const MessageBubble = ({ text, isMyMseeage, bubbleType }: Props) => {
  return (
    <View style={styles.container}>
      {!isMyMseeage && (
        <View
          style={{
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
            borderRadius: IMAGE_SIZE,
            backgroundColor: 'pink',
            marginTop: 8,
          }}
        />
      )}

      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isMyMseeage ? '#6778FF' : '#ECECEC',
            marginLeft: isMyMseeage ? 0 : 4,
            borderRadius: 14,
            borderBottomRightRadius:
              bubbleType === 'topChunk' || bubbleType === 'middleChunk'
                ? 3
                : undefined,
            borderTopRightRadius:
              bubbleType === 'middleChunk' || bubbleType === 'bottomChunk'
                ? 3
                : undefined,
          },
        ]}
      >
        <Text
          style={{
            color: isMyMseeage ? '#fff' : undefined,
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

const IMAGE_SIZE = 30;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bubble: {
    padding: 10,
  },
});
