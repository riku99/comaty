import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef } from 'react';
import {
  AppState,
  AppStateStatus,
  NativeEventSubscription,
  StyleSheet,
} from 'react-native';
import { View } from 'react-native-animatable';
import Geolocation from 'react-native-geolocation-service';
import { ContentsCreationButtonGroup } from 'src/components/ui/ContentsCreationButtonGroup';
import { LoadingOverlay } from 'src/components/ui/LoadingOverlay';
import {
  useGetInitialDataQuery,
  useUpdatePositionMutation,
} from 'src/generated/graphql';
import { useLoadingOverlayVisible } from 'src/hooks/app/useLoadingOverlayVisible';
import { useNarrowingDownConditions } from 'src/hooks/app/useNarrowingDownConditions';
import { useContentsCreationVisible } from 'src/hooks/appVisible';
import { useLoggedIn } from 'src/hooks/auth';
import { useGeolocationPermitted } from 'src/hooks/geolocation/useGeolocationPermitted';
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
  const [updatePositionMutation] = useUpdatePositionMutation();
  const { setNarrowingDownConditions } = useNarrowingDownConditions();
  const { setGeolocationPermitted } = useGeolocationPermitted();

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
  // useEffect(() => {
  //   Geocoder.init(Config.GOOGLE_GEOCOODING_API_KEY);
  // }, []);

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

  useEffect(() => {
    let subscription: NativeEventSubscription;

    if (loggedIn) {
      const onChange = async (nextState: AppStateStatus) => {
        if (nextState === 'active') {
          const currentPermission = await Geolocation.requestAuthorization(
            'whenInUse'
          );
          if (
            currentPermission === 'granted' ||
            currentPermission === 'restricted'
          ) {
            setGeolocationPermitted(true);
            Geolocation.getCurrentPosition(
              async (position) => {
                try {
                  await updatePositionMutation({
                    variables: {
                      input: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      },
                    },
                    onCompleted: (d) => {
                      console.log(
                        '🚩 Updated position ' +
                          position.coords.latitude +
                          ' ' +
                          position.coords.longitude
                      );
                    },
                  });
                } catch (e) {
                  console.log(e);
                }
              },
              (error) => {}
            );
          } else {
            setGeolocationPermitted(false);
          }
        }
      };

      subscription = AppState.addEventListener('change', onChange);
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [loggedIn]);

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
