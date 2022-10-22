import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Button, Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RadioButton } from 'src/components/ui/RadioButton';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'NarrowingDown'>;

export const NarrowingDownScreen = ({ navigation }: Props) => {
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [scrollEnabeld, setScrollEnabled] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      title: '絞り込み条件',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContaienr} scrollEnabled={scrollEnabeld}>
        <View>
          <Text style={styles.sectionTitle}>範囲</Text>

          <View style={styles.sexItemContainer}>
            <Text style={styles.sexTitle}>近く</Text>
            <RadioButton isSelected={true} size={24} />
          </View>

          <View style={styles.sexItemBorder} />

          <View style={styles.sexItemContainer}>
            <Text style={styles.sexTitle}>普通</Text>
            <RadioButton isSelected={false} size={24} />
          </View>
        </View>

        <View
          style={{
            marginTop: 38,
          }}
        >
          <Text style={styles.sectionTitle}>表示したいユーザーの性別</Text>

          <View style={styles.sexItemContainer}>
            <Text style={styles.sexTitle}>みんな</Text>
            <RadioButton isSelected={true} size={24} />
          </View>

          <View style={styles.sexItemBorder} />

          <View style={styles.sexItemContainer}>
            <Text style={styles.sexTitle}>女性</Text>
            <RadioButton isSelected={false} size={24} />
          </View>

          <View style={styles.sexItemBorder} />

          <View style={styles.sexItemContainer}>
            <Text style={styles.sexTitle}>男性</Text>
            <RadioButton isSelected={false} size={24} />
          </View>
        </View>

        <View
          style={{
            marginTop: 38,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.sectionTitle}>年齢</Text>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              18-26
            </Text>
          </View>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 12,
            }}
          >
            <MultiSlider
              onValuesChangeStart={() => {
                setScrollEnabled(false);
              }}
              onValuesChangeFinish={() => {
                setScrollEnabled(true);
              }}
              sliderLength={screenWidth - 40}
              values={[18, 30]}
              min={18}
              max={60}
              selectedStyle={{
                backgroundColor: theme.primary,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        title="条件を適用"
        containerStyle={{
          paddingHorizontal: 16,
          backgroundColor: '#fff',
          bottom: safeAreaBottom > 0 ? 0 : 12,
        }}
      />
    </SafeAreaView>
  );
};

const { width: screenWidth } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContaienr: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    color: theme.gray.text,
  },
  sexItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  sexTitle: {
    fontSize: 18,
  },
  sexItemBorder: {
    height: 0.5,
    backgroundColor: theme.gray.boarder,
  },
});
