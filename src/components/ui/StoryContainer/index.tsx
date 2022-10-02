import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

type Props = {
  backgroundColors: string[];
  children: JSX.Element;
};

export const StoryContainer = ({ backgroundColors, children }: Props) => {
  return (
    <LinearGradient colors={backgroundColors} style={styles.container}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    aspectRatio: 9 / 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
