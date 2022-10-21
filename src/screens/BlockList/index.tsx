import { Text } from '@rneui/themed';
import { useCallback, useLayoutEffect } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { ProfileImage } from 'src/components/domain/user/ProfileImage';
import { Loading } from 'src/components/ui/Loading';
import {
  BlockListScreenDataDocument,
  BlockListScreenDataQuery,
  useBlockListScreenDataQuery,
  useUnblockUserMutation,
} from 'src/generated/graphql';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'BlockList'>;

type BlockItem = BlockListScreenDataQuery['me']['blocks'][number];

export const BlockListScreen = ({ navigation }: Props) => {
  const { data, loading } = useBlockListScreenDataQuery({
    fetchPolicy: 'network-only',
  });
  const [unblockUserMutation] = useUnblockUserMutation();
  const toast = useToast();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'ブロックリスト',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const renderBlockItem = useCallback(({ item }: { item: BlockItem }) => {
    const onPress = () => {
      Alert.alert('ブロック解除しますか？', '', [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '解除',
          onPress: async () => {
            try {
              await unblockUserMutation({
                variables: {
                  id: item.blockTo.id,
                },
                refetchQueries: [
                  {
                    query: BlockListScreenDataDocument,
                  },
                ],
                onCompleted: () => {
                  toast.show('解除しました');
                },
              });
            } catch (e) {}
          },
        },
      ]);
    };

    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => {
          return (
            <View
              style={[
                styles.itemContaier,
                {
                  backgroundColor: pressed ? theme.gray.pressed : undefined,
                },
              ]}
            >
              <ProfileImage
                imageData={item.blockTo.firstProfileImage}
                style={{
                  width: PROFILE_IMAGE_SIZE,
                  height: PROFILE_IMAGE_SIZE,
                  borderRadius: PROFILE_IMAGE_SIZE,
                }}
              />
              <Text style={styles.name}>{item.blockTo.nickname}</Text>
            </View>
          );
        }}
      </Pressable>
    );
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data?.me) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data.me.blocks}
        renderItem={renderBlockItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const PROFILE_IMAGE_SIZE = 44;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContaier: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  name: {
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
