import { Button, Text } from '@rneui/themed';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { UserCard } from 'src/components/domain/user/UserCard';
import { Loading } from 'src/components/ui/Loading';
import { ModalItem, OverlayModal } from 'src/components/ui/OverlayModal';
import { ThreeDots } from 'src/components/ui/ThreeDots';
import {
  MyGroupScreenDataDocument,
  MyGroupScreenDataQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useExitFromGroupMutation,
  useMyGroupScreenDataQuery,
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me/useMyId';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'MyGroup'>;

type UserItem = MyGroupScreenDataQuery['me']['group']['members'][number];

export const MyGroupScreen = ({ navigation }: Props) => {
  const { data, loading } = useMyGroupScreenDataQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [createGroupMutation] = useCreateGroupMutation();
  const myId = useMyId();
  const [menuModalVisible, setMenuModalVisibe] = useState(false);
  const [deleteGroupMutation] = useDeleteGroupMutation();
  const [exitFromGroupMutation] = useExitFromGroupMutation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'グループ',
      headerShadowVisible: false,
      headerRight: () => (
        <ThreeDots
          dotsSize={22}
          onPress={() => {
            setMenuModalVisibe(true);
          }}
        />
      ),
    });
  }, [navigation, setMenuModalVisibe]);

  const onCreateButtonPress = async () => {
    try {
      await createGroupMutation({
        onCompleted: (d) => {
          console.log(d);
        },
        refetchQueries: [
          {
            query: MyGroupScreenDataDocument,
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onDissolveGroupPress = async () => {
    if (!data?.me.group) {
      return;
    }

    Alert.alert(
      'グループを解散してよろしいですか？',
      '他のメンバーも全てグループから削除されます。',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '解散',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteGroupMutation({
                variables: {
                  id: data.me.group.id,
                },
                onCompleted: (d) => {
                  console.log(d);
                },
                refetchQueries: [
                  {
                    query: MyGroupScreenDataDocument,
                  },
                ],
              });
            } catch (e) {
              console.log(e);
            } finally {
              setMenuModalVisibe(false);
            }
          },
        },
      ]
    );
  };

  const onExitGroupPress = async () => {
    if (!data?.me.group) {
      return;
    }

    Alert.alert('グループから抜けてもよろしいですか？', '', [
      {
        text: 'キャンセル',
        style: 'cancel',
      },
      {
        text: '抜ける',
        style: 'destructive',
        onPress: async () => {
          try {
            await exitFromGroupMutation({
              onCompleted: (d) => {
                console.log(d);
              },
              refetchQueries: [
                {
                  query: MyGroupScreenDataDocument,
                },
              ],
            });
          } catch (e) {
            console.log(e);
          } finally {
            setMenuModalVisibe(false);
          }
        },
      },
    ]);
  };

  const onDisplayingQLCodeButtonPress = () => {
    navigation.navigate('GroupQRCode');
  };

  const onReadQRCodeButtonPress = () => {
    navigation.navigate('GroupQRCodeScanner');
  };

  const hideModal = () => {
    setMenuModalVisibe(false);
  };

  const renderUserItem = useCallback(({ item }: { item: UserItem }) => {
    return (
      <UserCard
        userCardData={item.user}
        onPress={(id: string) => {
          navigation.navigate('UserProfile', { id });
        }}
      />
    );
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data?.me.group) {
    return (
      <View style={styles.container}>
        <Text style={styles.groupText}>
          {
            'グループが作成されていません。\n今一緒にいる人とグループになりましょう！'
          }
        </Text>

        <View
          style={[
            styles.buttomButtonsContainer,
            {
              position: 'absolute',
              bottom: 12,
            },
          ]}
        >
          <Button title="グループを作成" onPress={onCreateButtonPress} />
          <Button
            title="グループQRコード読み取り"
            containerStyle={{
              marginTop: 12,
            }}
            buttonStyle={{
              backgroundColor: '#fff',
            }}
            titleStyle={{
              color: theme.black,
            }}
            onPress={onReadQRCodeButtonPress}
          />
        </View>
      </View>
    );
  }

  const { group } = data.me;
  const isOwner = group.owner.id === myId;
  const modalItems: ModalItem[] = isOwner
    ? [
        {
          title: 'グループを解散',
          titleColor: theme.red,
          onPress: onDissolveGroupPress,
        },
      ]
    : [
        {
          title: 'グループから抜ける',
          titleColor: theme.red,
          onPress: onExitGroupPress,
        },
      ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data.me.group.members}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}
        numColumns={2}
        contentContainerStyle={styles.memberContaienr}
      />

      {myId === group.owner.id && (
        <View style={styles.buttomButtonsContainer}>
          <Text
            style={{
              fontWeight: 'bold',
              marginBottom: 12,
            }}
          >
            あなたはグループのオーナーです
          </Text>
          <Button
            title="グループQRコードを表示"
            onPress={onDisplayingQLCodeButtonPress}
          />
        </View>
      )}

      <OverlayModal
        isVisible={menuModalVisible}
        items={modalItems}
        onCancel={hideModal}
        onBackdropPress={hideModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    color: '#666666',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  buttomButtonsContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  memberContaienr: {
    paddingTop: 12,
    paddingBottom: 24,
  },
});
