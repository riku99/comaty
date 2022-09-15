import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  onPress: () => void;
  disable?: boolean;
  title: string;
};

export const HeaderRightCreationButton = ({
  onPress,
  title,
  disable = false,
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      <Text
        style={[
          styles.postText,
          {
            color: disable ? theme.gray.disable : theme.creationBule,
          },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  postText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#29b0ff',
  },
});
