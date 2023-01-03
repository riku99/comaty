import { Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';
import { PlanCard } from './PlanCard';
import { TopMessage } from './TopMessage';

type Props = RootNavigationScreenProp<'PlanSelection'>;

export const PlanSelectionScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TopMessage />

        <View style={styles.planContainer}>
          <Text style={styles.plusPlan}>プラスプラン</Text>
          <View style={styles.planCardContainer}>
            <PlanCard
              period="1ヶ月"
              price="￥1,500"
              message="たくさん使いたいあなたへ"
            />

            <PlanCard
              period="1日"
              price="￥200"
              message="今日をもっと素敵な日にしよう"
              containerStyle={{
                marginTop: 24,
              }}
              priceLabelColor="#c0aed4"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topTitle: {
    marginTop: 32,
  },
  planContainer: {
    marginTop: 34,
  },
  plusPlan: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  planCardContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  planCard: {
    height: 94,
    borderRadius: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  cardLeft: {
    height: '100%',
    width: '28%',
    backgroundColor: theme.primary,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLeftPeriodText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  cardRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '66%',
    height: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardRightPriceText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  cardRightMessage: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 4,
    color: theme.gray.text,
  },
});
