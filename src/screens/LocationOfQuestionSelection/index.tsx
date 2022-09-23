import { Button, Text } from '@rneui/themed';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import { CheckBox } from 'src/components/ui/CheckBox';
import { RadioButton } from 'src/components/ui/RadioButton';
import { VStack } from 'src/components/ui/VStack';
import { ApproximateRange } from 'src/generated/graphql';
import {
  searchForCoodinate,
  searchForLocations,
} from 'src/nativeModules/localSearch';
import { formatAddress } from 'src/utils';
import { MapInputAndCandidate } from './MapInputAndCandidate';

type Props = RootNavigationScreenProp<'LocationOfQuestionSelection'>;

export const LocationOfQuestionSelectionScreen = ({ navigation }: Props) => {
  const mapRef = useRef<MapView>();
  const [selectedCoodinate, setSelectedCoodinate] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [selectedLocationAddress, setSelectedLocationAddress] = useState('');
  const [displayRange, setDisplayRange] = useState<ApproximateRange>(
    ApproximateRange.Normal
  );
  const [canAnnotatePin, setCanAnnotatePin] = useState(true);
  const [candidateLocations, setCandidateLocations] = useState<
    {
      title: string;
      subtitle: string;
    }[]
  >([]);
  const [mapInputText, setMapInputText] = useState('');
  const [isAnonymity, setIsAnonymity] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '場所の入力',
    });
  }, [navigation]);

  useEffect(() => {
    if (selectedCoodinate) {
      (async () => {
        mapRef.current?.animateToRegion({
          ...selectedCoodinate,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        try {
          const resultJson = await Geocoder.from(
            selectedCoodinate.latitude,
            selectedCoodinate.longitude
          );
          setSelectedLocationAddress(
            formatAddress(resultJson.results[0].formatted_address)
          );
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [selectedCoodinate]);

  const onMapPress = async ({ nativeEvent }: MapPressEvent) => {
    if (!canAnnotatePin) {
      return;
    }

    setSelectedCoodinate(nativeEvent.coordinate);
  };

  const onChangeSearchText = async (text: string) => {
    setMapInputText(text);
    if (!text) {
      setCandidateLocations([]);
      return;
    }

    try {
      const results = await searchForLocations(text);
      setCandidateLocations(
        results.filter((l) => l.subtitle !== '近くを検索').slice(0, 5)
      );
    } catch (e) {
      console.log(e);
    }
  };

  const onCandidateLocationPress = async (index: number) => {
    setCandidateLocations([]);
    setMapInputText('');
    const location = candidateLocations.find((_, i) => i === index);
    if (!location) {
      return;
    }
    try {
      const coodinate = await searchForCoodinate(location.subtitle);
      setSelectedCoodinate(coodinate);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <MapView
            ref={mapRef}
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

          <View
            style={{
              position: 'absolute',
              top: 10,
              width: '96%',
              alignSelf: 'center',
            }}
          >
            <MapInputAndCandidate
              inputText={mapInputText}
              locationTitles={candidateLocations.map((l) => l.title)}
              onChangeText={onChangeSearchText}
              onFocus={() => {
                setCanAnnotatePin(false);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setCanAnnotatePin(true);
                }, 600);
              }}
              onInputClosePress={() => {
                setMapInputText('');
                setCandidateLocations([]);
              }}
              onCandidateLocationPress={onCandidateLocationPress}
            />
          </View>

          <View style={styles.withoutMapContents}>
            <Text style={[styles.askTitle, { marginTop: 14 }]}>
              どの辺にいる人に質問する？
            </Text>
            <Text style={styles.selectedAddress}>
              {!!selectedLocationAddress
                ? selectedLocationAddress
                : 'マップから選択してください🙃'}
            </Text>

            <Text style={[styles.askTitle, { marginTop: 34 }]}>
              そこからどれくらいの範囲にいるユーザーに質問する？
            </Text>

            <VStack
              space={20}
              style={{
                marginTop: 12,
              }}
            >
              <RadioButton
                size={22}
                isSelected={displayRange === ApproximateRange.Wide}
                label="広め"
                onPress={() => {
                  setDisplayRange(ApproximateRange.Wide);
                }}
              />
              <RadioButton
                size={22}
                isSelected={displayRange === ApproximateRange.Normal}
                label="普通"
                onPress={() => {
                  setDisplayRange(ApproximateRange.Normal);
                }}
              />
              <RadioButton
                size={22}
                isSelected={displayRange === ApproximateRange.Near}
                label="すぐ近く"
                onPress={() => {
                  setDisplayRange(ApproximateRange.Near);
                }}
              />
            </VStack>

            <View style={styles.anonymityContainer}>
              <CheckBox
                label="匿名で投稿"
                isChecked={isAnonymity}
                onPress={() => {
                  setIsAnonymity(!isAnonymity);
                }}
              />
            </View>
          </View>
        </ScrollView>

        <Button
          disabled={!selectedCoodinate}
          containerStyle={{
            paddingHorizontal: 16,
          }}
          buttonStyle={{
            height: 48,
          }}
        >
          質問を作成する
        </Button>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 54,
  },
  map: {
    height: 300,
    width: '100%',
  },
  withoutMapContents: {
    paddingHorizontal: 16,
  },
  askTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedAddress: {
    fontSize: 15,
    marginTop: 8,
  },
  anonymityContainer: {
    marginTop: 34,
  },
});
