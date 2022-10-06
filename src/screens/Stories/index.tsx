import { useCallback, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { OneUserStories } from './OneUserStories';

type Props = RootNavigationScreenProp<'Stories'>;

export const StoriesScreen = ({ navigation, route }: Props) => {
  const { storyUsers } = route.params;
  const [
    currentlyDisplayedUserStoryInViewport,
    setCurrentlyDisplayedStoryInViewport,
  ] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const renderOneUserStory = useCallback(
    ({ item, index }: { item: { userId: string }; index: number }) => {
      return (
        <OneUserStories
          userId={item.userId}
          index={index}
          currentlyDisplayedUserStoryInViewport={
            currentlyDisplayedUserStoryInViewport
          }
        />
      );
    },
    [currentlyDisplayedUserStoryInViewport]
  );

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y % screenHeight === 0) {
      const displayedIndex = e.nativeEvent.contentOffset.y / screenHeight;
      setCurrentlyDisplayedStoryInViewport(displayedIndex);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={storyUsers}
        renderItem={renderOneUserStory}
        keyExtractor={(item) => item.userId}
        snapToInterval={screenHeight}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => {
          return {
            length: screenHeight,
            offset: index,
            index,
          };
        }}
        decelerationRate="fast"
        onScroll={onScroll}
        initialScrollIndex={0}
        initialNumToRender={4}
      />
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
