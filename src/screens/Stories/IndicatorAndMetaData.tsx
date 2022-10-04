import { Text } from '@rneui/themed';
import { MotiView } from 'moti';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { CloseButton } from 'src/components/ui/CloseButton';

export const IndicatorAndMetaData = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainr}>
        {inds.map((_, index) => {
          return (
            <View key={index} style={[styles.indicator, styles.indicatorBack]}>
              <MotiView
                style={[styles.indicator, styles.indicatorFront]}
                from={{
                  translateX: -(screenWidth / 2 - PADDING_H),
                }}
                animate={{
                  translateX: 0,
                }}
                transition={{
                  type: 'timing',
                  duration: 4000,
                  easing: Easing.linear,
                }}
              />
            </View>
          );
        })}
      </View>

      <View style={styles.nameAndCloseContainer}>
        <View style={styles.imageAndName}>
          <View style={styles.image} />
          <Text style={styles.nickname}>Riku</Text>
        </View>

        <CloseButton color="#fff" size={32} />
      </View>
    </View>
  );
};

const inds = [1, 2];

const { width: screenWidth } = Dimensions.get('screen');
const PADDING_H = 4;
const IMAGE_SIZE = 34;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: PADDING_H,
  },
  indicatorContainr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  indicator: {
    height: 3,
    borderRadius: 2,
    width: screenWidth / 2.01 - PADDING_H,
  },
  indicatorBack: {
    backgroundColor: '#919191',
    overflow: 'hidden',
  },
  indicatorFront: {
    backgroundColor: '#fff',
  },
  nameAndCloseContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageAndName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE,
    backgroundColor: 'pink',
  },
  nickname: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
    marginLeft: 12,
  },
});
