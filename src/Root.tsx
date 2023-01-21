import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useMemo, useRef } from 'react';
import {
  Alert,
  AppState,
  AppStateStatus,
  NativeEventSubscription,
  StyleSheet,
} from 'react-native';
import { View } from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import Geolocation from 'react-native-geolocation-service';
import { ContentsCreationButtonGroup } from 'src/components/ui/ContentsCreationButtonGroup';
import { LoadingOverlay } from 'src/components/ui/LoadingOverlay';
import {
  AgeVerificationStatus,
  useGetInitialDataQuery,
  useUpdateAgeVerificationStatusToNotPresentedMutation,
  useUpdatePositionMutation,
} from 'src/generated/graphql';
import { useGetDataOnActive } from 'src/hooks/app/useGetDataOnActive';
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
  const [updateAgeVerificationStatusToNotPresentedMutation] =
    useUpdateAgeVerificationStatusToNotPresentedMutation();

  const myId = initialData?.me.id;

  useGetDataOnActive();

  useEffect(() => {
    if (initialData?.me) {
      setLoggedIn(true);
    }
  }, [initialData, setLoggedIn]);

  // ボトムタブから表示させるストーリー作成などのモーダルの閉じる処理
  useEffect(() => {
    if (!contentsCreationModalVisible) {
      bottomSheetRef.current?.close();
    }
  }, [contentsCreationModalVisible]);

  // ユーザーの絞り込み条件をセットアップ
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

    // アクティブ時の位置情報更新など
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
                    onCompleted: () => {
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
              (error) => {
                console.log(error);
              }
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
  }, [loggedIn, setGeolocationPermitted, updatePositionMutation]);

  // 年齢確認完了の報告など
  useEffect(() => {
    if (loggedIn) {
      if (!initialData?.me) {
        return;
      }

      const { ageVerificationStatus } = initialData.me;
      const showed = storage.getBoolean(
        mmkvStorageKeys.showedCompletedAgeVerificationAlert
      );

      if (
        !showed &&
        ageVerificationStatus === AgeVerificationStatus.Completed
      ) {
        Alert.alert('年齢確認が完了しました', 'ご協力ありがとうございました!');
        storage.set(mmkvStorageKeys.showedCompletedAgeVerificationAlert, true);
        return;
      }

      if (ageVerificationStatus === AgeVerificationStatus.Failed) {
        Alert.alert(
          '年齢確認に失敗しました',
          'ハッキリと写っている写真を選択し、再度提出してください。',
          [
            {
              onPress: async () => {
                try {
                  await updateAgeVerificationStatusToNotPresentedMutation();
                } catch (e) {
                  console.log(e);
                }
              },
            },
          ]
        );
      }
    }
  }, [
    loggedIn,
    initialData,
    updateAgeVerificationStatusToNotPresentedMutation,
  ]);

  // 自分のプロフィール画像のプリロード
  useEffect(() => {
    if (loggedIn && initialData?.me?.firstProfileImage) {
      FastImage.preload([
        {
          uri: initialData?.me.firstProfileImage.url,
        },
      ]);
    }
  }, [loggedIn, initialData?.me?.firstProfileImage]);

  useEffect(() => {
    let unsubscribe: () => void;

    if (myId) {
      console.log(myId);
      unsubscribe = firestore()
        .collection('Messages')
        .where('recipientId', '==', myId)
        .orderBy('createdAt', 'desc')
        .limit(1)
        .onSnapshot((querySnapshot) => {
          if (querySnapshot && querySnapshot.docs.length) {
            console.log('⚡️ snapshot doc');
            console.log(
              'id is ' + querySnapshot.docs[querySnapshot.docs.length - 1].id
            );
            console.log(
              querySnapshot.docs[querySnapshot.docs.length - 1].data()
            );
          }
        });
    }

    return () => {
      if (unsubscribe) {
        console.log('unsubscribe firestore snapshot');
        unsubscribe();
      }
    };
  }, [myId]);

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
