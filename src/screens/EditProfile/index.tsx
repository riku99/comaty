import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import {
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
import { CloseButton } from 'src/components/ui/CloseButton';
import { HeaderRightButton } from 'src/components/ui/HeaderRightButton';
import { HStack } from 'src/components/ui/HStack';
import { Loading } from 'src/components/ui/Loading';
import { Picker } from 'src/components/ui/Picker';
import { TextInput } from 'src/components/ui/TextInput';
import {
  useEditProfileScreenDataQuery,
  useUpdateMeMutation,
} from 'src/generated/graphql';
import { theme } from 'src/styles';
import { PreviewImage } from './PreviewImage';

type Props = RootNavigationScreenProp<'EditProfile'>;

export const EditProfileScreen = ({ navigation }: Props) => {
  const { data } = useEditProfileScreenDataQuery();
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [heightPickerVisible, setHeightPickerVisible] = useState(false);
  const [nickname, setNickName] = useState(data?.me.nickname);
  const [bio, setBio] = useState(data?.me.bio ?? '');
  const [statusMessage, setStatusMessage] = useState(
    data?.me.statusMessage ?? ''
  );
  const [height, setHeight] = useState(data?.me.height);
  const disableComplete = !nickname;
  const [updateMeMutation] = useUpdateMeMutation();
  const [profileImage1, setProfileImage1] = useState(
    data?.me.profileImages[0]?.url
  );
  const [profileImage2, setProfileImage2] = useState(
    data?.me.profileImages[1]?.url
  );
  const [profileImage3, setProfileImage3] = useState(
    data?.me.profileImages[2]?.url
  );
  const [profileImage4, setProfileImage4] = useState(
    data?.me.profileImages[3]?.url
  );
  const [images, setImages] = useState<{ uri: string }[]>([]);

  useEffect(() => {
    if (data?.me) {
      const _images = data.me.profileImages.map((img) => ({ uri: img.url }));
      setImages(_images);
    }
  }, [data?.me]);

  const updateMe = useCallback(async () => {
    if (disableComplete) {
      return;
    }

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
  }, [nickname, bio, statusMessage, height]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'プロフィール編集',
      headerLeft: () => <CloseButton />,
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

  const getImageUri = async () => {
    try {
      const result = await launchImageLibrary({
        selectionLimit: 1,
        mediaType: 'photo',
      });

      if (result.didCancel) {
        return;
      }

      return result.assets[0].uri;
    } catch (e) {
      console.log(e);
    }
  };

  const setImage = async (index: number) => {
    const uri = await getImageUri();
    if (uri) {
      setImages((current) => {
        const copy = [...current];
        copy[index] = { uri };
        return copy;
      });
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
              <HStack space={12}>
                <PreviewImage
                  onPress={async () => {
                    await setImage(0);
                  }}
                  imageUrl={images[0]?.uri}
                />

                <PreviewImage
                  imageUrl={images[1]?.uri}
                  disable={!images[0]?.uri}
                  onPress={async () => {
                    await setImage(1);
                  }}
                />

                <PreviewImage
                  imageUrl={images[2]?.uri}
                  disable={!images[1]?.uri}
                  onPress={async () => {
                    await setImage(2);
                  }}
                />

                <PreviewImage
                  onPress={async () => {
                    await setImage(3);
                  }}
                  imageUrl={images[3]?.uri}
                  disable={!images[2]?.uri}
                />
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
            </View>

            <View style={styles.statusMessageContainer}>
              <Text style={styles.inputTitle}>ステータスメッセージ</Text>
              <TextInput
                style={[styles.input, styles.statusMessageInput]}
                value={statusMessage}
                onChangeText={setStatusMessage}
              />
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
              <Pressable style={styles.myTags}>
                <View></View>
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
            bottom: safeAreaBottom,
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
    </View>
  );
};

const INITIAL_HEIGHT = 165;

const getHeightList = () => {
  const list: number[] = [];
  for (let i = 130; i <= 230; i++) {
    list.push(i);
  }
  return list;
};

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
  myTags: {
    height: 90,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  pickerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
