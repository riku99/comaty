import { Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { RadioButton } from 'src/components/ui/RadioButton';
import { VStack } from 'src/components/ui/VStack';
import { formatAddress } from 'src/utils';

type Props = RootNavigationScreenProp<'LocationOfQuestionSelection'>;

export const LocationOfQuestionSelectionScreen = ({ navigation }: Props) => {
  const [selectedCoodinate, setSelectedCoodinate] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [selectedLocationAddress, setSelectedLocationAddress] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '場所の入力',
    });
  }, [navigation]);

  const onMapPress = async ({ nativeEvent }: MapPressEvent) => {
    setSelectedCoodinate(nativeEvent.coordinate);
    try {
      const resultJson = await Geocoder.from(
        nativeEvent.coordinate.latitude,
        nativeEvent.coordinate.longitude
      );
      setSelectedLocationAddress(
        formatAddress(resultJson.results[0].formatted_address)
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 35.691272864352946,
            longitude: 140.02043343209206,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          onPress={onMapPress}
        >
          {selectedCoodinate && <Marker coordinate={selectedCoodinate} />}
        </MapView>

        <View style={styles.withoutMapContents}>
          <Text style={[styles.askTitle, { marginTop: 14 }]}>
            どの辺にいる人に質問する？
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginTop: 8,
            }}
          >
            {selectedLocationAddress
              ? selectedLocationAddress
              : 'マップから選択してください🙃'}
          </Text>

          <Text style={[styles.askTitle, { marginTop: 40 }]}>
            そこからどれくらいの範囲にいるユーザーに質問する？
          </Text>

          <VStack
            space={18}
            style={{
              marginTop: 12,
            }}
          >
            <RadioButton size={22} isSelected={false} label="広め" />
            <RadioButton size={22} isSelected={true} label="普通" />
            <RadioButton size={22} isSelected={false} label="すぐ近く" />
          </VStack>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: 250,
    width: '100%',
  },
  withoutMapContents: {
    paddingHorizontal: 16,
  },
  askTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
