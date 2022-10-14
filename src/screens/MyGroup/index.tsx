import { Button, Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Loading } from 'src/components/ui/Loading';
import {
  MyGroupScreenDataDocument,
  useCreateGroupMutation,
  useMyGroupScreenDataQuery,
} from 'src/generated/graphql';
import { useMyId } from 'src/hooks/me/useMyId';
import { ReadQRCodeButton } from './ReadQRCodeButton';

type Props = RootNavigationScreenProp<'MyGroup'>;

export const MyGroupScreen = ({ navigation }: Props) => {
  const { data, loading } = useMyGroupScreenDataQuery();
  const [createGroupMutation] = useCreateGroupMutation();
  const myId = useMyId();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'グループ',
    });
  }, [navigation]);

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

        <View style={styles.buttomButtonsContainer}>
          <Button title="グループを作成" onPress={onCreateButtonPress} />
          <ReadQRCodeButton />
        </View>
      </View>
    );
  }

  const { group } = data.me;

  return (
    <View style={styles.container}>
      <Text>グループメンバー</Text>

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
          <Button title="グループQRコードを表示" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  groupText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    color: '#666666',
    lineHeight: 22,
  },
  buttomButtonsContainer: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    alignSelf: 'center',
  },
});
