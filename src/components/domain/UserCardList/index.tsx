import { MotiView } from 'moti';
import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { UserCard } from '../UserCard';

type Props = {
  onCardPress?: (id: number) => void;
};

export const UserCardList = ({ onCardPress }: Props) => {
  const renderUser = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 1500,
          }}
          delay={index * 150}
        >
          <UserCard
            containerStyle={{
              marginTop: index % 2 !== 0 ? 45 : 0,
            }}
            onPress={(id: number) => {
              if (onCardPress) {
                onCardPress(id);
              }
            }}
          />
        </MotiView>
      );
    },
    []
  );

  return (
    <FlatList
      data={u}
      renderItem={renderUser}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
      ListFooterComponent={() => <View style={{ height: 26 }} />}
    />
  );
};

const u = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: '8%',
    paddingTop: 20,
  },
});
