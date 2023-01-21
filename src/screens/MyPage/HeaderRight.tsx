import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View } from 'react-native';

export const HeaderRight = () => {
  const navigation = useNavigation<RootNavigationProp<'MyPage'>>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('SettingStack');
        }}
      >
        <Ionicons name="settings-outline" size={ICON_SIZE} />
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate('Notification');
        }}
      >
        <Ionicons
          name="notifications-outline"
          size={ICON_SIZE}
          style={{
            marginLeft: 22,
          }}
        />
      </Pressable>
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
