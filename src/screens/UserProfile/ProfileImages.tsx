import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import Constants from './constants';

const images = [
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/293107001_379282744308541_336357492818778809_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=Oi4afT6F6EMAX96HzIw&tn=IvOg5e0MTmVxXJmw&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkxODc3NzEzNzI5MzA4Ng%3D%3D.2-ccb7-5&oh=00_AT9ZzujcbKeuTXpr54ZsRljcMH25r4Db0cPuJuDMFHXT3Q&oe=62D3E40E&_nc_sid=30a2ef',
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/290787661_529436488863147_5504700110263478063_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=DIUYalWwwzsAX_Hzx63&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3MjgyNjU0MDkzMTA1MTc1Mw%3D%3D.2-ccb7-5&oh=00_AT86fdcm_cJez9HgP6sPQ5Nr87sZrkR9FU7MWDX2pYvc0w&oe=62D4FCCE&_nc_sid=30a2ef',
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/290816850_163786096161836_4312726373631542972_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=gwoi28hthxAAX9KGOD9&tn=IvOg5e0MTmVxXJmw&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3MjY2NTY5MTUyMzcyMzczMw%3D%3D.2-ccb7-5&oh=00_AT9g4YZ43Xwv-XI9RXEh6MxyRgiwTFRNCvaVf3ZOUa92yg&oe=62D5E170&_nc_sid=30a2ef',
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/290260389_1177477956159797_5117381780820387780_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=3uMohzPQfaoAX-9awm-&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg2ODk3MDQ3NTU2NjYzNzY2MA%3D%3D.2-ccb7-5&oh=00_AT81YkhnY5BP_RkmkOHzJy8dFe1tAYlSRAj4NHAzxPa7Iw&oe=62D5BA41&_nc_sid=30a2ef',
  'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/289659287_340489644934058_6144378696331016904_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=102&_nc_ohc=jhY7FciF-msAX84X4PP&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg2Njk2MTQ5OTkyNDgxMDE4Nw%3D%3D.2-ccb7-5&oh=00_AT-dQqeydpV2xYe3W5jQ_61WlQQSuo_TJZpTd50KBcx9Qw&oe=62D559FE&_nc_sid=30a2ef',
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
