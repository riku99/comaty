import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export const HeaderRight = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="settings-outline" size={ICON_SIZE} />
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
