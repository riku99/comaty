import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WhiteButton } from 'src/components/ui/Buttons';
import { CloseButton } from 'src/components/ui/CloseButton';
import { HeaderRightButton } from 'src/components/ui/HeaderRightButton';
import { HStack } from 'src/components/ui/HStack';
import { Loading } from 'src/components/ui/Loading';
import { Picker } from 'src/components/ui/Picker';
import { TextInput } from 'src/components/ui/TextInput';
import { useEditProfileScreenDataQuery } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { PreviewImage } from './PreviewImage';

type Props = RootNavigationScreenProp<'EditProfile'>;

export const EditProfileScreen = ({ navigation }: Props) => {
  const { data } = useEditProfileScreenDataQuery();
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [heightPickerVisible, setHeightPickerVisible] = useState(false);
  const [nickname, setNickName] = useState(data?.me.nickname);
  const [bio, setBio] = useState(data?.me.bio);
  const [statusMessage, setStatusMessage] = useState(data?.me.statusMessage);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'プロフィール編集',
      headerLeft: () => <CloseButton />,
      headerShadowVisible: false,
      headerRight: () => <HeaderRightButton onPress={() => {}} title="完了" />,
    });
  }, [navigation]);

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
                  onPress={() => {}}
                  imageUrl="https://storage.googleapis.com/comaty-dev-develop-resource/rose.jpeg"
                />
                <PreviewImage onPress={() => {}} />
                <PreviewImage onPress={() => {}} disable />
                <PreviewImage onPress={() => {}} disable />
              </HStack>
            </ScrollView>

            <View style={styles.nameContainer}>
              <Text style={styles.inputTitle}>ニックネーム</Text>
              <TextInput
                style={[styles.input, styles.nameInput]}
                editable={!heightPickerVisible}
                value={nickname}
              />
            </View>

            <View style={styles.statusMessageContainer}>
              <Text style={styles.inputTitle}>ステータスメッセージ</Text>
              <TextInput
                style={[styles.input, styles.statusMessageInput]}
                value={statusMessage}
              />
            </View>

            <View style={styles.bioContainer}>
              <Text style={styles.inputTitle}>自己紹介</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                multiline
                editable={!heightPickerVisible}
                value={bio}
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
                <Text style={styles.heightText}>183</Text>
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
            selectedValue={180}
            onValueChange={(itemValue, itemIndex) => {}}
            hidePicker={() => {
              setHeightPickerVisible(false);
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

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
