import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';
import { theme } from 'src/styles';

export const LoadingOverlay = () => {
  return (
    <View style={styles.background}>
      <View style={styles.indicatorContainer}>
        <MaterialIndicator color={theme.primary} size={40} />
      </View>
    </View>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    width: 90,
    height: 90,
    backgroundColor: '#fff',
    borderRadius: 24,
  },
});
