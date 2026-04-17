/**
 * AppNavigator.js
 * Configuración del Stack Navigator de la aplicación.
 *
 * Pantallas registradas:
 *  - Home      → HomeScreen    (listado de tareas)
 *  - AddTask   → AddTaskScreen (agregar nueva tarea)
 *  - Detail    → DetailScreen  (detalle y cambio de estado)
 *
 * El header se personaliza con el color principal de la app (#6C63FF).
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen    from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import DetailScreen  from '../screens/DetailScreen';

const Stack = createStackNavigator();

// Opciones compartidas del header
const headerOptions = {
  headerStyle: {
    backgroundColor: '#6C63FF',
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 18,
  },
  headerBackTitleVisible: false,
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: '📋  Mis Tareas' }}
      />
      <Stack.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={{ title: 'Agregar Tarea' }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detalle de Tarea' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
