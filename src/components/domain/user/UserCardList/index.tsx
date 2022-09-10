import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import {
  UserCardFragment,
  UserCardFragmentDoc,
  UserCardListFragment,
} from 'src/generated/graphql';
import { UserCard } from '../UserCard';

type Props = {
  onCardPress?: (id: string) => void;
  userListData: UserCardListFragment;
  infiniteLoad?: () => Promise<void>;
  takeItemCount: number;
};

type Item = UserCardListFragment['edges'][number];

export const UserCardList = ({
  onCardPress,
  userListData,
  infiniteLoad,
  takeItemCount,
}: Props) => {
  const renderUser = useCallback(
    ({ item, index }: { item: Item; index: number }) => {
      return (
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: {
              type: 'timing',
              duration: 1200,
            },
            scale: {
              type: 'timing',
              duration: 500,
            },
          }}
          delay={(index % takeItemCount) * CARD_DELAY}
        >
          <UserCard
            containerStyle={{
              marginTop: index % 2 !== 0 ? 45 : 0,
            }}
            onPress={(id: string) => {
              if (onCardPress) {
                onCardPress(id);
              }
            }}
            userCardData={filter<UserCardFragment>(
              UserCardFragmentDoc,
              item.node
            )}
          />
        </MotiView>
      );
    },
    [onCardPress, takeItemCount]
  );

  return (
    <InfiniteFlatList<Item>
      data={userListData.edges}
      renderItem={renderUser}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      contentContainerStyle={styles.contentContainer}
      ItemSeparatorComponent={() => <View style={{ height: 26 }} />}
      infiniteLoad={infiniteLoad}
    />
  );
};

const CARD_DELAY = 170;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: '8%',
    paddingTop: 20,
    paddingBottom: 26,
  },
});
