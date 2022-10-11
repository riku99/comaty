import { Text } from '@rneui/themed';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { MessageBubbleDataInMessageRoomFragment } from 'src/generated/graphql';
import { BubbleType } from './types';

type Props = {
  isMyMseeage: boolean;
  bubbleType: BubbleType;
  fragmentData: MessageBubbleDataInMessageRoomFragment;
};

export const MessageBubble = ({
  isMyMseeage,
  bubbleType,
  fragmentData,
}: Props) => {
  const { sender, text } = fragmentData;

  const getBorderRadiusStyle = (): ViewStyle => {
    let borderBottomRightRadius = undefined;
    let borderTopRightRadius = undefined;
    let borderTopLeftRadius = undefined;
    let borderBottomLeftRadius = undefined;

    if (isMyMseeage) {
      borderBottomRightRadius =
        bubbleType === 'topChunk' || bubbleType === 'middleChunk'
          ? 3
          : undefined;
      borderTopRightRadius =
        bubbleType === 'middleChunk' || bubbleType === 'bottomChunk'
          ? 3
          : undefined;
    } else {
      borderTopLeftRadius =
        bubbleType === 'bottomChunk' || bubbleType === 'middleChunk'
          ? 3
          : undefined;
      borderBottomLeftRadius =
        bubbleType === 'middleChunk' || bubbleType === 'topChunk'
          ? 3
          : undefined;
    }

    return {
      borderRadius: 14,
      borderBottomRightRadius,
      borderTopRightRadius,
      borderTopLeftRadius,
      borderBottomLeftRadius,
    };
  };

  const showUserImage =
    !isMyMseeage && (bubbleType === 'bottomChunk' || bubbleType === 'notChunk');

  return (
    <View style={styles.container}>
      {showUserImage && (
        <ProfileImage
          imageData={sender.firstProfileImage}
          style={{
            height: IMAGE_SIZE,
            width: IMAGE_SIZE,
            borderRadius: IMAGE_SIZE,
            marginTop: 8,
          }}
        />
      )}

      <View
        style={[
          styles.bubble,
          getBorderRadiusStyle(),
          {
            backgroundColor: isMyMseeage ? '#6778FF' : '#ECECEC',
            marginLeft: isMyMseeage ? 0 : showUserImage ? 4 : IMAGE_SIZE + 4,
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
