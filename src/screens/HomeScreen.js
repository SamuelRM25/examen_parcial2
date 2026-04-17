/**
 * HomeScreen.js
 * Pantalla principal que muestra el listado de todas las tareas.
 *
 * Funcionalidades:
 *  - Carga tareas desde AsyncStorage al montar (useEffect)
 *  - Muestra la lista en tarjetas con título y estado
 *  - Permite navegar al detalle de cada tarea
 *  - Permite eliminar una tarea con confirmación
 *  - Botón flotante para agregar nueva tarea
 *
 * Hooks utilizados: useState, useEffect
 * Navegación: Stack → AddTaskScreen, DetailScreen
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { loadTasks, saveTasks } from '../storage/taskStorage';

const HomeScreen = ({ navigation }) => {
  // Estado: lista de tareas
  const [tasks, setTasks] = useState([]);

  /**
   * Carga las tareas cada vez que la pantalla recibe el foco.
   * Esto garantiza que la lista se actualice al volver de AddTask o Detail.
   */
  useFocusEffect(
    useCallback(() => {
      const fetchTasks = async () => {
        const stored = await loadTasks();
        setTasks(stored);
      };
      fetchTasks();
    }, [])
  );

  /**
   * Configura el header de la pantalla con el botón de agregar.
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.navigate('AddTask', { onTaskAdded: refreshTasks })}
        >
          <Ionicons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  /**
   * Recarga las tareas desde storage.
   */
  const refreshTasks = async () => {
    const stored = await loadTasks();
    setTasks(stored);
  };

  /**
   * Elimina una tarea por id, previa confirmación del usuario.
   * @param {string} id - ID de la tarea a eliminar
   */
  const handleDelete = (id) => {
    Alert.alert(
      'Eliminar tarea',
      '¿Estás seguro de que deseas eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const updated = tasks.filter((t) => t.id !== id);
            setTasks(updated);
            await saveTasks(updated);
          },
        },
      ]
    );
  };

  /**
   * Navega a la pantalla de detalle de la tarea seleccionada.
   * @param {Object} task - Tarea seleccionada
   */
  const handlePress = (task) => {
    navigation.navigate('Detail', { task });
  };

  // Render de cada ítem de la lista
  const renderItem = ({ item }) => (
    <TaskCard
      task={item}
      onPress={() => handlePress(item)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />

      {/* Contador de tareas */}
      <View style={styles.statsRow}>
        <View style={styles.statChip}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={styles.statNumber}>
            {tasks.filter((t) => t.status === 'Pendiente').length}
          </Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
        <View style={styles.statChip}>
          <Text style={styles.statNumber}>
            {tasks.filter((t) => t.status === 'Completada').length}
          </Text>
          <Text style={styles.statLabel}>Completadas</Text>
        </View>
      </View>

      {/* Lista de tareas */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Botón flotante agregar */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4FB',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingBottom: 22,
  },
  statChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginTop: 2,
  },
  listContainer: {
    paddingTop: 12,
    paddingBottom: 90,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  headerBtn: {
    marginRight: 16,
    padding: 4,
  },
});

export default HomeScreen;
