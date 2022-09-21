import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import { ContentsCreationButtonGroup } from 'src/components/ui/ContentsCreationButtonGroup';
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
  const snapPoints = useMemo(() => ['28%'], []);

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
  },
  bottomSheetButtonGroups: {
    width: '80%',
    marginTop: 40,
  },
});
