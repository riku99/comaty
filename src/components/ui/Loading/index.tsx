import { ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from 'src/styles';

export const Loading = () => {
  return (
    <ActivityIndicator
      color={theme.primary}
      size={24}
      style={styles.indicator}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    marginTop: 10,
  },
});
