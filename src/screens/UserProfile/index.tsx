import BottomSheet from '@gorhom/bottom-sheet';
import { filter } from 'graphql-anywhere';
import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackButton } from 'src/components/ui/BackButton';
import { Loading } from 'src/components/ui/Loading';
import {
  BottomButtonGroupInUserProfileFragment,
  BottomButtonGroupInUserProfileFragmentDoc,
  BottomSheetContentInUserProfileFragment,
  BottomSheetContentInUserProfileFragmentDoc,
  ProfileImagesInUserProfileFragment,
  ProfileImagesInUserProfileFragmentDoc,
  useUserProfileScreenDataQuery,
} from 'src/generated/graphql';
import { BottomButtonGroup } from './BottomButtonGroup';
import { BottomSheetContent } from './BottomSheetContent';
import Constants from './constants';
import { ProfileImages } from './ProfileImages';

type Props = RootNavigationScreenProp<'UserProfile'>;

export const UserProfileScreen = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const { data } = useUserProfileScreenDataQuery({
    variables: {
      id,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [Constants.snapPoint1, '90%'], []);

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ProfileImages
        imageData={filter<ProfileImagesInUserProfileFragment>(
          ProfileImagesInUserProfileFragmentDoc,
          data.user
        )}
      />

      <BackButton containerStyle={styles.backButtonContainer} />

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetContent
          data={filter<BottomSheetContentInUserProfileFragment>(
            BottomSheetContentInUserProfileFragmentDoc,
            data.user
          )}
        />
      </BottomSheet>

      <View
        style={[
          styles.buttonButtomGroupContainer,
          {
            bottom: safeAreaBottom + 4,
          },
        ]}
      >
        <BottomButtonGroup
          data={filter<BottomButtonGroupInUserProfileFragment>(
            BottomButtonGroupInUserProfileFragmentDoc,
            data.user
          )}
        />
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
    width: '100%',
    alignItems: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 16,
  },
});
