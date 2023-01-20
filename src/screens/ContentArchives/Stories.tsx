import { useCallback } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Loading } from 'src/components/ui/Loading';
import {
  StoryArchiveDataQuery,
  StoryType,
  useStoryArchiveDataQuery,
} from 'src/generated/graphql';

type StoryItem = StoryArchiveDataQuery['me']['stories'][number];

export const Stories = () => {
  const { data, loading } = useStoryArchiveDataQuery({
    fetchPolicy: 'network-only',
  });

  const renderStoryItem = useCallback(
    ({ item, index }: { item: StoryItem; index: number }) => {
      const isMiddleItem = (index + 2) % 3 === 0;
      const imageUri =
        item.type === StoryType.Photo ? item.url : item.thumbnailUrl;

      if (!imageUri) {
        return null;
      }

      return (
        <Pressable
          style={[
            {
              marginTop: index > 2 ? 1 : 0,
              marginHorizontal: isMiddleItem ? 1 : 0,
            },
          ]}
        >
          <FastImage
            source={{ uri: imageUri }}
            style={{
              width: screenWidth / 3 - 0.333,
              aspectRatio: 9 / 16,
            }}
          />
        </Pressable>
      );
    },
    []
  );

  if (loading) {
    return <Loading />;
  }

  if (!data?.me) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.me.stories}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
};

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
