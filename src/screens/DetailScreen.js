/**
 * DetailScreen.js
 * Pantalla de detalle de una tarea seleccionada.
 *
 * Funcionalidades:
 *  - Muestra el título y estado actual de la tarea
 *  - Permite cambiar el estado (Pendiente ↔ Completada)
 *  - Persiste el cambio en AsyncStorage
 *  - Navegación de regreso al listado
 *
 * Hooks utilizados: useState, useEffect
 * Navegación: Stack ← HomeScreen
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppButton from '../components/AppButton';
import { loadTasks, saveTasks } from '../storage/taskStorage';

const STATUS_CONFIG = {
  Pendiente:   { color: '#FFB74D', bg: '#FFF3E0', icon: 'time-outline',     label: 'Pendiente' },
  Completada:  { color: '#66BB6A', bg: '#E8F5E9', icon: 'checkmark-circle', label: 'Completada' },
};

const DetailScreen = ({ route, navigation }) => {
  // Recibe la tarea desde los parámetros de navegación
  const { task: initialTask } = route.params;

  // Estado local de la tarea (para reflejar cambios de estado)
  const [task, setTask] = useState(initialTask);
  const [saving, setSaving] = useState(false);

  const config = STATUS_CONFIG[task.status] || STATUS_CONFIG['Pendiente'];

  /**
   * Configura el título del header según el estado de la tarea.
   */
  useEffect(() => {
    navigation.setOptions({
      title: 'Detalle de Tarea',
    });
  }, [navigation]);

  /**
   * Cambia el estado de la tarea entre Pendiente y Completada,
   * y persiste el cambio en AsyncStorage.
   * @param {string} newStatus - Nuevo estado de la tarea
   */
  const handleChangeStatus = async (newStatus) => {
    if (newStatus === task.status) return;

    setSaving(true);
    try {
      const updatedTask = { ...task, status: newStatus };
      const all = await loadTasks();
      const updated = all.map((t) => (t.id === task.id ? updatedTask : t));
      await saveTasks(updated);
      setTask(updatedTask);

      Alert.alert('Estado actualizado', `La tarea ahora está: ${newStatus}`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la tarea.');
    } finally {
      setSaving(false);
    }
  };

  // Fecha formateada
  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('es-GT', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Ícono de estado grande */}
      <View style={[styles.iconCircle, { backgroundColor: config.bg }]}>
        <Ionicons name={config.icon} size={60} color={config.color} />
      </View>

      {/* Estado actual chip */}
      <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
        <Text style={[styles.statusText, { color: config.color }]}>
          {task.status}
        </Text>
      </View>

      {/* Tarjeta de información */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Título</Text>
        <Text style={styles.title}>{task.title}</Text>

        {formattedDate && (
          <>
            <View style={styles.divider} />
            <Text style={styles.sectionLabel}>Creada el</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </>
        )}

        <View style={styles.divider} />
        <Text style={styles.sectionLabel}>ID de tarea</Text>
        <Text style={styles.idText}>{task.id}</Text>
      </View>

      {/* Sección cambiar estado */}
      <View style={styles.changeCard}>
        <Text style={styles.changeTitle}>Cambiar estado</Text>
        <Text style={styles.changeSub}>Selecciona el nuevo estado de la tarea</Text>

        <View style={styles.statusButtons}>
          <AppButton
            title="⏳  Pendiente"
            onPress={() => handleChangeStatus('Pendiente')}
            variant={task.status === 'Pendiente' ? 'secondary' : 'primary'}
            style={styles.statusBtn}
            disabled={saving || task.status === 'Pendiente'}
          />
          <AppButton
            title="✅  Completada"
            onPress={() => handleChangeStatus('Completada')}
            variant={task.status === 'Completada' ? 'secondary' : 'success'}
            style={styles.statusBtn}
            disabled={saving || task.status === 'Completada'}
          />
        </View>
      </View>

      {/* Botón regresar */}
      <AppButton
        title="← Regresar al listado"
        onPress={() => navigation.goBack()}
        variant="secondary"
        style={styles.backBtn}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4FB',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ADADB8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C54',
    lineHeight: 28,
  },
  dateText: {
    fontSize: 14,
    color: '#57606F',
  },
  idText: {
    fontSize: 11,
    color: '#ADADB8',
    fontFamily: 'monospace',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginVertical: 14,
  },
  changeCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  changeTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C2C54',
    marginBottom: 4,
  },
  changeSub: {
    fontSize: 13,
    color: '#8888A0',
    marginBottom: 18,
  },
  statusButtons: {
    gap: 12,
  },
  statusBtn: {
    marginBottom: 0,
  },
  backBtn: {
    width: '100%',
  },
});

export default DetailScreen;
