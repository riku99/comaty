import { Text } from '@rneui/themed';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { Badge } from 'src/components/ui/Badge';
import { RoomListItemInMessageRoomListScreenFragment } from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me/useMyId';

type Props = {
  fragmentData: RoomListItemInMessageRoomListScreenFragment;
} & ComponentProps<typeof Pressable>;

export const RoomListItem = ({ fragmentData, ...pressableProps }: Props) => {
  const { partner, messages } = fragmentData;
  const message = messages.edges[0]?.node;
  const text = message.text;
  const myId = useMyId();
  const badgeVisible = !message.read && message.sender.id !== myId;

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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
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
                {text.replace(/\r?\n/g, '')}
              </Text>
            </View>
          </View>

          {badgeVisible && <Badge size={10} />}
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
    justifyContent: 'space-between',
  },
  nameAndMessage: {
    marginLeft: 8,
    width: '60%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    marginTop: 6,
    width: '100%',
  },
});
