import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, View } from 'react-native';
import { useContentsCreationVisible } from 'src/hooks/appVisible';
import { theme } from 'src/styles';

const CreationButton = ({
  label,
  children,
  onPress,
}: {
  label: string;
  children: JSX.Element;
  onPress: () => void;
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        {children}
      </Pressable>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export const ContentsCreationButtonGroup = () => {
  const navigation = useNavigation<RootNavigationProp<any>>();
  const { setContentsCreationModalVisible } = useContentsCreationVisible();

  return (
    <View style={styles.body}>
      <CreationButton
        label="投稿"
        onPress={() => {
          navigation.navigate('PostCreation');
          setContentsCreationModalVisible(false);
        }}
      >
        <Ionicons name="create" size={ICON_SIZE} color={theme.secondary} />
      </CreationButton>

      <CreationButton
        label="ストーリー"
        onPress={() => {
          navigation.navigate('TakeStory');
          setContentsCreationModalVisible(false);
        }}
      >
        <MaterialCommunityIcons
          name="star-shooting"
          size={ICON_SIZE}
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
    justifyContent: 'space-around',
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
