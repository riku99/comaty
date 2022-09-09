import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  containerStyle: ViewStyle;
};

export const BackButton = ({ containerStyle }: Props) => {
  const navigation = useNavigation<RootNavigationProp<any>>();

  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View style={containerStyle}>
      <Pressable style={styles.backButton} onPress={onPress}>
        <AntDesign name="arrowleft" size={22} color={theme.secondary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#f1eaf2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
