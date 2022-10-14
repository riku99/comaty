import { Button } from '@rneui/themed';
import { theme } from 'src/styles';

export const ReadQRCodeButton = () => {
  return (
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
    />
  );
};
