import { Button, Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';
import { HeaderRightButton } from 'src/components/ui/HeaderRightButton';
import { theme } from 'src/styles';
import { PreviewImage } from './PreviewImage';

type Props = RootNavigationScreenProp<'EditProfile'>;

export const EditProfileScreen = ({ navigation }: Props) => {
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
      <SafeAreaView>
        <ScrollView style={styles.contents}>
          <View style={styles.previewImagesContainer}>
            <PreviewImage
              onPress={() => {}}
              imageUrl="https://storage.googleapis.com/comaty-dev-develop-resource/rose.jpeg"
            />
            <PreviewImage onPress={() => {}} />
            <PreviewImage onPress={() => {}} />
            <PreviewImage onPress={() => {}} />
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.inputTitle}>ニックネーム</Text>
            <TextInput style={styles.input} selectionColor={theme.primary} />
          </View>
        </ScrollView>
        <Button
          title="プレビュー"
          titleStyle={{
            color: theme.black,
          }}
          containerStyle={{
            paddingHorizontal: 16,
          }}
          buttonStyle={{
            height: 48,
            backgroundColor: '#fff',
            borderWidth: 0.7,
            borderColor: '#B5B5B5',
          }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  contents: {
    height: '90%',
  },
  previewImagesContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    height: 40,
    fontSize: 16,
  },
});
