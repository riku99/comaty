import { Text } from '@rneui/themed';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  period: string;
  price: string;
  message?: string;
  containerStyle?: StyleProp<ViewStyle>;
  priceLabelColor?: string;
};

export const PlanCard = ({
  period,
  price,
  message,
  containerStyle,
  priceLabelColor,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.planCard}>
        <View
          style={[
            styles.cardLeft,
            { backgroundColor: priceLabelColor ?? theme.primary },
          ]}
        >
          <Text style={styles.cardLeftPeriodText}>{period}</Text>
        </View>

        <View style={styles.cardRight}>
          <Text style={styles.cardRightPriceText}>{price}</Text>
          {!!message && <Text style={styles.cardRightMessage}>{message}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
    width: '68%',
    height: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardRightPriceText: {
    fontWeight: 'bold',
    fontSize: 26,
  },
  cardRightMessage: {
    fontWeight: 'bold',
    fontSize: 11,
    marginTop: 4,
    color: theme.gray.text,
  },
});
