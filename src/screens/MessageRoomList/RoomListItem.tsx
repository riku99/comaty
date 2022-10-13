import { Text } from '@rneui/themed';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { RoomListItemInMessageRoomListScreenFragment } from 'src/generated/graphql';

type Props = {
  fragmentData: RoomListItemInMessageRoomListScreenFragment;
} & ComponentProps<typeof Pressable>;

export const RoomListItem = ({ fragmentData, ...pressableProps }: Props) => {
  const { partner, messages } = fragmentData;
  const message = messages.edges[0]?.node.text;

  return (
    <Pressable {...pressableProps}>
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: pressed ? '#F6F6F6' : undefined,
            },
          ]}
        >
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
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
              {message.replace(/\r?\n/g, '')}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const IMAGE_SIZE = 54;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  nameAndMessage: {
    marginLeft: 8,
    width: '100%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    marginTop: 6,
    width: '80%',
  },
});
