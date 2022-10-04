import { Dimensions, StyleSheet, View } from 'react-native';
import { StoryContainer } from 'src/components/ui/StoryContainer';

type Props = {
  userId: string;
};

export const OneUserStory = ({ userId }: Props) => {
  return (
    <View style={styles.container}>
      <StoryContainer backgroundColors={['red', 'orange']}>
        <View></View>
      </StoryContainer>

      {/* <View
        style={{
          position: 'absolute',
          top: 70,
          width: '100%',
        }}
      >
        <IndicatorAndMetaData count={2} currentIndex={0} duration={4000} />
      </View> */}
    </View>
  );
};

const { height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: screenHeight,
  },
});
