import BottomSheet from '@gorhom/bottom-sheet';
import { filter } from 'graphql-anywhere';
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { BackButton } from 'src/components/ui/BackButton';
import { Loading } from 'src/components/ui/Loading';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import { ThreeDots } from 'src/components/ui/ThreeDots';
import {
  BlockUserError,
  BottomButtonGroupInUserProfileFragment,
  BottomButtonGroupInUserProfileFragmentDoc,
  BottomSheetContentInUserProfileFragment,
  BottomSheetContentInUserProfileFragmentDoc,
  ProfileImagesInUserProfileFragment,
  ProfileImagesInUserProfileFragmentDoc,
  useBlockUserMutation,
  useUnblockUserMutation,
  useUserProfileScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';
import { getGraphQLError } from 'src/utils';
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

  const [modalVisible, setModalVisible] = useState(false);
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [Constants.snapPoint1, '90%'], []);
  const toast = useToast();
  const [blockUserMutation] = useBlockUserMutation();
  const [unblockMutation] = useUnblockUserMutation();

  const onBlockPress = () => {
    Alert.alert('ブロックしますか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: 'ブロック',
        style: 'destructive',
        onPress: async () => {
          setModalVisible(false);

          try {
            await blockUserMutation({
              variables: {
                id,
              },
              onCompleted: (d) => {
                toast.show('ブロックしました');
              },
            });
          } catch (e) {
            const { code } = getGraphQLError(e, 0);
            if (code === BlockUserError.AlreadyBlockedUser) {
              toast.show('既にブロックしています');
            }
          }
        },
      },
    ]);
  };

  const onUnblockPress = () => {
    Alert.alert('解除してよろしいですか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '解除',
        style: 'destructive',
        onPress: async () => {
          setModalVisible(false);

          try {
            await unblockMutation({
              variables: {
                id,
              },
              onCompleted: (d) => {
                toast.show('解除しました');
              },
            });
          } catch (e) {}
        },
      },
    ]);
  };

  if (!data?.user) {
    return <Loading />;
  }

  const { blocked } = data.user;

  return (
    <View style={styles.container}>
      <ProfileImages
        imageData={filter<ProfileImagesInUserProfileFragment>(
          ProfileImagesInUserProfileFragmentDoc,
          data.user
        )}
      />

      <View style={styles.topContainer}>
        <BackButton />

        <Pressable
          style={styles.topButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <ThreeDots
            dotsSize={22}
            dotsColor={theme.secondary}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </Pressable>
      </View>

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

      <OverlayModal
        isVisible={modalVisible}
        items={[
          {
            title: blocked ? 'ブロック解除' : 'ブロック',
            titleColor: theme.red,
            onPress: blocked ? onUnblockPress : onBlockPress,
          },
        ]}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
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
  topContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topButton: {
    backgroundColor: '#f1eaf2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
