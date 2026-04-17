/**
 * taskStorage.js
 * Módulo de persistencia local usando AsyncStorage.
 * Proporciona funciones para cargar y guardar tareas.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todo_tasks';

/**
 * Carga las tareas almacenadas localmente.
 * @returns {Promise<Array>} Lista de tareas o arreglo vacío si no hay datos.
 */
export const loadTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error al cargar tareas:', error);
    return [];
  }
};

/**
 * Guarda las tareas en almacenamiento local.
 * @param {Array} tasks - Lista de tareas a persistir.
 */
export const saveTasks = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error al guardar tareas:', error);
  }
};
