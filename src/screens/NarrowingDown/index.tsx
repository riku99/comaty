import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Button, Text } from '@rneui/themed';
import { useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckBox } from 'src/components/ui/CheckBox';
import { RadioButton } from 'src/components/ui/RadioButton';
import {
  ApproximateRange,
  Sex,
  useUpdateDisplayTargetSexMutation
} from 'src/generated/graphql';
import { useNarrowingDownConditions } from 'src/hooks/app/useNarrowingDownConditions';
import { theme } from 'src/styles';

type Props = RootNavigationScreenProp<'NarrowingDown'>;

export const NarrowingDownScreen = ({ navigation }: Props) => {
  const { bottom: safeAreaBottom } = useSafeAreaInsets();
  const [scrollEnabeld, setScrollEnabled] = useState(true);
  const { narrowingDownCinditions, setNarrowingDownConditions } =
    useNarrowingDownConditions();
  const [updateDisplayTargetSexMutation] = useUpdateDisplayTargetSexMutation();

  const [sex, setSex] = useState(narrowingDownCinditions.sex);
  const [range, setRange] = useState(narrowingDownCinditions.range);
  const [minAge, setMinAge] = useState(narrowingDownCinditions.minAge);
  const [maxAge, setMaxAge] = useState(narrowingDownCinditions.maxAge);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      title: '絞り込み条件',
    });
  }, [navigation]);

  const onApplyButtonPress = async () => {
    setNarrowingDownConditions({
      sex,
      range,
      minAge,
      maxAge,
    });
    navigation.goBack();
    await updateDisplayTargetSexMutation({
      variables: {
        input: {
          sex: sex ?? null,
        },
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContaienr} scrollEnabled={scrollEnabeld}>
        <View>
          <Text style={styles.sectionTitle}>範囲</Text>

          <Pressable
            style={styles.sexItemContainer}
            onPress={() => {
              setRange(ApproximateRange.Near);
            }}
          >
            <Text style={styles.sexTitle}>すぐ近く</Text>
            <RadioButton
              isSelected={range === ApproximateRange.Near}
              size={24}
            />
          </Pressable>

          <View style={styles.sexItemBorder} />

          <Pressable
            style={styles.sexItemContainer}
            onPress={() => {
              setRange(ApproximateRange.Normal);
            }}
          >
            <Text style={styles.sexTitle}>普通</Text>
            <RadioButton
              isSelected={range === ApproximateRange.Normal}
              size={24}
            />
          </Pressable>

          <Pressable
            style={styles.sexItemContainer}
            onPress={() => {
              setRange(ApproximateRange.Wide);
            }}
          >
            <Text style={styles.sexTitle}>広め</Text>
            <RadioButton
              isSelected={range === ApproximateRange.Wide}
              size={24}
            />
          </Pressable>
        </View>

        <View
          style={{
            marginTop: 38,
          }}
        >
          <Text style={styles.sectionTitle}>表示したいユーザーの性別</Text>

          <Pressable
            style={styles.sexItemContainer}
            onPress={() => {
              setSex(undefined);
            }}
          >
            <Text style={styles.sexTitle}>みんな</Text>
            <RadioButton isSelected={!sex} size={24} />
          </Pressable>

          <View style={styles.sexItemBorder} />

          <Pressable
            style={styles.sexItemContainer}
            onPress={() => {
              setSex(Sex.Female);
            }}
          >
            <Text style={styles.sexTitle}>女性</Text>
            <RadioButton isSelected={sex === Sex.Female} size={24} />
          </Pressable>

          <View style={styles.sexItemBorder} />

          <Pressable
            style={styles.sexItemContainer}
            onPress={() => {
              setSex(Sex.Male);
            }}
          >
            <Text style={styles.sexTitle}>男性</Text>
            <RadioButton isSelected={sex === Sex.Male} size={24} />
          </Pressable>

          <Text
            style={{
              fontSize: 12,
              color: theme.gray.text,
              marginTop: 6,
            }}
          >
            あなたも選択した性別のユーザーだけに表示されるようになります。
          </Text>
        </View>

        <View
          style={{
            marginTop: 38,
          }}
        >
          <Text style={styles.sectionTitle}>
            一緒にいる人の人数(複数選択可能)
          </Text>
          <Pressable
            style={[styles.sexItemContainer, styles.checkBoxItem]}
            onPress={() => {
              console.log('One');
            }}
          >
            <Text style={styles.sexTitle}>1人</Text>
            <CheckBox isChecked={true} size={24} pointerEvents="none" />
          </Pressable>

          <Pressable
            style={[styles.sexItemContainer, styles.checkBoxItem]}
            onPress={() => {}}
          >
            <Text style={styles.sexTitle}>2人</Text>
            <CheckBox isChecked={true} size={24} />
          </Pressable>

          <Pressable
            style={[styles.sexItemContainer, styles.checkBoxItem]}
            onPress={() => {}}
          >
            <Text style={styles.sexTitle}>3人</Text>
            <CheckBox isChecked={false} size={24} />
          </Pressable>

          <Pressable
            style={[styles.sexItemContainer, styles.checkBoxItem]}
            onPress={() => {}}
          >
            <Text style={styles.sexTitle}>4人以上</Text>
            <CheckBox isChecked={false} size={24} />
          </Pressable>
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
              {`${minAge}-${maxAge}`}
            </Text>
          </View>
          <View style={styles.sliderContainer}>
            <MultiSlider
              onValuesChangeStart={() => {
                setScrollEnabled(false);
              }}
              onValuesChangeFinish={() => {
                setScrollEnabled(true);
              }}
              sliderLength={screenWidth - 40}
              values={[minAge, maxAge]}
              min={18}
              max={60}
              selectedStyle={{
                backgroundColor: theme.primary,
              }}
              onValuesChange={(values) => {
                setMinAge(values[0]);
                setMaxAge(values[1]);
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
        onPress={onApplyButtonPress}
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
    paddingHorizontal: 20,
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
  checkBoxItem: { paddingRight: 4 },
  sexTitle: {
    fontSize: 18,
  },
  sexItemBorder: {
    height: 0.5,
    backgroundColor: theme.gray.boarder,
  },
  sliderContainer: {
    alignSelf: 'center',
    marginTop: 12,
    height: 120,
  },
});
