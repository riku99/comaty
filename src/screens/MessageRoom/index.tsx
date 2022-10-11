import { Text } from '@rneui/themed';
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

const l = [...range(0, 20)];

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

  const renderMessageItem = useCallback(({ item }: { item: number }) => {
    return (
      <View
        style={{
          height: 40,
          backgroundColor: 'gray',
        }}
      >
        <Text>{item}</Text>
      </View>
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView>
        <FlatList
          renderItem={renderMessageItem}
          data={l}
          keyExtractor={(item) => item.toString()}
          keyboardShouldPersistTaps="always"
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
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
