import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import { ProfileImagesInUserProfileFragment } from 'src/generated/graphql';
import Constants from './constants';

type Props = {
  imageData: ProfileImagesInUserProfileFragment;
};

export const ProfileImages = React.memo(({ imageData }: Props) => {
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0);
  const animatedViewRef = useRef<Animatable.View>(null);
  const images = imageData.profileImages;

  const onLeftPress = () => {
    if (displayedImageIndex === 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setDisplayedImageIndex((currentIndex) => {
      if (currentIndex === 0) {
        animatedViewRef.current?.swing(600);
        return currentIndex;
      } else {
        return currentIndex - 1;
      }
    });
  };

  const onRightPress = () => {
    if (displayedImageIndex === images.length - 1) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setDisplayedImageIndex((currentIndex) => {
      if (currentIndex === images.length - 1) {
        animatedViewRef.current?.swing(600);
        return currentIndex;
      } else {
        return currentIndex + 1;
      }
    });
  };

  useEffect(function cacheImage() {
    const cacheData = images.map((i) => ({ uri: i.url }));
    FastImage.preload(cacheData);
  }, []);

  return (
    <Animatable.View ref={animatedViewRef as any}>
      <FastImage
        source={{
          uri: images[displayedImageIndex].url,
        }}
        style={styles.image}
      />
      <View style={styles.pressableContainer}>
        <Pressable style={styles.pressable} onPress={onLeftPress} />
        <Pressable style={styles.pressable} onPress={onRightPress} />
      </View>

      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          return (
            <View
              style={[
                styles.dot,
                {
                  marginLeft: index === 0 ? undefined : 6,
                  backgroundColor:
                    index === displayedImageIndex ? '#fff' : '#949494',
                  opacity: index === displayedImageIndex ? 1 : 0.8,
                },
              ]}
              key={index}
            />
          );
        })}
      </View>
    </Animatable.View>
  );
});

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Constants.imageHeight,
  },
  pressableContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
  },
  pressable: {
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
});
