import { useNavigation } from '@react-navigation/native';
import { filter } from 'graphql-anywhere';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SkypeIndicator } from 'react-native-indicators';
import {
  Easing,
  runOnJS,
  SharedValue,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import { StoryContainer } from 'src/components/ui/StoryContainer';
import { ThreeDots } from 'src/components/ui/ThreeDots';
import {
  StoryType,
  StoryUserMetaDataFragment,
  StoryUserMetaDataFragmentDoc,
  useCreateStorySeenMutation,
  useOneUserStoriesQuery,
  ViewersInStoriesFragment,
  ViewersInStoriesFragmentDoc
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me';
import { theme } from 'src/styles';
import { Indicator } from './Indicator';
import { Modal } from './Modal';
import { StoryUserMetaData } from './StoryUserMetaData';
import { Viewers } from './Viewers';

type Props = {
  userId: string;
  index: number;
  currentlyDisplayedUserStoryInViewport: number;
  onDoneLastStory: () => void;
};

export const OneUserStories = ({
  userId,
  index,
  currentlyDisplayedUserStoryInViewport,
  onDoneLastStory,
}: Props) => {
  const navigation = useNavigation<RootNavigationProp<'Stories'>>();
  const [skipQuery, setSkipQuery] = useState(
    Math.abs(index - currentlyDisplayedUserStoryInViewport) > 2
  );

  const { data, loading } = useOneUserStoriesQuery({
    variables: {
      id: userId,
      seenCount: 3,
    },
    skip: skipQuery,
  });

  const myId = useMyId();

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
  const hasNextStory = storyCount
    ? storyCount - 1 > currentlyDisplayedStoryIndex
    : false;
  const totalAmountOfSpace = (storyCount - 1) * INDICAOTR_SPACE;
  const oneIndicatorWidth =
    (screenWidth - PADDING_H * 2 - totalAmountOfSpace) / storyCount;
  const resetNow = useRef(false);
  const [createSeenMutation] = useCreateStorySeenMutation();
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [videoPaused, setVideoPaused] = useState(
    !isUserStoriesVisibleInViewport
  );
  const [modalVisible, setModalVisible] = useState(false);
  // seek()の後にsetVideoPaused(true)を実行しても、内部的に後からseek()が実行されてビデオが再生されてしまう。なのでVideoのonSeekのタイミングでsetVidePaused(true)を実行する必要があるが、画面左をタップした場合など、seekしてもポーズせずに再生したい場合もある。
  // つまり、onSeekのタイミングでポーズさせたい場合、そうでない場合が存在する。それを表すフラグがpauseVideoOnSeek
  const pauseVideoOnSeek = useRef(false);

  useEffect(() => {
    if (!data?.user.stories.length && !loading) {
      navigation.goBack();
    }
  }, [data, loading]);

  useEffect(() => {
    // skip: が false -> true になると data も undfined になってしまうので、まだスキップ中のもののみ検証
    if (skipQuery) {
      setSkipQuery(Math.abs(index - currentlyDisplayedUserStoryInViewport) > 2);
    }
  }, [currentlyDisplayedUserStoryInViewport, index, skipQuery]);

  useEffect(() => {
    checkedVideoProgress.current = false;
  }, [currentlyDisplayedStoryIndex]);

  useEffect(() => {
    if (index === currentlyDisplayedUserStoryInViewport) {
      setVideoPaused(false);
    }
  }, [index, currentlyDisplayedUserStoryInViewport]);

  useEffect(() => {
    if (
      data?.user.stories.length &&
      Math.abs(index - currentlyDisplayedUserStoryInViewport) <= 1
    ) {
      const preloadUrls = data?.user.stories.map((s) => {
        const uri = s.type === StoryType.Photo ? s.url : s.thumbnailUrl;
        return { uri };
      });
      FastImage.preload(preloadUrls);
    }
  }, [data, index, currentlyDisplayedUserStoryInViewport]);

  // このOneUserStoriesがviewportから外れた時の初期化
  useEffect(() => {
    checkedVideoProgress.current = false;
    if (!isUserStoriesVisibleInViewport) {
      resetNow.current = true;
      pauseVideoOnSeek.current = true;
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

  useEffect(() => {
    if (isUserStoriesVisibleInViewport && resetNow.current) {
      resetNow.current = false;
    }
  }, [isUserStoriesVisibleInViewport]);

  useEffect(() => {
    (async () => {
      const currentlyDisplayedStory =
        data?.user.stories[currentlyDisplayedStoryIndex];
      if (
        data?.user.id !== myId &&
        currentlyDisplayedStory &&
        index === currentlyDisplayedUserStoryInViewport
      ) {
        try {
          await createSeenMutation({
            variables: {
              storyId: currentlyDisplayedStory.id,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [
    data,
    currentlyDisplayedStoryIndex,
    createSeenMutation,
    currentlyDisplayedUserStoryInViewport,
    index,
  ]);

  useEffect(() => {
    if (!videoPaused) {
      pauseVideoOnSeek.current = false;
    }
  }, [videoPaused]);

  if (!data?.user?.stories.length) {
    return (
      <View style={styles.loading}>
        <SkypeIndicator color={theme.primary} />
      </View>
    );
  }

  const { stories } = data.user;
  const currentlyDisplayedStory = stories[currentlyDisplayedStoryIndex];

  const onProgressDone = (completed: boolean) => {
    if (hasNextStory) {
      if (completed) {
        setCurrentlyDisplayedStoryIndex(currentlyDisplayedStoryIndex + 1);
      }
    } else {
      if (
        !resetNow.current &&
        // 画面左を押して実行された場合はonDoneLastStoryを実行したくない。画面左をプレスした場合はvalueが -oneIndicatorWidth に近い値になる。それ以外の場合のみ実行できるようにしている。
        indicatorProgressValues[currentlyDisplayedStoryIndex].value > -10
      ) {
        onDoneLastStory();
      }
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

    if (hasNextStory) {
      setCurrentlyDisplayedStoryIndex(currentlyDisplayedStoryIndex + 1);
    } else {
    }
  };

  const stopProgress = () => {
    indicatorProgressValues[currentlyDisplayedStoryIndex].value =
      -oneIndicatorWidth;
    pauseVideoOnSeek.current = true;
    videoRef.current?.seek(0);
  };

  const onDodtsPress = () => {
    setModalVisible(true);
    stopProgress();
  };

  const restartProgress = () => {
    setVideoPaused(false);
    startProgress();
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
          <View>
            <Video
              ref={videoRef}
              source={{
                uri: currentlyDisplayedStory.url,
              }}
              style={[
                styles.source,
                {
                  position: 'absolute',
                  zIndex: 10,
                },
              ]}
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
              paused={videoPaused}
              onSeek={(d) => {
                if (pauseVideoOnSeek.current && d.seekTime === 0) {
                  setVideoPaused(true);
                }
              }}
            />

            {/* サムネ */}
            <FastImage
              source={{ uri: currentlyDisplayedStory.thumbnailUrl }}
              style={styles.source}
            />
          </View>
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

        <View style={styles.storyUser}>
          <StoryUserMetaData
            userData={filter<StoryUserMetaDataFragment>(
              StoryUserMetaDataFragmentDoc,
              data.user
            )}
          />
        </View>
      </View>

      <View
        style={[
          styles.bottomContainer,
          {
            bottom: safeAreaBottom,
          },
        ]}
      >
        <View>
          <Viewers
            viewersData={filter<ViewersInStoriesFragment>(
              ViewersInStoriesFragmentDoc,
              currentlyDisplayedStory
            )}
          />
        </View>

        <ThreeDots dotsColor={'#fff'} dotsSize={24} onPress={onDodtsPress} />
      </View>

      <Modal
        isVisible={modalVisible}
        hideMenu={() => {
          setModalVisible(false);
          restartProgress();
        }}
        storyUserId={data.user.id}
        storyId={currentlyDisplayedStory.id}
      />
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
  storyUser: {
    marginTop: 12,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    width: '100%',
    alignItems: 'center',
  },
  loading: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
