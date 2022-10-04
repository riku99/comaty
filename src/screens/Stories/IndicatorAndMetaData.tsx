import { Text } from '@rneui/themed';
import { Dimensions, StyleSheet, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';

export const IndicatorAndMetaData = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainr}>
        {inds.map((_, index) => {
          return <View key={index} style={styles.indicatorBack}></View>;
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

const inds = [1, 2, 3, 4];

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
  indicatorBack: {
    height: 3,
    borderRadius: 2,
    width: screenWidth / 4 - PADDING_H,
    backgroundColor: '#919191',
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
