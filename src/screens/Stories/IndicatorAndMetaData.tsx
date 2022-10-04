import { Text } from '@rneui/themed';
import { MotiView } from 'moti';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { CloseButton } from 'src/components/ui/CloseButton';
import { range } from 'src/utils';

type Props = {
  count: number;
  currentIndex: number;
  duration: number;
};

export const IndicatorAndMetaData = ({
  count,
  currentIndex,
  duration,
}: Props) => {
  const totalAmountOfSpace = (count - 1) * INDICAOTR_SPACE;
  const w = screenWidth - PADDING_H * 2 - totalAmountOfSpace;

  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainr}>
        {[...range(0, count)].map((_, index) => {
          return (
            <View
              key={index}
              style={[
                styles.indicator,
                styles.indicatorBack,
                {
                  width: w / count,
                },
              ]}
            >
              <MotiView
                style={[styles.indicator, styles.indicatorFront]}
                from={{
                  translateX: -(w / count),
                }}
                animate={{
                  translateX: currentIndex === index ? 0 : undefined,
                }}
                transition={{
                  type: 'timing',
                  duration: duration,
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
const INDICAOTR_SPACE = 4;

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
    borderRadius: 3,
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
