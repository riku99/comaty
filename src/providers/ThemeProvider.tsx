import {
  createTheme,
  CreateThemeOptions,
  ThemeProvider as ThemeProviderBase,
} from '@rneui/themed';

type Props = {
  children: JSX.Element;
};

const theme: CreateThemeOptions = createTheme({
  Button: {
    buttonStyle: {
      backgroundColor: '#526eff',
      height: 54,
      borderRadius: 6,
    },
    titleStyle: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 18,
    },
    activeOpacity: 1,
  },
});

export const ThemeProvider = ({ children }: Props) => {
  return <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>;
};