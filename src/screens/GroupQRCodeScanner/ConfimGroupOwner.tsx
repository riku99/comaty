import { Button, Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { ConfirmGroupOwnerInGroupQrCodeFragment } from 'src/generated/graphql';
import { theme } from 'src/styles';

type Props = {
  fragmentData: ConfirmGroupOwnerInGroupQrCodeFragment;
  onCancelPress: () => void;
  onMakeMemberPress: () => void;
};

export const ConfirmGroupOwner = ({
  fragmentData,
  onCancelPress,
  onMakeMemberPress,
}: Props) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <Text>このユーザーとグループになりますか？</Text>

        <ProfileImage
          style={styles.profileImage}
          imageData={fragmentData.firstProfileImage}
        />

        <Text style={styles.name}>{fragmentData.nickname}</Text>

        <View style={styles.buttons}>
          <Button
            title="グループになる"
            titleStyle={{
              fontSize: 16,
            }}
            onPress={onMakeMemberPress}
          />

          <Button
            title="キャンセル"
            onPress={onCancelPress}
            containerStyle={{
              marginTop: 8,
            }}
            titleStyle={{
              fontSize: 16,
              color: theme.black,
            }}
            buttonStyle={{
              backgroundColor: '#fff',
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const IMAGE_SIZE = 68;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  safeAreaContainer: {
    alignItems: 'center',
    paddingTop: 44,
  },
  profileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE,
    marginTop: 18,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 12,
    fontSize: 18,
  },
  buttons: {
    width: '70%',
    marginTop: 22,
  },
});
