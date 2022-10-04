import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { OneUserStory } from './OneUserStory';

type Props = RootNavigationScreenProp<'Stories'>;

export const StoriesScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <OneUserStory />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
