import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import Constants from './constants';

const images = [
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/298361927_152418067398881_2160437032496243760_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=oAYpeFN2dP4AX9kpoYp&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkwMjkxMzI5MzYyOTEwNzkzMg%3D%3D.2-ccb7-5&oh=00_AT8QrBjqzfj398zdc0w311nrI6CMwSnNZdH-5ql5WZMUVA&oe=632150EC&_nc_sid=30a2ef',
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/296069619_2535774126553970_7047664076396636005_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=2B5q7x1IVU8AX-7GcSt&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5Mzc4MjU5Mjg1MzYzMjE0MQ%3D%3D.2-ccb7-5&oh=00_AT9uvaFLNua57m3Z6f9Zom8H6rZ1AusatN6B_B__iGz06A&oe=63214151&_nc_sid=30a2ef',
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/295579138_1437018596712210_3271403501565747749_n.jpg?stp=dst-jpg_e35_p750x750_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=SJmfKriSxeYAX_X5R-O&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5MTQxMTAwNDA2NjI3OTI5NQ%3D%3D.2-ccb7-5&oh=00_AT_W_BIIvj94fi3JWnzJ1RtKDGYyDnUfBDhnQW0SWFeEOA&oe=63219129&_nc_sid=30a2efhttps://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/295579138_1437018596712210_3271403501565747749_n.jpg?stp=dst-jpg_e35_p750x750_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=106&_nc_ohc=SJmfKriSxeYAX_X5R-O&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg5MTQxMTAwNDA2NjI3OTI5NQ%3D%3D.2-ccb7-5&oh=00_AT_W_BIIvj94fi3JWnzJ1RtKDGYyDnUfBDhnQW0SWFeEOA&oe=63219129&_nc_sid=30a2ef',
];

export const ProfileImages = React.memo(() => {
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0);
  const animatedViewRef = useRef<Animatable.View>(null);

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
    const cacheData = images.map((i) => ({ uri: i }));
    FastImage.preload(cacheData);
  }, []);

  return (
    <Animatable.View ref={animatedViewRef as any}>
      <FastImage
        source={{
          uri: images[displayedImageIndex],
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
