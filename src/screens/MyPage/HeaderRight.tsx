import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View } from 'react-native';

export const HeaderRight = () => {
  const navigation = useNavigation<RootNavigationProp<'MyPage'>>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('Setting');
        }}
      >
        <Ionicons name="settings-outline" size={ICON_SIZE} />
      </Pressable>
      <Ionicons
        name="notifications-outline"
        size={ICON_SIZE}
        style={{
          marginLeft: 16,
        }}
      />
    </View>
  );
};

const ICON_SIZE = 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
