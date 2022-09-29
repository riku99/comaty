import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Button, Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CloseButton } from 'src/components/ui/CloseButton';
import { HeaderRightButton } from 'src/components/ui/HeaderRightButton';
import { HStack } from 'src/components/ui/HStack';
import { TextInput } from 'src/components/ui/TextInput';
import { theme } from 'src/styles';
import { PreviewImage } from './PreviewImage';

type Props = RootNavigationScreenProp<'EditProfile'>;

export const EditProfileScreen = ({ navigation }: Props) => {
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [showHeightPicker, setShowHeightPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'プロフィール編集',
      headerLeft: () => <CloseButton />,
      headerShadowVisible: false,
      headerRight: () => <HeaderRightButton onPress={() => {}} title="完了" />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
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
            <TextInput style={[styles.input, styles.nameInput]} />
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.inputTitle}>自己紹介</Text>
            <TextInput style={[styles.input, styles.bioInput]} multiline />
          </View>

          <View style={styles.heightContainer}>
            <Text style={styles.inputTitle}>身長</Text>
            <Pressable
              style={styles.heightInput}
              onPress={() => {
                setShowHeightPicker(!showHeightPicker);
              }}
            >
              <Text style={styles.heightText}>183</Text>
              <FontAwesome name="angle-right" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Button
        title="プレビュー"
        titleStyle={{
          color: theme.black,
        }}
        containerStyle={{
          paddingHorizontal: 16,
          position: 'absolute',
          width: '100%',
          bottom: safeAreaBottom,
        }}
        buttonStyle={{
          height: 48,
          backgroundColor: '#fff',
          borderWidth: 0.7,
          borderColor: '#B5B5B5',
        }}
      />

      {showHeightPicker && (
        <View
          style={{
            backgroundColor: '#fff',
            position: 'absolute',
            left: 0,
            width: '100%',
            bottom: 0,
            borderTopColor: theme.gray.boarder,
            borderTopWidth: 1,
          }}
        >
          <Picker
            selectedValue={180}
            onValueChange={(itemValue, itemIndex) => {}}
            style={{
              height: 250,
              backgroundColor: '#fff',
            }}
          >
            {getHeightList().map((h) => (
              <Picker.Item key={h} label={`${h}cm`} value={h} />
            ))}
          </Picker>

          <Pressable
            style={{
              backgroundColor: theme.primary,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 10,
              borderRadius: 20,
              position: 'absolute',
              top: 6,
              right: 14,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              完了
            </Text>
          </Pressable>
        </View>
      )}
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
    paddingBottom: 30,
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
    fontSize: 18,
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
});
