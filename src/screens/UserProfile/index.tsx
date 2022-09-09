import BottomSheet from '@gorhom/bottom-sheet';
import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from 'src/components/ui/BackButton';
import { BottomButtonGroup } from './BottomButtonGroup';
import { BottomSheetContent } from './BottomSheetContent';
import Constants from './constants';
import { ProfileImages } from './ProfileImages';

type Props = RootNavigationScreenProp<'UserProfile'>;

export const UserProfileScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [Constants.snapPoint1, '90%'], []);

  return (
    <View style={styles.container}>
      <ProfileImages />

      <BackButton containerStyle={styles.backButtonContainer} />

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetContent />
      </BottomSheet>

      <View
        style={[
          styles.buttonButtomGroupContainer,
          {
            bottom: safeAreaBottom + 4,
          },
        ]}
      >
        <BottomButtonGroup />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonButtomGroupContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
});
