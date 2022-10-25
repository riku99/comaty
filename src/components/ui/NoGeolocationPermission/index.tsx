import { Text } from '@rneui/themed';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

export const NoGeolocationPermission = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 80,
          fontSize: 18,
        }}
      >
        すみません！
      </Text>

      <Text
        style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 16,
        }}
      >
        {'Comatyを使うには、\n位置情報をオンにしてください。'}
      </Text>

      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
        }}
      >
        {
          '[設定] -> [Comaty] -> [位置情報] ->\n[このAppの使用中] で設定できます🦄'
        }
      </Text>

      <Pressable
        style={{
          marginTop: 28,
          backgroundColor: theme.primary,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 22,
        }}
        onPress={() => {
          Linking.openSettings();
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 18,
          }}
        >
          設定を開く
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
