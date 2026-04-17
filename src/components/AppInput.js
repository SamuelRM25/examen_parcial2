/**
 * AppInput.js
 * Componente reutilizable de campo de texto.
 * Props:
 *   - label: etiqueta del campo
 *   - value: valor controlado
 *   - onChangeText: callback de cambio
 *   - placeholder: texto de referencia
 *   - multiline: si es multilínea
 *   - maxLength: longitud máxima
 *   - style: estilos adicionales
 */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const AppInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  maxLength,
  style,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multiline,
          focused && styles.focused,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#ADADB8"
        multiline={multiline}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {maxLength && (
        <Text style={styles.counter}>{value.length}/{maxLength}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C54',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E8E8EE',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#2C2C54',
    backgroundColor: '#F9F9FB',
  },
  focused: {
    borderColor: '#6C63FF',
    backgroundColor: '#FFFFFF',
  },
  multiline: {
    minHeight: 100,
    paddingTop: 13,
  },
  counter: {
    textAlign: 'right',
    fontSize: 11,
    color: '#ADADB8',
    marginTop: 4,
  },
});

export default AppInput;
