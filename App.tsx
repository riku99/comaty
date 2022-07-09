import React from 'react';
import Config from 'react-native-config';
import { ApolloProvider } from 'src/providers/ApolloProvider';
import { NavigationProvider } from 'src/providers/NavigationProvider';
import { ThemeProvider } from 'src/providers/ThemeProvider';
import { Root } from 'src/Root';

export default function App() {
  console.log('🌟 ENV is ' + Config.ENV);
  return (
    <ApolloProvider>
      <ThemeProvider>
        <NavigationProvider>
          <Root />
        </NavigationProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
