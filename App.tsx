import React from 'react';
import { StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { ApolloProvider } from 'src/providers/ApolloProvider';
import { NavigationProvider } from 'src/providers/NavigationProvider';
import { ThemeProvider } from 'src/providers/ThemeProvider';
import { ToastProvider } from 'src/providers/ToastProvider';
import { Root } from 'src/Root';

export default function App() {
  console.log('🌟 ENV is ' + Config.ENV);
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <ToastProvider>
        <ApolloProvider>
          <ThemeProvider>
            <NavigationProvider>
              <Root />
            </NavigationProvider>
          </ThemeProvider>
        </ApolloProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
