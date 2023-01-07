import BottomSheet from '@gorhom/bottom-sheet';
import { filter } from 'graphql-anywhere';
import React, { useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useToast } from 'react-native-toast-notifications';
import { BackButton } from 'src/components/ui/BackButton';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import { ThreeDots } from 'src/components/ui/ThreeDots';
import {
  BlockUserError,
  BottomButtonGroupInUserProfileFragment,
  BottomButtonGroupInUserProfileFragmentDoc,
  BottomSheetContentInUserProfileFragment,
  BottomSheetContentInUserProfileFragmentDoc,
  MessageRoomListScreenDataDocument,
  ProfileImagesInUserProfileFragment,
  ProfileImagesInUserProfileFragmentDoc,
  useBlockUserMutation,
  useUnblockUserMutation,
  useUserProfileDataQuery,
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me';
import { theme } from 'src/styles';
import { UserPreviewData } from 'src/types';
import { getGraphQLError } from 'src/utils';
import { BottomButtonGroup } from './BottomButtonGroup';
import { BottomSheetContent } from './BottomSheetContent';
import Constants from './constants';
import { ProfileImages } from './ProfileImages';

type Props = {
  id: string;
  previewData?: UserPreviewData;
};

export const UserProfile = ({ id, previewData }: Props) => {
  const { data } = useUserProfileDataQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-only',
  });

  const myId = useMyId();
  const isMe = myId === id;

  const [modalVisible, setModalVisible] = useState(false);
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [Constants.snapPoint1, '90%'], []);
  const toast = useToast();
  const [blockUserMutation] = useBlockUserMutation();
  const [unblockMutation] = useUnblockUserMutation();

  const onDotsPress = () => {
    if (isMe) {
      return;
    }

    setModalVisible(true);
  };

  const onBlockPress = () => {
    if (isMe) {
      return;
    }

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
              refetchQueries: [
                {
                  query: MessageRoomListScreenDataDocument,
                },
              ],
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
    if (isMe) {
      return;
    }

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
    return (
      <View>
        <SkeletonPlaceholder>
          <View style={styles.loadingImage} />
        </SkeletonPlaceholder>

        <View style={styles.loadingBottom} />
      </View>
    );
  }

  if (data.user.blocking) {
    return null;
  }

  const { blocked, blocking } = data.user;
  const blockingOrBlocked = blocked || blocking;

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

        <Pressable style={styles.topButton} onPress={onDotsPress}>
          <ThreeDots
            dotsSize={22}
            dotsColor={theme.secondary}
            onPress={onDotsPress}
          />
        </Pressable>
      </View>

      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <BottomSheetContent
          data={filter<BottomSheetContentInUserProfileFragment>(
            BottomSheetContentInUserProfileFragmentDoc,
            data.user
          )}
          previewData={previewData}
        />
      </BottomSheet>

      {!blockingOrBlocked && (
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
              data
            )}
          />
        </View>
      )}

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
  loadingImage: {
    height: Constants.imageHeight,
    width: '100%',
  },
  loadingBottom: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    transform: [{ translateY: -10 }],
  },
});
