import { useCallback, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { UserProfileItem } from './UserProfileItem';

type Props = RootNavigationScreenProp<'MessageUserProfileList'>;

export const MessageUserProfileListScreen = ({ route }: Props) => {
  const { ids } = route.params;

  const [displayedItemIndexInViewport, setDisplayedItemIndexInViewport] =
    useState(0);

  const renderUserProfile = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <UserProfileItem
          id={item}
          itemIndex={index}
          displayedItemIndexInViewport={displayedItemIndexInViewport}
        />
      );
    },
    [displayedItemIndexInViewport]
  );

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (nativeEvent.contentOffset.y % screenHeight === 0) {
      const displayedItemIndex = nativeEvent.contentOffset.y / screenHeight;
      setDisplayedItemIndexInViewport(displayedItemIndex);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ids}
        renderItem={renderUserProfile}
        keyExtractor={(item) => item}
        getItemLayout={(_, index) => {
          return {
            length: screenHeight,
            offset: index * screenHeight,
            index,
          };
        }}
        snapToInterval={screenHeight}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        onScroll={onScroll}
      />
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
