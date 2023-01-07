import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const imageHeight = (screenWidth / 3) * 4; // 3:4
const snapPoint1 = screenHeight - imageHeight + 26;

export default {
  imageHeight,
  snapPoint1,
};
