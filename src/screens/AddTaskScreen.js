/**
 * AddTaskScreen.js
 * Pantalla para registrar una nueva tarea.
 *
 * Funcionalidades:
 *  - Campo de texto para el título (usando componente AppInput)
 *  - Selector de estado inicial: Pendiente / Completada
 *  - Botón guardar que persiste la tarea en AsyncStorage
 *  - Navegación de regreso al home tras guardar
 *
 * Hooks utilizados: useState
 * Navegación: Stack ← HomeScreen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { loadTasks, saveTasks } from '../storage/taskStorage';

// Estados posibles para una tarea
const STATUS_OPTIONS = ['Pendiente', 'Completada'];

const STATUS_ICONS = {
  Pendiente:  { icon: 'time-outline',     color: '#FFB74D' },
  Completada: { icon: 'checkmark-circle', color: '#66BB6A' },
};

const AddTaskScreen = ({ navigation }) => {
  // Estado local del formulario
  const [title, setTitle]   = useState('');
  const [status, setStatus] = useState('Pendiente');
  const [saving, setSaving] = useState(false);

  /**
   * Guarda la nueva tarea en AsyncStorage y regresa al listado.
   */
  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Campo requerido', 'Por favor ingresa un título para la tarea.');
      return;
    }

    setSaving(true);
    try {
      // Construir el objeto tarea con id único
      const newTask = {
        id: uuidv4(),
        title: title.trim(),
        status,
        createdAt: new Date().toISOString(),
      };

      // Cargar tareas existentes, agregar la nueva y guardar
      const current = await loadTasks();
      const updated = [newTask, ...current];
      await saveTasks(updated);

      // Regresar a la pantalla principal
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la tarea. Intenta nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado visual */}
        <View style={styles.headerCard}>
          <Ionicons name="create-outline" size={40} color="#6C63FF" />
          <Text style={styles.headerTitle}>Nueva Tarea</Text>
          <Text style={styles.headerSub}>Completa los datos de tu nueva tarea</Text>
        </View>

        {/* Campo título */}
        <AppInput
          label="Título de la tarea *"
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Estudiar para el examen"
          maxLength={100}
        />

        {/* Selector de estado */}
        <Text style={styles.selectorLabel}>Estado inicial</Text>
        <View style={styles.statusRow}>
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = status === opt;
            const cfg = STATUS_ICONS[opt];
            return (
              <TouchableOpacity
                key={opt}
                style={[styles.statusOption, isSelected && styles.statusSelected]}
                onPress={() => setStatus(opt)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={cfg.icon}
                  size={22}
                  color={isSelected ? '#FFFFFF' : cfg.color}
                />
                <Text style={[styles.statusOptionText, isSelected && styles.statusSelectedText]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botones de acción */}
        <View style={styles.actions}>
          <AppButton
            title="Guardar tarea"
            onPress={handleSave}
            variant="primary"
            disabled={saving}
            style={styles.saveBtn}
          />
          <AppButton
            title="Cancelar"
            onPress={() => navigation.goBack()}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F4F4FB',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C2C54',
    marginTop: 10,
  },
  headerSub: {
    fontSize: 13,
    color: '#8888A0',
    marginTop: 4,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C54',
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  statusOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8E8EE',
    backgroundColor: '#FFFFFF',
  },
  statusSelected: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#57606F',
  },
  statusSelectedText: {
    color: '#FFFFFF',
  },
  actions: {
    gap: 12,
  },
  saveBtn: {
    marginBottom: 0,
  },
});

export default AddTaskScreen;
