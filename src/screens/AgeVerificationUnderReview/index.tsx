import { Text } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Card from 'src/assets/svg/professional-card.svg';

type Props = RootNavigationScreenProp<'AgeVerificationUnderReview'>;

export const AgeVerificationUnderReviewScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Card
        width={200}
        height={200}
        style={{
          alignSelf: 'center',
        }}
      />
      <Text style={styles.confirmText}>確認中です。</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  confirmText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 20,
  },
});
