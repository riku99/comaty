import { Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = () => {
  const safeArea = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: safeArea.top }]}>
      <Text style={styles.title}>近くにいるユーザー</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 16,
  },
});
