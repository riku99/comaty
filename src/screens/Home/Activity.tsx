import { FlatList, StyleSheet, View } from 'react-native';
import { Post } from 'src/components/domain/post/Post';
import { range } from 'src/utils';
import { Stories } from './Stories';

export const Activity = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={arr}
        renderItem={() => <Post />}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingTop: 16 }}
        ListHeaderComponent={() => <Stories />}
        ListHeaderComponentStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
      />
    </View>
  );
};

const arr = [...range(0, 20)];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
