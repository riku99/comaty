import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { Pressable, StyleSheet, TextStyle, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  title: string;
  icon?: JSX.Element;
  onPress?: () => void;
  rightIconVisible?: boolean;
  titleStyle?: TextStyle;
};

export const SimpleListItem = ({
  title,
  icon,
  onPress,
  titleStyle,
  rightIconVisible = true,
}: Props) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: pressed ? theme.gray.pressed : undefined,
            },
          ]}
        >
          <View style={[styles.iconAndTitle]}>
            {icon}
            <Text
              style={[
                styles.title,
                {
                  marginLeft: icon ? 8 : 0,
                },
                titleStyle,
              ]}
            >
              {title}
            </Text>
          </View>

          {rightIconVisible && (
            <FontAwesome
              name="angle-right"
              size={24}
              color={theme.gray.rightIcon}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconAndTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
});
