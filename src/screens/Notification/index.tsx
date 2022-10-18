import { Text } from '@rneui/themed';
import { useCallback, useLayoutEffect } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { Loading } from 'src/components/ui/Loading';
import {
  NotificationScreenDataQuery,
  NotificationType,
  useNotificationScreenDataQuery,
} from 'src/generated/graphql';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'Notification'>;

type NotificationItem =
  NotificationScreenDataQuery['me']['notifications'][number];

export const NotoficationScreen = ({ navigation }: Props) => {
  const { data, loading } = useNotificationScreenDataQuery({
    fetchPolicy: 'cache-and-network',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'お知らせ',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const renderNotificationItem = useCallback(
    ({ item }: { item: NotificationItem }) => {
      const { performer } = item;

      if (!performer) {
        return null;
      }

      const onPerformerPress = () => {
        navigation.navigate('UserProfile', {
          id: performer.id,
        });
      };

      let text = '';
      let onBodyPress = () => {};
      switch (item.type) {
        case NotificationType.Like:
          text = `${performer.nickname}さんがいいねしました。`;
          onBodyPress = () => {
            if (!item.likedPostId) {
              return;
            }

            navigation.navigate('PostDetail', {
              id: item.likedPostId,
            });
          };
      }

      return (
        <Pressable onPress={onBodyPress}>
          {({ pressed }) => (
            <View
              style={[
                styles.item,
                { backgroundColor: pressed ? theme.gray.pressed : undefined },
              ]}
            >
              <Pressable onPress={onPerformerPress}>
                <ProfileImage
                  imageData={performer.firstProfileImage}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: IMAGE_SIZE,
                  }}
                />
              </Pressable>
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 16,
                }}
              >
                {text}
              </Text>
            </View>
          )}
        </Pressable>
      );
    },
    []
  );

  if (loading) {
    return <Loading />;
  }

  if (!data?.me?.notifications) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.me.notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const IMAGE_SIZE = 44;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
