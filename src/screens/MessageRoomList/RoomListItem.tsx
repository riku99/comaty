import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { RoomListItemInMessageRoomListScreenFragment } from 'src/generated/graphql';

type Props = {
  fragmentData: RoomListItemInMessageRoomListScreenFragment;
};

export const RoomListItem = ({ fragmentData }: Props) => {
  const { partner, messages, id } = fragmentData;
  const message = messages.edges[0]?.node.text;
  const navigation = useNavigation<RootNavigationProp<'MessageRoomList'>>();

  const onBodyPress = () => {
    navigation.navigate('MessageRoom', {
      roomId: id,
      userId: partner.id,
    });
  };

  return (
    <Pressable style={styles.container} onPress={onBodyPress}>
      <ProfileImage
        imageData={partner.firstProfileImage}
        style={{
          height: IMAGE_SIZE,
          width: IMAGE_SIZE,
          borderRadius: IMAGE_SIZE,
        }}
      />

      <View style={styles.nameAndMessage}>
        <Text style={styles.name}>{partner.nickname}</Text>
        <Text style={styles.text}>{message.replace(/\r?\n/g, '')}</Text>
      </View>
    </Pressable>
  );
};

const IMAGE_SIZE = 54;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  nameAndMessage: {
    marginLeft: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    marginTop: 4,
  },
});
