import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BottomSheetContent } from './BottomSheetContent';

type Props = RootNavigationScreenProp<'UserProfile'>;

export const UserProfileScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => [snapPoint1, '84%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: 'https://scontent-nrt1-1.cdninstagram.com/v/t51.2885-15/293107001_379282744308541_336357492818778809_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=scontent-nrt1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=Oi4afT6F6EMAX96HzIw&tn=IvOg5e0MTmVxXJmw&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg3OTkxODc3NzEzNzI5MzA4Ng%3D%3D.2-ccb7-5&oh=00_AT9ZzujcbKeuTXpr54ZsRljcMH25r4Db0cPuJuDMFHXT3Q&oe=62D3E40E&_nc_sid=30a2ef',
        }}
        style={{
          width: '100%',
          height: imageHeight,
        }}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetContent />
      </BottomSheet>
      {/* <View
        style={{
          backgroundColor: 'red',
          width: '100%',
          height: '100%',
          borderRadius: 28,
          transform: [{ translateY: -22 }],
        }}
      ></View> */}
    </View>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const imageHeight = (screenWidth / 3) * 4; // 3:4
const snapPoint1 = screenHeight - imageHeight + 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
