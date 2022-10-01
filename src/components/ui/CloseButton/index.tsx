import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  color?: string;
  size?: number;
};

export const CloseButton = ({ color = theme.black, size = 28 }: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Ionicons name="close" size={size} color={color} />
    </Pressable>
  );
};
