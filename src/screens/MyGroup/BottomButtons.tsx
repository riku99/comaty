import { Button } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import {
  BottomButtonsInMyGroupScreenFragment,
  MyGroupScreenDataDocument,
  useCreateGroupMutation,
} from 'src/generated/graphql';
import { theme } from 'src/styles';

type Props = {
  fragmentData: BottomButtonsInMyGroupScreenFragment;
};

export const BottomButtons = () => {
  const [createGroupMutation] = useCreateGroupMutation();

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

  return (
    <View style={styles.container}>
      <Button title="グループを作成" onPress={onCreateButtonPress} />
      <Button
        title="QRコード読み取り"
        containerStyle={{
          marginTop: 12,
        }}
        buttonStyle={{
          backgroundColor: '#fff',
        }}
        titleStyle={{
          color: theme.black,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
