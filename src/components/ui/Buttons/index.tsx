import { Button } from '@rneui/themed';
import { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from 'src/styles';

type Props = ComponentProps<typeof Button>;

export const WhiteButton = ({ ...props }: Props) => {
  const { buttonStyle, ...propsWithoutButtonProps } = props;
  return (
    <Button
      buttonStyle={[styles.button, buttonStyle]}
      titleStyle={{
        color: theme.black,
      }}
      {...propsWithoutButtonProps}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: '#fff',
    borderWidth: 0.7,
    borderColor: '#B5B5B5',
  },
});
