import { FontAwesome } from '@expo/vector-icons';
import { Text } from '@rneui/themed';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, TextStyle, View } from 'react-native';
import { theme } from 'src/styles';

type Props = {
  title: string;
  icon?: JSX.Element;
  rightIconVisible?: boolean;
  titleStyle?: TextStyle;
} & ComponentProps<typeof Pressable>;

export const SimpleListItem = ({
  title,
  icon,
  titleStyle,
  rightIconVisible = true,
  ...pressableProps
}: Props) => {
  return (
    <Pressable {...pressableProps}>
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
