import React from 'react';
import { NavigationProvider } from 'src/providers/NavigationProvider';
import { Root } from 'src/Root';

export default function App() {
  return (
    <NavigationProvider>
      <Root />
    </NavigationProvider>
  );
}
