import { StyleSheet, View } from 'react-native';
import { StoryContainer } from 'src/components/ui/StoryContainer';
import { IndicatorAndMetaData } from './IndicatorAndMetaData';

export const OneUserStory = () => {
  return (
    <View style={styles.container}>
      <StoryContainer backgroundColors={['black', 'orange']}>
        <View></View>
      </StoryContainer>

      <View
        style={{
          position: 'absolute',
          top: 70,
          width: '100%',
        }}
      >
        <IndicatorAndMetaData />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
