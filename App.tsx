import React from 'react';
import { ApolloProvider } from 'src/providers/ApolloProvider';
import { NavigationProvider } from 'src/providers/NavigationProvider';
import { Root } from 'src/Root';

export default function App() {
  return (
    <ApolloProvider>
      <NavigationProvider>
        <Root />
      </NavigationProvider>
    </ApolloProvider>
  );
}
