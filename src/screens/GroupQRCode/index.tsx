import { Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { CloseButton } from 'src/components/ui/CloseButton';
import { Loading } from 'src/components/ui/Loading';
import { useGroupQrCodeScreenDataQuery } from 'src/generated/graphql';
import { theme } from 'src/styles';
import { GroupQRCodeValue } from 'src/types';

type Props = RootNavigationScreenProp<'GroupQRCode'>;

export const GroupQLCodeScreen = ({ navigation }: Props) => {
  const { data, loading } = useGroupQrCodeScreenDataQuery();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'グループQRコード',
      headerLeft: () => <CloseButton />,
    });
  }, [navigation]);

  if (loading) {
    return <Loading />;
  }

  if (!data?.me) {
    return null;
  }

  const codeValue: GroupQRCodeValue = {
    ownerId: data.me.group.owner.id,
    groupId: data.me.group.id,
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          marginTop: 34,
        }}
      >
        <QRCode
          value={JSON.stringify(codeValue)}
          size={150}
          linearGradient={['#9089fa', '#b289fa', '#e389fa']}
          enableLinearGradient
        />
      </View>

      <Text
        style={{
          textAlign: 'center',
          marginTop: 34,
          color: theme.gray.text,
        }}
      >
        {
          'QRコードを読み取ってもらうことで、\n他のユーザーとグループになれます。'
        }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
