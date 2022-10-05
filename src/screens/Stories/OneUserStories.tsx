import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Easing,
  runOnJS,
  SharedValue,
  withTiming,
} from 'react-native-reanimated';
import Video from 'react-native-video';
import { StoryContainer } from 'src/components/ui/StoryContainer';
import { StoryType, useOneUserStoriesQuery } from 'src/generated/graphql';
import { Indicator } from './Indicator';

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

  const [indicatorProgressValues, setIndicatorProgressValues] = useState<{
    [key: number]: SharedValue<number>;
  }>([]);

  if (!data?.user) {
    return null;
  }

  const storyCount = data.user.stories.length;
  const totalAmountOfSpace = (storyCount - 1) * INDICAOTR_SPACE;
  const oneIndicatorWidth =
    (screenWidth - PADDING_H * 2 - totalAmountOfSpace) / storyCount;

  const { stories } = data.user;
  const currentlyDisplayedStory = stories[currentlyDisplayedStoryIndex];

  const onProgressDone = (completed: boolean) => {
    if (completed && storyCount - 1 > currentlyDisplayedStoryIndex) {
      setCurrentlyDisplayedStoryIndex(currentlyDisplayedStoryIndex + 1);
    }
  };

  const onLoad = () => {
    indicatorProgressValues[currentlyDisplayedStoryIndex].value = withTiming(
      0,
      {
        duration: 4000,
        easing: Easing.linear,
      },
      (completed) => {
        runOnJS(onProgressDone)(completed);
      }
    );
  };

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
            onLoad={onLoad}
          />
        ) : (
          <Video
            source={{
              uri: currentlyDisplayedStory.url,
            }}
            style={styles.source}
            repeat
            resizeMode="contain"
            onLoad={onLoad}
          />
        )}

        <Pressable
          style={styles.halfPressable}
          onPress={() => {
            indicatorProgressValues[currentlyDisplayedStoryIndex].value =
              -oneIndicatorWidth;
            indicatorProgressValues[currentlyDisplayedStoryIndex].value =
              withTiming(0, {
                duration: 4000,
                easing: Easing.linear,
              });
          }}
        />

        <Pressable
          style={[
            styles.halfPressable,
            {
              right: 0,
            },
          ]}
        />
      </StoryContainer>

      <View style={styles.topContainer}>
        <View style={styles.indicatorContainer}>
          {data.user.stories.map((d, index) => (
            <Indicator
              index={index}
              width={oneIndicatorWidth}
              setProgressValue={(v) => {
                indicatorProgressValues[index] = v;
              }}
              key={index}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const PADDING_H = 4;
const INDICAOTR_SPACE = 2.5;

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
  topContainer: {
    position: 'absolute',
    top: 70,
    width: '100%',
    paddingHorizontal: PADDING_H,
    justifyContent: 'space-between',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfPressable: {
    position: 'absolute',
    height: '100%',
    width: '50%',
  },
});
