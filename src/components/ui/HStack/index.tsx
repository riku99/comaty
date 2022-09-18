import React, { ComponentProps } from 'react';
import { View } from 'react-native';

type Props = {
  space?: number;
  children: JSX.Element | JSX.Element[];
} & ComponentProps<typeof View>;

export const HStack = ({ children, space = 0, ...props }: Props) => {
  const { style, ...withoutStyleProps } = props;
  return (
    <View
      style={[{ flexDirection: 'row', alignItems: 'center' }, style]}
      {...withoutStyleProps}
    >
      {Array.isArray(children)
        ? children.map((c, index) => (
            <View
              key={index}
              style={index === 0 ? undefined : { marginLeft: space }}
            >
              {c}
            </View>
          ))
        : children}
    </View>
  );
};
