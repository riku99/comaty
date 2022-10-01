import { StyleSheet, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';

type Props = RootNavigationScreenProp<'StoryCamera'>;

export const StoryCameraScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 60,
          left: 10,
        }}
      >
        <CloseButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
