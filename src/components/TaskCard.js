/**
 * TaskCard.js
 * Componente reutilizable que representa una tarea individual en el listado.
 * Muestra el título, el estado con color y botones de acción.
 * Props:
 *   - task: objeto tarea { id, title, status }
 *   - onPress: función al presionar la tarjeta (navega al detalle)
 *   - onDelete: función para eliminar la tarea
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const STATUS_CONFIG = {
  Pendiente:   { color: '#FFB74D', icon: 'time-outline',        bg: '#FFF3E0' },
  Completada:  { color: '#66BB6A', icon: 'checkmark-circle',    bg: '#E8F5E9' },
};

const TaskCard = ({ task, onPress, onDelete }) => {
  const config = STATUS_CONFIG[task.status] || STATUS_CONFIG['Pendiente'];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Franja lateral de color según estado */}
      <View style={[styles.stripe, { backgroundColor: config.color }]} />

      {/* Contenido principal */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{task.title}</Text>

        {/* Chip de estado */}
        <View style={[styles.statusChip, { backgroundColor: config.bg }]}>
          <Ionicons name={config.icon} size={14} color={config.color} />
          <Text style={[styles.statusText, { color: config.color }]}>{task.status}</Text>
        </View>
      </View>

      {/* Botón eliminar */}
      <TouchableOpacity style={styles.deleteBtn} onPress={onDelete} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Ionicons name="trash-outline" size={22} color="#FF4757" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    alignItems: 'center',
    minHeight: 72,
  },
  stripe: {
    width: 6,
    alignSelf: 'stretch',
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C54',
    marginBottom: 6,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  deleteBtn: {
    paddingHorizontal: 14,
  },
});

export default TaskCard;
