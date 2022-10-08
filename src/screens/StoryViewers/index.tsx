import { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Loading } from 'src/components/ui/Loading';
import { useStoryViewersScreenDataQuery } from 'src/generated/graphql';

type Props = RootNavigationScreenProp<'StoryViewers'>;

export const StoryViewersScreen = ({ navigation, route }: Props) => {
  const { storyId } = route.params;

  const { data } = useStoryViewersScreenDataQuery({
    variables: {
      storyId,
    },
    fetchPolicy: 'cache-and-network',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '閲覧したユーザー',
    });
  }, [navigation]);

  const renderUserItem = useCallback(() => {}, []);

  if (!data?.story) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'pink',
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            borderRadius: IMAGE_SIZE,
          }}
        />

        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: 4,
          }}
        >
          Riku
        </Text>
      </View>
    </View>
  );
};

const IMAGE_SIZE = 42;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
