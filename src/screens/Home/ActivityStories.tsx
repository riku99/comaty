import { LinearGradient } from 'expo-linear-gradient';
import { filter } from 'graphql-anywhere';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import {
  ActivityStoriesFragment,
  ProfileImageFragment,
  ProfileImageFragmentDoc,
} from 'src/generated/graphql';

type Props = {
  storiesData: ActivityStoriesFragment;
};

type Item = ActivityStoriesFragment['stories']['edges'][number];

export const Stories = React.memo(({ storiesData }: Props) => {
  const renderItem = useCallback(({ item }: { item: Item }) => {
    return (
      <View>
        <LinearGradient
          colors={['#9089fa', '#b289fa', '#e389fa']}
          style={style.gradientContainer}
        >
          <View style={style.blankContainer}>
            <ProfileImage
              imageData={filter<ProfileImageFragment>(
                ProfileImageFragmentDoc,
                item.node.user.firstProfileImage
              )}
              style={style.userImage}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }, []);

  const renderItemSeparator = useCallback(() => {
    return (
      <View
        style={{
          width: 10,
        }}
      />
    );
  }, []);

  return (
    <View>
      <FlatList
        renderItem={renderItem}
        data={storiesData.stories.edges}
        keyExtractor={(d, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={renderItemSeparator}
        contentContainerStyle={style.storiesContent}
      />
    </View>
  );
});

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
