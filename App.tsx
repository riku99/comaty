import React from 'react';
import { ApolloProvider } from 'src/providers/ApolloProvider';
import { NavigationProvider } from 'src/providers/NavigationProvider';
import { ThemeProvider } from 'src/providers/ThemeProvider';
import { Root } from 'src/Root';

export default function App() {
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
