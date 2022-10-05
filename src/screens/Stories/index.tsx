import { useCallback, useLayoutEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { OneUserStories } from './OneUserStories';

type Props = RootNavigationScreenProp<'Stories'>;

export const StoriesScreen = ({ navigation, route }: Props) => {
  const { storyUsers } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const renderOneUserStory = useCallback(
    ({ item }: { item: { userId: string } }) => {
      return <OneUserStories userId={item.userId} />;
    },
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={storyUsers}
        renderItem={renderOneUserStory}
        keyExtractor={(item) => item.userId}
        snapToInterval={screenHeight}
        getItemLayout={(_, index) => {
          return {
            length: screenHeight,
            offset: index,
            index,
          };
        }}
        decelerationRate="fast"
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={1}
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
