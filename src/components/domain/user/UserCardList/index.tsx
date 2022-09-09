import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  UserCardFragment,
  UserCardFragmentDoc,
  UserCardListFragment,
} from 'src/generated/graphql';
import { UserCard } from '../UserCard';

type Props = {
  onCardPress?: (id: number) => void;
  fragment: UserCardListFragment;
};

type Item = UserCardListFragment['edges'][number];

export const UserCardList = ({ onCardPress, fragment }: Props) => {
  const renderUser = useCallback(
    ({ item, index }: { item: Item; index: number }) => {
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
            fragment={filter<UserCardFragment>(UserCardFragmentDoc, item.node)}
          />
        </MotiView>
      );
    },
    []
  );

  return (
    <FlatList
      data={fragment.edges}
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

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: '8%',
    paddingTop: 20,
  },
});
