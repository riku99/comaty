import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { LoadingOverlay } from 'src/components/ui/LoadingOverlay';
import { useGetInitialDataQuery } from 'src/generated/graphql';
import { useContentsCreationVisible } from 'src/hooks/appVisible';
import { useLoggedIn } from 'src/hooks/auth';
import { useLoadingVisible } from 'src/hooks/loadingOverlay';
import { RootStack } from 'src/navigations/RootStack';

export const Root = () => {
  const { loadingVisible } = useLoadingVisible();
  const { data: initialData } = useGetInitialDataQuery();
  const { setLoggedIn } = useLoggedIn();
  const { contentsCreationModalVisible, setContentsCreationModalVisible } =
    useContentsCreationVisible();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%'], []);

  useEffect(() => {
    if (initialData?.me) {
      setLoggedIn(true);
    }
  }, [initialData, setLoggedIn]);

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
        <View />
      </BottomSheet>
      {loadingVisible && <LoadingOverlay />}
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheetIndicator: {
    backgroundColor: '#dedede',
  },
});
