import { LinearGradient } from 'expo-linear-gradient';
import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import {
  HomeStoriesFragment,
  ProfileImageFragment,
  ProfileImageFragmentDoc,
} from 'src/generated/graphql';

type Props = {
  storiesData: HomeStoriesFragment;
  infiniteLoadStories: () => Promise<void>;
};

type Item = HomeStoriesFragment['storyUsers']['edges'][number];

export const Stories = React.memo(
  ({ storiesData, infiniteLoadStories }: Props) => {
    const renderItem = useCallback(
      ({ item, index }: { item: Item; index: number }) => {
        return (
          <MotiView
            from={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              scale: {
                type: 'timing',
                duration: 600,
              },
            }}
            delay={(index % 15) * 150}
          >
            <LinearGradient
              colors={['#9089fa', '#b289fa', '#e389fa']}
              style={style.gradientContainer}
            >
              <View style={style.blankContainer}>
                <ProfileImage
                  imageData={filter<ProfileImageFragment>(
                    ProfileImageFragmentDoc,
                    item.node.firstProfileImage
                  )}
                  style={style.userImage}
                />
              </View>
            </LinearGradient>
          </MotiView>
        );
      },
      []
    );

    const renderItemSeparator = useCallback(() => {
      return (
        <View
          style={{
            width: 10,
          }}
        />
      );
    }, []);

    if (!storiesData) {
      return;
    }

    return (
      <InfiniteFlatList
        renderItem={renderItem}
        data={storiesData.storyUsers.edges}
        keyExtractor={(item) => item.node.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={style.storiesContent}
        infiniteLoad={infiniteLoadStories}
      />
    );
  }
);

const style = StyleSheet.create({
  storiesContent: {
    paddingHorizontal: 16,
  },
  gradientContainer: {
    width: 69,
    height: 69,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blankContainer: {
    width: 64,
    height: 64,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});
