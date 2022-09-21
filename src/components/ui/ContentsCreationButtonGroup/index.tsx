import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from 'src/styles';

const CreationButton = ({
  label,
  children,
}: {
  label: string;
  children: JSX.Element;
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button}>{children}</Pressable>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export const ContentsCreationButtonGroup = () => {
  return (
    <View style={styles.body}>
      <CreationButton label="投稿">
        <Ionicons name="create" size={ICON_SIZE} color={theme.secondary} />
      </CreationButton>

      <CreationButton label="ストーリー">
        <MaterialCommunityIcons
          name="star-shooting"
          size={ICON_SIZE}
          color={theme.secondary}
        />
      </CreationButton>

      <CreationButton label="ヘルプ">
        <FontAwesome5
          name="hands-helping"
          size={ICON_SIZE - 4}
          color={theme.secondary}
        />
      </CreationButton>
    </View>
  );
};

const BUTTON_SIZE = 70;
const ICON_SIZE = 28;

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE,
    backgroundColor: '#f1eaf2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
  },
});
