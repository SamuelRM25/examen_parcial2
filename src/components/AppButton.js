/**
 * AppButton.js
 * Componente reutilizable de botón con variantes de estilo.
 * Props:
 *   - title: texto del botón
 *   - onPress: función al presionar
 *   - variant: 'primary' | 'danger' | 'secondary' | 'success'
 *   - style: estilos adicionales opcionales
 *   - disabled: deshabilitar el botón
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AppButton = ({ title, onPress, variant = 'primary', style, disabled = false }) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'danger':   return styles.danger;
      case 'secondary': return styles.secondary;
      case 'success':  return styles.success;
      default:         return styles.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primary: {
    backgroundColor: '#6C63FF',
  },
  danger: {
    backgroundColor: '#FF4757',
  },
  secondary: {
    backgroundColor: '#57606F',
  },
  success: {
    backgroundColor: '#2ED573',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;
