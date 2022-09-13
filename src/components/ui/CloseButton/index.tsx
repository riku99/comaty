import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { theme } from 'src/styles';

export const CloseButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name="close" size={28} color={theme.black} />
    </Pressable>
  );
};
