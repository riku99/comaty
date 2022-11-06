import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WhiteButton } from 'src/components/ui/Buttons';
import { HeaderRightButton } from 'src/components/ui/HeaderRightButton';
import { HStack } from 'src/components/ui/HStack';
import { Loading } from 'src/components/ui/Loading';
import { OverlayModal } from 'src/components/ui/OverlayModal';
import { Picker } from 'src/components/ui/Picker';
import { Tag } from 'src/components/ui/Tag';
import { TextInput } from 'src/components/ui/TextInput';
import {
  MyProfileImagesDocument,
  useDeleteProfileImageMutation,
  useEditProfileScreenDataQuery,
  useUpdateMeMutation,
  useUploadProfileImageMutation,
} from 'src/generated/graphql';
import { processImageForMultipartRequest } from 'src/helpers/processImagesForMultipartRequest';
import { useMyId } from 'src/hooks/me';
import { theme } from 'src/styles';
import { getHeightList } from 'src/utils';
import { PreviewImage } from './PreviewImage';

type Props = RootNavigationScreenProp<'EditProfile'>;

export const EditProfileScreen = ({ navigation }: Props) => {
  const { data, refetch } = useEditProfileScreenDataQuery({
    fetchPolicy: 'cache-and-network',
  });
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [heightPickerVisible, setHeightPickerVisible] = useState(false);
  const [nickname, setNickName] = useState(data?.me.nickname);
  const [bio, setBio] = useState(data?.me.bio ?? '');
  const [statusMessage, setStatusMessage] = useState(
    data?.me.statusMessage ?? ''
  );
  const [height, setHeight] = useState(data?.me.height);
  const [images, setImages] = useState<{ uri: string; id: number }[]>([]);
  const [uploadIngImageiIndices, setUploadIngIndices] = useState([]);
  const disableComplete =
    !nickname ||
    nickname.length > MAX_NICKNAME_COUNT ||
    statusMessage.length > STATUS_MESSAGE_MAX_COUNT ||
    bio.length > BIO_MAX_COUNT;
  const [updateMeMutation] = useUpdateMeMutation();
  const [uploadProfileImageMutation] = useUploadProfileImageMutation();
  const [deleteProfileImageMutation] = useDeleteProfileImageMutation();
  const [deleteTargetImageId, setDeleteTargetImageId] = useState<null | number>(
    null
  );
  const myId = useMyId();

  useEffect(() => {
    if (data?.me) {
      const { profileImages } = data.me;
      const _images = profileImages.map((img) => ({
        uri: img.url,
        id: img.id,
      }));
      setImages(_images);
    }
  }, [data?.me]);

  const updateMe = useCallback(async () => {
    if (disableComplete) {
      return;
    }

    navigation.goBack();

    await updateMeMutation({
      variables: {
        input: {
          nickname,
          bio,
          statusMessage,
          height,
        },
      },
    });
  }, [nickname, bio, statusMessage, height, refetch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'プロフィール編集',
      headerShadowVisible: false,
      headerRight: () => (
        <HeaderRightButton
          onPress={async () => {
            await updateMe();
          }}
          title="完了"
          disabled={disableComplete}
        />
      ),
    });
  }, [navigation, disableComplete, updateMe]);

  const onImagePress = async ({ index }: { index: number }) => {
    // 既に画像が存在する場合は削除のみ行える
    if (images[index]) {
      setDeleteTargetImageId(images[index].id);
      return;
    }

    try {
      const result = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
      });

      if (result.didCancel) {
        return;
      }

      Alert.alert('アップロードしてよろしいですか？', '', [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: 'アップロード',
          onPress: async () => {
            try {
              setUploadIngIndices((current) => {
                return [...current, index];
              });

              const { uri, type } = result.assets[0];

              if (!uri) {
                return;
              }

              const file = await processImageForMultipartRequest({ uri, type });
              const { data: uploadImageData } =
                await uploadProfileImageMutation({
                  variables: {
                    input: {
                      file,
                    },
                  },
                  refetchQueries: [
                    {
                      query: MyProfileImagesDocument,
                    },
                  ],
                });

              if (uploadImageData) {
                setImages((c) => {
                  return [
                    ...c,
                    {
                      uri: uploadImageData.uploadProfileImage.url,
                      id: uploadImageData.uploadProfileImage.id,
                    },
                  ];
                });
              }
            } catch (e) {
              console.log(e);
            } finally {
              setUploadIngIndices((current) => {
                return current.filter((i) => i !== index);
              });
            }
          },
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteImagePress = async () => {
    if (!deleteTargetImageId) {
      return;
    }

    try {
      const { data: deleteData } = await deleteProfileImageMutation({
        variables: {
          id: deleteTargetImageId,
        },
        refetchQueries: [
          {
            query: MyProfileImagesDocument,
          },
        ],
      });

      setImages((current) => {
        return current.filter(
          (c) =>
            c.id !== deleteData.deleteProfileImage.id ?? deleteTargetImageId
        );
      });
    } catch (e) {
      console.log(e);
    } finally {
      setDeleteTargetImageId(null);
    }
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          extraHeight={130}
        >
          <View>
            <ScrollView
              contentContainerStyle={styles.previewImagesContainer}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <HStack space={18}>
                {arr4.map((_, index) => (
                  <PreviewImage
                    key={index}
                    onPress={() => {
                      onImagePress({ index });
                    }}
                    imageUrl={images[index]?.uri}
                    isUploding={uploadIngImageiIndices.includes(index)}
                  />
                ))}
              </HStack>
            </ScrollView>

            <View style={styles.nameContainer}>
              <Text style={styles.inputTitle}>ニックネーム</Text>
              <TextInput
                style={[styles.input, styles.nameInput]}
                editable={!heightPickerVisible}
                value={nickname}
                onChangeText={setNickName}
              />
              {!nickname && (
                <Text style={styles.alert}>ニックネームを入力してください</Text>
              )}
              {nickname.length > MAX_NICKNAME_COUNT && (
                <Text style={styles.alert}>8文字以下で入力してください</Text>
              )}
            </View>

            <View style={styles.statusMessageContainer}>
              <Text style={styles.inputTitle}>ステータスメッセージ</Text>
              <TextInput
                style={[styles.input, styles.statusMessageInput]}
                value={statusMessage}
                onChangeText={setStatusMessage}
              />
              {statusMessage.length > STATUS_MESSAGE_MAX_COUNT && (
                <Text style={styles.alert}>20文字以下で入力してください</Text>
              )}
            </View>

            <View style={styles.bioContainer}>
              <Text style={styles.inputTitle}>自己紹介</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                multiline
                editable={!heightPickerVisible}
                value={bio}
                onChangeText={setBio}
              />
              {bio.length > BIO_MAX_COUNT && (
                <Text style={styles.alert}>500文字以下で入力してください</Text>
              )}
            </View>

            <View style={styles.heightContainer}>
              <Text style={styles.inputTitle}>身長</Text>
              <Pressable
                style={styles.heightInput}
                onPress={() => {
                  setHeightPickerVisible(!heightPickerVisible);
                }}
              >
                <Text style={styles.heightText}>
                  {!!height ? `${height}cm` : '選択されていません'}
                </Text>
                <FontAwesome
                  name="angle-right"
                  size={24}
                  color={theme.gray.rightIcon}
                />
              </Pressable>
            </View>

            <View style={styles.myTagContainer}>
              <Text style={styles.inputTitle}>マイタグ</Text>
              <Pressable
                style={styles.myTagsWrapper}
                onPress={() => {
                  navigation.navigate('MyTagSelection');
                }}
              >
                <View style={styles.myTags}>
                  {data.me.myTags.map((t) => (
                    <View key={t.id} style={styles.tag}>
                      <Tag text={t.text} />
                    </View>
                  ))}
                </View>
                <FontAwesome
                  name="angle-right"
                  size={24}
                  color={theme.gray.rightIcon}
                />
              </Pressable>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <WhiteButton
          title="プレビュー"
          containerStyle={{
            paddingHorizontal: 16,
            width: '100%',
            position: 'absolute',
            bottom: safeAreaBottom > 0 ? safeAreaBottom : 12,
          }}
          onPress={() => {
            if (!myId) {
              return;
            }

            navigation.navigate('UserProfile', {
              id: myId,
              previewData: {
                nickname,
                bio,
                height,
              },
            });
          }}
        />

        <View style={styles.pickerContainer}>
          <Picker
            isVisible={heightPickerVisible}
            items={getHeightList().map((h) => ({ value: h, label: `${h}cm` }))}
            selectedValue={height ?? INITIAL_HEIGHT}
            onValueChange={(itemValue) => {
              setHeight(Number(itemValue));
            }}
            hidePicker={() => {
              if (!height) {
                setHeight(INITIAL_HEIGHT);
              }
              setHeightPickerVisible(false);
            }}
          />
        </View>
      </SafeAreaView>

      <OverlayModal
        isVisible={!!deleteTargetImageId}
        items={[
          { title: '削除', onPress: onDeleteImagePress, titleColor: theme.red },
        ]}
        onBackdropPress={() => {
          setDeleteTargetImageId(null);
        }}
        onCancel={() => {
          setDeleteTargetImageId(null);
        }}
      />
    </View>
  );
};

const INITIAL_HEIGHT = 165;
const MAX_NICKNAME_COUNT = 8;
const STATUS_MESSAGE_MAX_COUNT = 20;
const BIO_MAX_COUNT = 500;

const arr4 = [1, 2, 3, 4];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  scrollContainer: {
    paddingBottom: 88,
  },
  previewImagesContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  nameContainer: {
    marginTop: 32,
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  nameInput: {
    height: 40,
  },
  bioContainer: {
    marginTop: 32,
  },
  bioInput: {
    height: 120,
    paddingTop: 12,
  },
  heightContainer: {
    marginTop: 32,
  },
  heightInput: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  heightText: {
    fontSize: 16,
  },
  statusMessageContainer: {
    marginTop: 32,
  },
  statusMessageInput: {
    height: 40,
  },
  myTagContainer: {
    marginTop: 32,
  },
  myTagsWrapper: {
    paddingBottom: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  myTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    transform: [{ translateX: -4 }],
  },
  tag: {
    marginTop: 12,
    marginLeft: 4,
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  alert: {
    marginLeft: 16,
    fontSize: 11,
    color: theme.red,
    marginTop: 2,
  },
});
