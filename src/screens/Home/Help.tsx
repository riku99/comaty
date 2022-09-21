import { StyleSheet, View } from 'react-native';
import { HelpCard } from 'src/components/domain/help/HelpCard';

export const Help = () => {
  return (
    <View style={styles.container}>
      <HelpCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
