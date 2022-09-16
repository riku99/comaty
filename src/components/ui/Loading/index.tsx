import { ActivityIndicator, StyleSheet } from 'react-native';

export const Loading = () => {
  return <ActivityIndicator size={24} style={styles.indicator} />;
};

const styles = StyleSheet.create({
  indicator: {
    marginTop: 10,
  },
});
