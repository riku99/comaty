import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { MotiView } from 'moti';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
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
  const navigation = useNavigation<RootNavigationProp<'MessageRoom'>>();

  const getBorderRadiusStyle = (): ViewStyle => {
    let borderBottomRightRadius = undefined;
    let borderTopRightRadius = undefined;
    let borderTopLeftRadius = undefined;
    let borderBottomLeftRadius = undefined;

    if (isMyMseeage) {
      borderBottomRightRadius =
        bubbleType === 'topChunk' || bubbleType === 'middleChunk'
          ? BUBBLE_BORDER_RADIUS
          : undefined;
      borderTopRightRadius =
        bubbleType === 'middleChunk' || bubbleType === 'bottomChunk'
          ? BUBBLE_BORDER_RADIUS
          : undefined;
    } else {
      borderTopLeftRadius =
        bubbleType === 'bottomChunk' || bubbleType === 'middleChunk'
          ? BUBBLE_BORDER_RADIUS
          : undefined;
      borderBottomLeftRadius =
        bubbleType === 'middleChunk' || bubbleType === 'topChunk'
          ? BUBBLE_BORDER_RADIUS
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
    <MotiView style={styles.container}>
      {showUserImage && (
        <Pressable
          onPress={() => {
            navigation.navigate('UserProfile', {
              id: sender.id,
            });
          }}
        >
          <ProfileImage
            imageData={sender.firstProfileImage}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
              borderRadius: IMAGE_SIZE,
              marginTop: 8,
            }}
          />
        </Pressable>
      )}

      <View
        style={[
          styles.bubble,
          getBorderRadiusStyle(),
          {
            backgroundColor: isMyMseeage ? '#6778FF' : '#ECECEC',
            marginLeft: isMyMseeage
              ? 0
              : showUserImage
              ? BUBBLE_MARGIN_LEFT
              : IMAGE_SIZE + BUBBLE_MARGIN_LEFT,
          },
        ]}
      >
        <Text
          style={{
            color: isMyMseeage ? '#fff' : undefined,
            fontSize: 16,
          }}
        >
          {text}
        </Text>
      </View>
    </MotiView>
  );
};

const IMAGE_SIZE = 30;
const BUBBLE_BORDER_RADIUS = 3;
const BUBBLE_MARGIN_LEFT = 4;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bubble: {
    padding: 10,
  },
});
