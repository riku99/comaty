import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { range } from 'src/utils';
import { InputComposer } from './InputComposer';
import { MessageBubble } from './MessageBubble';
import { BubbleType } from './types';

const l = [...range(0, 22)].reverse();
const ms = l.map((m, i) => {
  return {
    id: i,
    text: 'Hello message' + m,
    userId: (m > 10 && m !== 20) || m === 21 ? 0 : 1,
    createdAt: new Date('2022-10-11T12:13:03'),
  };
});

const myId = 0;

export const MessageRoomScreen = () => {
  const [messages, setMessages] = useState([]);
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const composerBottom = useSharedValue(safeAreaBottom);
  const composerStyle = useAnimatedStyle(() => {
    return {
      bottom: composerBottom.value,
    };
  });

  const listHeaderHeight = useSharedValue(60 + keyboardHeight);
  const listHeaderStyle = useAnimatedStyle(() => {
    return {
      height: listHeaderHeight.value,
    };
  });

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardWillShow', (e) => {
      composerBottom.value = withTiming(e.endCoordinates.height, {
        duration: e.duration,
      });

      listHeaderHeight.value = withTiming(
        e.endCoordinates.height + 60 - safeAreaBottom,
        {
          duration: e.duration,
        }
      );

      setKeyboardHeight(e.endCoordinates.height);
    });

    return () => {
      subscription.remove();
    };
  }, [safeAreaBottom]);

  const renderMessageItem = useCallback(
    ({ item, index }: { item: typeof ms[number]; index: number }) => {
      const isMyMessage = item.userId === myId;

      const previousData = ms[index - 1];
      const latorData = ms[index + 1];

      let bubbleType: BubbleType = 'notChunk';

      if (item.userId === myId) {
        if (previousData?.userId === myId && latorData?.userId === myId) {
          bubbleType = 'middleChunk';
        } else if (latorData?.userId === myId) {
          bubbleType = 'bottomChunk';
        } else if (previousData?.userId === myId) {
          bubbleType = 'topChunk';
        }
      } else {
        if (
          previousData &&
          previousData?.userId !== myId &&
          latorData &&
          latorData?.userId !== myId
        ) {
          bubbleType = 'middleChunk';
        } else if (latorData && latorData?.userId !== myId) {
          bubbleType = 'bottomChunk';
        } else if (previousData && previousData?.userId !== myId) {
          bubbleType = 'topChunk';
        }
      }

      // if (index === 19) {
      //   console.log('item');
      //   console.log(item);
      //   console.log('previous');
      //   console.log(previousData);
      //   console.log('lator');
      //   console.log(latorData);
      //   console.log(bubbleType);
      // }

      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
            marginTop: 2,
          }}
        >
          <MessageBubble
            isMyMseeage={isMyMessage}
            text={item.text}
            bubbleType={bubbleType}
          />
        </View>
      );
    },
    []
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView>
        <FlatList
          renderItem={renderMessageItem}
          data={ms}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="always"
          ListHeaderComponent={() => (
            <Animated.View style={[listHeaderStyle]} />
          )}
          inverted
          contentContainerStyle={{
            paddingHorizontal: 8,
          }}
        />

        <Animated.View style={[styles.inputContainer, composerStyle]}>
          <InputComposer />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    width: '100%',
  },
});
