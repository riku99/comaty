import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

export const ContentCreationButton = () => {
  return (
    <LinearGradient
      colors={['#9089fa', '#b289fa', '#e389fa']}
      style={styles.gradientContainer}
    >
      <View style={styles.blankContainer}>
        <Entypo name="plus" size={20} color={'#4a4a4a'} />
      </View>
    </LinearGradient>
  );
};

const GRADIENT_SIZE = 34;
const BLANK_SIZE = GRADIENT_SIZE - 4;

const styles = StyleSheet.create({
  gradientContainer: {
    width: GRADIENT_SIZE,
    height: GRADIENT_SIZE,
    borderRadius: GRADIENT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blankContainer: {
    width: BLANK_SIZE,
    height: BLANK_SIZE,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
