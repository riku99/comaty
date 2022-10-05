import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';
import { StoryContainer } from 'src/components/ui/StoryContainer';
import { StoryType, useOneUserStoriesQuery } from 'src/generated/graphql';

type Props = {
  userId: string;
};

export const OneUserStories = ({ userId }: Props) => {
  const { data } = useOneUserStoriesQuery({
    variables: {
      id: userId,
    },
  });

  const [currentlyDisplayedStoryIndex, setCurrentlyDisplayedStoryIndex] =
    useState(0);

  if (!data?.user) {
    return null;
  }

  const { stories } = data.user;
  const currentlyDisplayedStory = stories[currentlyDisplayedStoryIndex];

  return (
    <View style={styles.container}>
      <StoryContainer
        backgroundColors={currentlyDisplayedStory.backgroundColors}
      >
        {currentlyDisplayedStory.type === StoryType.Photo ? (
          <FastImage
            source={{
              uri: currentlyDisplayedStory.url,
            }}
            style={styles.source}
            resizeMode="contain"
          />
        ) : (
          <Video
            source={{
              uri: currentlyDisplayedStory.url,
            }}
            style={styles.source}
            repeat
            resizeMode="contain"
            onLoad={() => {}}
          />
        )}
      </StoryContainer>

      {/* <View
        style={{
          position: 'absolute',
          top: 70,
          width: '100%',
        }}
      >
        <IndicatorAndMetaData count={2} currentIndex={0} duration={4000} />
      </View> */}
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: screenHeight,
  },
  source: {
    width: '100%',
    height: '100%',
  },
});
