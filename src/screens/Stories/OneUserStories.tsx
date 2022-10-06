import { useEffect, useRef, useState } from 'react';
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
  index: number;
  currentlyDisplayedUserStoryInViewport: number;
};

export const OneUserStories = ({
  userId,
  index,
  currentlyDisplayedUserStoryInViewport,
}: Props) => {
  const { data } = useOneUserStoriesQuery({
    variables: {
      id: userId,
    },
  });

  const isUserStoriesVisibleInViewport =
    index === currentlyDisplayedUserStoryInViewport;
  const [currentlyDisplayedStoryIndex, setCurrentlyDisplayedStoryIndex] =
    useState(0);
  const [indicatorProgressValues, setIndicatorProgressValues] = useState<{
    [key: number]: SharedValue<number>;
  }>({});
  const [videoDuration, setVideoDuration] = useState(0);
  const checkedVideoProgress = useRef(false);
  const videoRef = useRef<Video>(null);
  const storyCount = data?.user.stories.length;
  const totalAmountOfSpace = (storyCount - 1) * INDICAOTR_SPACE;
  const oneIndicatorWidth =
    (screenWidth - PADDING_H * 2 - totalAmountOfSpace) / storyCount;

  useEffect(() => {
    checkedVideoProgress.current = false;
  }, [currentlyDisplayedStoryIndex]);

  // このOneUserStoriesがviewportから外れた時の初期化
  useEffect(() => {
    checkedVideoProgress.current = false;
    if (!isUserStoriesVisibleInViewport) {
      videoRef.current?.seek(0);
      setCurrentlyDisplayedStoryIndex(0);
      Object.keys(indicatorProgressValues).forEach((key) => {
        indicatorProgressValues[Number(key)].value = -oneIndicatorWidth;
      });
    }
  }, [
    isUserStoriesVisibleInViewport,
    indicatorProgressValues,
    oneIndicatorWidth,
  ]);

  if (!data?.user) {
    return null;
  }

  const { stories } = data.user;
  const currentlyDisplayedStory = stories[currentlyDisplayedStoryIndex];

  const onProgressDone = (completed: boolean) => {
    const hasNextStory =
      completed && storyCount - 1 > currentlyDisplayedStoryIndex;
    if (hasNextStory) {
      setCurrentlyDisplayedStoryIndex(currentlyDisplayedStoryIndex + 1);
    }
  };

  const startProgress = () => {
    indicatorProgressValues[currentlyDisplayedStoryIndex].value = withTiming(
      0,
      {
        duration:
          currentlyDisplayedStory.type === StoryType.Photo
            ? PHOTO_DURATION
            : videoDuration,
        easing: Easing.linear,
      },
      (completed) => {
        runOnJS(onProgressDone)(completed);
      }
    );
  };

  const resetProgress = () => {
    indicatorProgressValues[currentlyDisplayedStoryIndex].value =
      -oneIndicatorWidth;
    videoRef.current?.seek(0);
  };

  const onLeftPress = () => {
    resetProgress();

    const isEarlyTimingPress =
      -indicatorProgressValues[currentlyDisplayedStoryIndex].value >
      oneIndicatorWidth - oneIndicatorWidth / 5;

    if (isEarlyTimingPress) {
      if (currentlyDisplayedStoryIndex !== 0) {
        indicatorProgressValues[currentlyDisplayedStoryIndex - 1].value =
          -oneIndicatorWidth;
        setCurrentlyDisplayedStoryIndex(currentlyDisplayedStoryIndex - 1);
      } else {
        startProgress();
      }
    } else {
      startProgress();
    }
  };

  const onRightPress = () => {
    indicatorProgressValues[currentlyDisplayedStoryIndex].value = 0;

    const hasNextStory = storyCount - 1 > currentlyDisplayedStoryIndex;
    if (hasNextStory) {
      setCurrentlyDisplayedStoryIndex(currentlyDisplayedStoryIndex + 1);
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <StoryContainer
        backgroundColors={currentlyDisplayedStory.backgroundColors}
      >
        {currentlyDisplayedStory.type === StoryType.Photo ? (
          <FastImage
            key={currentlyDisplayedUserStoryInViewport}
            source={{
              uri: currentlyDisplayedStory.url,
            }}
            style={styles.source}
            resizeMode="contain"
            onLoad={() => {
              if (isUserStoriesVisibleInViewport) {
                startProgress();
              }
            }}
          />
        ) : (
          <Video
            ref={videoRef}
            source={{
              uri: currentlyDisplayedStory.url,
            }}
            style={styles.source}
            resizeMode="contain"
            onLoad={(e) => {
              setVideoDuration(e.duration * 1000);
            }}
            onProgress={() => {
              if (
                isUserStoriesVisibleInViewport &&
                !checkedVideoProgress.current
              ) {
                checkedVideoProgress.current = true;
                startProgress();
              }
            }}
            paused={!isUserStoriesVisibleInViewport}
          />
        )}

        <Pressable style={styles.halfPressable} onPress={onLeftPress} />

        <Pressable
          onPress={onRightPress}
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
          {data.user.stories.map((d, _index) => (
            <Indicator
              width={oneIndicatorWidth}
              setProgressValue={(v) => {
                setIndicatorProgressValues((currentValues) => {
                  const newValues = { ...currentValues };
                  newValues[_index] = v;
                  return newValues;
                });
              }}
              key={_index}
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
const PHOTO_DURATION = 4000;

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
