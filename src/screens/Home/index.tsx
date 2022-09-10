import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Stories } from './Stories';

type Props = RootNavigationScreenProp<'BottomTab'>;

export const HomeScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ホーム🦄',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.storiesContainer}>
        <Stories />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storiesContainer: {
    marginTop: 20,
  },
});
