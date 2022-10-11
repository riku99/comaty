import { Text } from '@rneui/themed';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { range } from 'src/utils';

const l = [...range(0, 20)];

const AnimatedFlastList = Animated.createAnimatedComponent<any>(FlatList);

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
        />

        <Animated.View
          style={[
            {
              backgroundColor: 'pink',
              height: 60,
              position: 'absolute',
              width: '100%',
            },
            composerStyle,
          ]}
        >
          <TextInput
            style={{
              height: 30,
              width: '100%',
              backgroundColor: 'red',
            }}
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
