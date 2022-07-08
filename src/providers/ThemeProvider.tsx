import {
  createTheme,
  CreateThemeOptions,
  ThemeProvider as ThemeProviderBase,
} from '@rneui/themed';
import { theme as themeColor } from 'src/styles';

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
  Input: {
    containerStyle: {
      paddingHorizontal: 0,
    },
  },
  Text: {
    h2Style: {
      fontWeight: 'bold',
      color: themeColor.secondary,
      fontSize: 26,
    },
  },
  lightColors: {
    primary: '#526eff',
    black: '#262626',
    secondary: '#0f1d61',
  },
});

export const ThemeProvider = ({ children }: Props) => {
  return <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>;
};
