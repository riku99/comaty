import { MenuAction, MenuView } from '@react-native-menu/menu';

const menuActions: MenuAction[] = [];

type Props = {
  children: JSX.Element;
  onPressAction: () => {};
};

export const DotsMenu = ({ children }: Props) => {
  <>
    {/* @ts-ignore https://github.com/react-native-menu/menu/pull/416  */}
    <MenuView actions={menuActions} onPressAction={({ nativeEvent }) => {}}>
      {children}
    </MenuView>
  </>;
};
