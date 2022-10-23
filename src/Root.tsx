import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import Config from 'react-native-config';
import Geocoder from 'react-native-geocoding';
import { ContentsCreationButtonGroup } from 'src/components/ui/ContentsCreationButtonGroup';
import { LoadingOverlay } from 'src/components/ui/LoadingOverlay';
import {
  useGetInitialDataQuery,
  useUpdatePositionMutation
} from 'src/generated/graphql';
import { useLoadingOverlayVisible } from 'src/hooks/app/useLoadingOverlayVisible';
import { useNarrowingDownConditions } from 'src/hooks/app/useNarrowingDownConditions';
import { useContentsCreationVisible } from 'src/hooks/appVisible';
import { useLoggedIn } from 'src/hooks/auth';
import { RootStack } from 'src/navigations/RootStack';
import { mmkvStorageKeys, storage } from 'src/storage/mmkv';

export const Root = () => {
  const { loadingVisible } = useLoadingOverlayVisible();
  const { data: initialData } = useGetInitialDataQuery();
  const { setLoggedIn, loggedIn } = useLoggedIn();
  const { contentsCreationModalVisible, setContentsCreationModalVisible } =
    useContentsCreationVisible();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['24%'], []);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [updatePositionMutation] = useUpdatePositionMutation();
  const { setNarrowingDownConditions } = useNarrowingDownConditions();

  useEffect(() => {
    if (initialData?.me) {
      setLoggedIn(true);
    }
  }, [initialData, setLoggedIn]);

  useEffect(() => {
    if (!contentsCreationModalVisible) {
      bottomSheetRef.current?.close();
    }
  }, [contentsCreationModalVisible]);

  // 後に消す
  useEffect(() => {
    Geocoder.init(Config.GOOGLE_GEOCOODING_API_KEY);
  }, []);

  // useEffect(() => {
  //   let onLocation: Subscription;

  //   if (loggedIn) {
  //     onLocation = BackgroundGeolocation.onLocation(async (location) => {
  //       const { latitude, longitude } = location.coords;

  //       await updatePositionMutation({
  //         variables: {
  //           input: {
  //             latitude,
  //             longitude,
  //           },
  //         },
  //         onCompleted: () => {
  //           console.log('🚩 Update position with ' + latitude, +longitude);
  //         },
  //       });
  //     });

  //     BackgroundGeolocation.ready({
  //       desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  //       distanceFilter: 500,
  //       stopTimeout: 1,
  //       debug: true,
  //       stopOnTerminate: false,
  //       startOnBoot: true,
  //       disableLocationAuthorizationAlert: true,
  //       logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
  //     }).then(async () => {
  //       try {
  //         const status = await BackgroundGeolocation.requestPermission();
  //         if (status === BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS) {
  //           setLocationEnabled(true);
  //         } else {
  //           setLocationEnabled(false);
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     });
  //   }

  //   return () => {
  //     if (onLocation) {
  //       onLocation.remove();
  //     }
  //   };
  // }, [loggedIn]);

  // useEffect(() => {
  //   if (locationEnabled) {
  //     console.log('background location start');
  //     BackgroundGeolocation.start();
  //   } else {
  //     console.log('background location stop');
  //     BackgroundGeolocation.stop();
  //   }
  // }, [locationEnabled]);

  useEffect(() => {
    if (loggedIn) {
      const conditions = storage.getString(
        mmkvStorageKeys.narrowingDownConditions
      );
      if (conditions) {
        setNarrowingDownConditions(JSON.parse(conditions));
      }
    }
  }, [loggedIn, setNarrowingDownConditions]);


  return (
    <>
      <RootStack />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={contentsCreationModalVisible ? 0 : -1}
        onClose={() => {
          setContentsCreationModalVisible(false);
        }}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        handleIndicatorStyle={styles.bottomSheetIndicator}
      >
        <View style={styles.bottomSheetContentContainer}>
          <View style={styles.bottomSheetButtonGroups}>
            <ContentsCreationButtonGroup />
          </View>
        </View>
      </BottomSheet>
      {loadingVisible && <LoadingOverlay />}
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheetIndicator: {
    backgroundColor: '#dedede',
  },
  bottomSheetContentContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetButtonGroups: {
    width: '80%',
  },
});
