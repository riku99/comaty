import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { CloseButton } from 'src/components/ui/CloseButton';

type Props = RootNavigationScreenProp<'QuestionCreation'>;

export const QuestionCreationScreen = ({ navigation }: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CloseButton />,
    });
  }, [navigation]);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
