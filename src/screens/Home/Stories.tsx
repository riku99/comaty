import { useNavigation } from '@react-navigation/native';
import { filter } from 'graphql-anywhere';
import { MotiView } from 'moti';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { StoryUserCircle } from 'src/components/domain/user/StoryUserCircle';
import { InfiniteFlatList } from 'src/components/ui/InfiniteFlatList';
import {
  HomeStoriesFragment,
  StoryType,
  StoryUserCircleFragment,
  StoryUserCircleFragmentDoc,
} from 'src/generated/graphql';
import { useCreatingStory } from 'src/hooks/app';

type Props = {
  storiesData: HomeStoriesFragment;
  infiniteLoadStories: () => Promise<void>;
};

type Item = HomeStoriesFragment['storyUsers']['edges'][number];

export const Stories = React.memo(
  ({ storiesData, infiniteLoadStories }: Props) => {
    const { creatingStory } = useCreatingStory();
    const navigation = useNavigation<RootNavigationProp<'HomeMain'>>();

    // 全てのストーリーを閲覧されたユーザーは、ストーリーの表示一覧には表示させないのでフィルターをかけている
    const storyUsers = storiesData.storyUsers.edges
      .filter((edge) => edge.node.stories.some((s) => !s.seen))
      .map((e) => ({
        userId: e.node.id,
      }));

    useEffect(() => {
      const preloadData = storiesData.storyUsers.edges.map((d) => {
        const firstStory = d.node.stories[0];
        const uri =
          firstStory.type === StoryType.Photo
            ? firstStory.url
            : firstStory.thumbnailUrl;
        return {
          uri,
        };
      });

      const myPreloadData = storiesData.me.stories.map((d) => {
        const uri = d.type === StoryType.Photo ? d.url : d.thumbnailUrl;
        return {
          uri,
        };
      });

      FastImage.preload([...preloadData, ...myPreloadData]);
    }, [storiesData.me.stories, storiesData.storyUsers.edges]);

    const renderItem = useCallback(
      ({ item, index }: { item: Item; index: number }) => {
        const onPress = () => {
          const notSeenStory = item.node.stories.some((story) => !story.seen);

          if (notSeenStory) {
            const i = storyUsers.findIndex((s) => s.userId === item.node.id);
            navigation.navigate('Stories', {
              storyUsers,
              startingIndex: i,
            });
          } else {
            navigation.navigate('Stories', {
              storyUsers: [
                {
                  userId: item.node.id,
                },
              ],
              startingIndex: 0,
            });
          }
        };

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
            <StoryUserCircle
              imageSize={IMAGE_SIZE}
              storyUserData={filter<StoryUserCircleFragment>(
                StoryUserCircleFragmentDoc,
                item.node
              )}
              onPress={onPress}
            />
          </MotiView>
        );
      },
      [storyUsers, navigation]
    );

    const renderItemSeparator = useCallback(() => {
      return (
        <View
          style={{
            width: SEPALATOR_SIZE,
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
        contentContainerStyle={styles.storiesContent}
        infiniteLoad={infiniteLoadStories}
        ListHeaderComponent={
          <>
            {(!!storiesData.me.stories.length || creatingStory) && (
              <View style={styles.header}>
                <MotiView
                  from={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    scale: {
                      type: 'timing',
                      duration: 600,
                    },
                  }}
                >
                  <StoryUserCircle
                    imageSize={IMAGE_SIZE}
                    storyUserData={filter<StoryUserCircleFragment>(
                      StoryUserCircleFragmentDoc,
                      storiesData.me
                    )}
                    creatingStory={creatingStory}
                    onPress={() => {
                      navigation.navigate('Stories', {
                        storyUsers: [{ userId: storiesData.me.id }],
                        startingIndex: 0,
                      });
                    }}
                  />
                </MotiView>
              </View>
            )}
          </>
        }
      />
    );
  }
);

const SEPALATOR_SIZE = 10;
const IMAGE_SIZE = 59;

const styles = StyleSheet.create({
  storiesContent: {
    paddingHorizontal: 16,
  },
  header: {
    marginRight: SEPALATOR_SIZE,
  },
});
