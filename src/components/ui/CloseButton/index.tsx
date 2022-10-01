import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  color?: string;
};

export const CloseButton = ({ color = theme.black }: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name="close" size={28} color={color} />
    </Pressable>
  );
};
