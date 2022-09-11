import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  StyleSheet,
} from 'react-native';

type Props<T> = {
  infiniteLoad?: () => Promise<void>;
} & FlatListProps<T>;

export const InfiniteFlatList = <T extends {}>({
  infiniteLoad,
  ...flatListProps
}: Props<T>) => {
  const { ListFooterComponent, ...restProps } = flatListProps;
  const infiniteLoadIsReady = useRef(true);
  const [showInfiniteLoadingIndicator, setShowInfiniteLoadingIndicator] =
    useState(false);

  const onEndReached = async () => {
    if (!infiniteLoad) {
      return;
    }

    if (infiniteLoadIsReady.current) {
      try {
        infiniteLoadIsReady.current = false;
        setShowInfiniteLoadingIndicator(true);
        await infiniteLoad();
      } catch {
      } finally {
        setTimeout(() => {
          setShowInfiniteLoadingIndicator(false);
        }, 200);
      }
    }
  };

  const onMomentumScrollBegin = () => {
    if (!infiniteLoad) {
      return;
    }

    infiniteLoadIsReady.current = true;
  };

  return (
    <FlatList
      onEndReached={onEndReached}
      onMomentumScrollBegin={onMomentumScrollBegin}
      ListFooterComponent={
        showInfiniteLoadingIndicator
          ? () => <ActivityIndicator />
          : ListFooterComponent
      }
      ListFooterComponentStyle={[
        styles.footer,
        {
          marginTop: restProps.horizontal ? 0 : 10,
          marginLeft: restProps.horizontal ? 10 : 0,
        },
      ]}
      {...restProps}
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
