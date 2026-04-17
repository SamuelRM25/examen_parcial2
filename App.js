/**
 * App.js
 * Punto de entrada principal de la aplicación TODO List.
 *
 * Configura:
 *  - react-native-get-random-values (requerido por uuid)
 *  - NavigationContainer de React Navigation
 *  - GestureHandlerRootView requerido por @react-navigation/stack
 *  - SafeAreaProvider para dispositivos con notch
 *  - AppNavigator que define el Stack de pantallas
 */

import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
