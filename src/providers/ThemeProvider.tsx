import {
  createTheme,
  CreateThemeOptions,
  ThemeProvider as ThemeProviderBase
} from '@rneui/themed';
import { theme as themeColor } from 'src/styles';

type Props = {
  children: JSX.Element;
};

const theme: CreateThemeOptions = createTheme({
  components: {
    Button: {
      buttonStyle: {
        backgroundColor: themeColor.primary,
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
      style: {
        color: themeColor.black,
      },
      h2Style: {
        fontWeight: 'bold',
        color: themeColor.secondary,
        fontSize: 26,
      },
    },
  }
});

export const ThemeProvider = ({ children }: Props) => {
  return <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>;
};
