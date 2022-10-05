import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isMoreRecentThanXDevice } from 'src/constants';

type Props = {
  backgroundColors: string[];
  children: JSX.Element | JSX.Element[];
};

export const StoryContainer = ({ backgroundColors, children }: Props) => {
  const { top: safeAreaTop } = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={backgroundColors}
      style={[
        styles.container,
        {
          marginTop: isMoreRecentThanXDevice ? safeAreaTop : 0,
          borderRadius: isMoreRecentThanXDevice ? 12 : 0,
        },
      ]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: undefined,
    aspectRatio: 9 / 16,
    overflow: 'hidden',
  },
});
