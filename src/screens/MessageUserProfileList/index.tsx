import { StyleSheet, View } from 'react-native';

type Props = RootNavigationScreenProp<'MessageUserProfileList'>;

export const MessageUserProfileListScreen = ({ route }: Props) => {
  const { ids } = route.params;

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
