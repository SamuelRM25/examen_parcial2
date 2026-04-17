/**
 * EmptyState.js
 * Componente reutilizable para mostrar un estado vacío cuando no hay tareas.
 * Props:
 *   - message: mensaje a mostrar
 *   - subMessage: mensaje secundario opcional
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyState = ({
  message = 'No hay tareas',
  subMessage = 'Presiona el botón "+" para agregar una nueva tarea.',
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-done-circle-outline" size={80} color="#D0CEEC" />
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subMessage}>{subMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  message: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C54',
    marginTop: 16,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: 14,
    color: '#8888A0',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default EmptyState;
