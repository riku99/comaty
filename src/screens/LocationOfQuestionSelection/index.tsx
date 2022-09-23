import { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Props = RootNavigationScreenProp<'LocationOfQuestionSelection'>;

export const LocationOfQuestionSelectionScreen = ({ navigation }: Props) => {
  const [selectedCoodinate, setSelectedCoodinate] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '場所の入力',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <MapView
          style={{
            height: 300,
            width: '100%',
          }}
          initialRegion={{
            latitude: 35.691272864352946,
            longitude: 140.02043343209206,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={({ nativeEvent }) => {
            setSelectedCoodinate(nativeEvent.coordinate);
          }}
        >
          {selectedCoodinate && <Marker coordinate={selectedCoodinate} />}
        </MapView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
