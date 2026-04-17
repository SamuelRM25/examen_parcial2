# 📄 Documentación Técnica — TODO List

## 1. Descripción General del Proyecto

**TODO List** es una aplicación móvil desarrollada con **React Native** y **Expo** (SDK 51+). Su objetivo es permitir al usuario gestionar tareas pendientes de forma local, demostrando el uso de los conceptos fundamentales de desarrollo móvil vistos en clase.

### Tecnologías utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| React Native | 0.74+ | Framework base para desarrollo móvil |
| Expo | SDK 51 | Entorno de desarrollo y tools |
| React Navigation (Stack) | 6.x | Navegación entre pantallas |
| AsyncStorage | 1.x | Persistencia local de datos |
| Expo Vector Icons | 14.x | Íconos visuales (Ionicons) |
| UUID | 9.x | Generación de IDs únicos |

---

## 2. Estructura del Proyecto

```
examen_parcial2/
├── App.js                          # Punto de entrada de la app
├── app.json                        # Configuración de Expo
├── index.js                        # Registro del componente raíz
├── package.json                    # Dependencias del proyecto
├── src/
│   ├── components/                 # Componentes reutilizables
│   │   ├── AppButton.js
│   │   ├── AppInput.js
│   │   ├── TaskCard.js
│   │   └── EmptyState.js
│   ├── navigation/
│   │   └── AppNavigator.js         # Stack Navigator
│   ├── screens/                    # Pantallas de la aplicación
│   │   ├── HomeScreen.js
│   │   ├── AddTaskScreen.js
│   │   └── DetailScreen.js
│   └── storage/
│       └── taskStorage.js          # Módulo de persistencia
├── README.md
├── manual_usuario.md
└── documentacion_tecnica.md
```

---

## 3. Pantallas de la Aplicación

### 3.1 HomeScreen (`src/screens/HomeScreen.js`)

**Propósito:** Pantalla principal; muestra el listado completo de tareas.

**Funcionalidades:**
- Carga las tareas desde AsyncStorage al enfocar la pantalla (`useFocusEffect`)
- Muestra contadores de tareas totales, pendientes y completadas
- Renderiza cada tarea en un componente `TaskCard`
- Elimina tareas con confirmación mediante `Alert`
- Botón flotante (FAB) y botón en header para navegar a `AddTaskScreen`
- Estado vacío con `EmptyState` cuando no hay tareas

**Hooks utilizados:**
- `useState`: manejo de la lista de tareas
- `useEffect`: configurar el botón del header
- `useFocusEffect`: recargar tareas al volver de otras pantallas
- `useCallback`: optimización del efecto de foco

---

### 3.2 AddTaskScreen (`src/screens/AddTaskScreen.js`)

**Propósito:** Formulario para registrar una nueva tarea.

**Funcionalidades:**
- Campo de texto con `AppInput` para el título de la tarea (máx. 100 caracteres)
- Selector visual de estado inicial: Pendiente / Completada
- Generación de ID único con `uuid` (`uuidv4`)
- Guarda la tarea en `AsyncStorage` y regresa al listado
- `KeyboardAvoidingView` para evitar que el teclado tape los campos

**Hooks utilizados:**
- `useState`: título, estado seleccionado, flag de guardado

**Modelo de datos creado:**
```json
{
  "id": "uuid-v4-único",
  "title": "Título de la tarea",
  "status": "Pendiente | Completada",
  "createdAt": "ISO 8601 timestamp"
}
```

---

### 3.3 DetailScreen (`src/screens/DetailScreen.js`)

**Propósito:** Muestra el detalle de una tarea y permite cambiar su estado.

**Funcionalidades:**
- Recibe la tarea como parámetro de navegación (`route.params`)
- Muestra título, estado (con ícono y color), fecha de creación e ID
- Botones para cambiar estado a Pendiente o Completada
- Persiste el cambio en AsyncStorage y actualiza la vista local

**Hooks utilizados:**
- `useState`: estado local de la tarea
- `useEffect`: configurar el título del header

---

## 4. Componentes Reutilizables

### 4.1 AppButton (`src/components/AppButton.js`)

Botón personalizado con cuatro variantes de estilo.

| Prop | Tipo | Descripción |
|---|---|---|
| `title` | `string` | Texto del botón |
| `onPress` | `function` | Callback al presionar |
| `variant` | `string` | `primary`, `secondary`, `danger`, `success` |
| `disabled` | `boolean` | Deshabilita el botón |
| `style` | `object` | Estilos adicionales |

**Reutilización:** Se usa en `AddTaskScreen`, `DetailScreen`.

---

### 4.2 TaskCard (`src/components/TaskCard.js`)

Tarjeta visual para representar una tarea en el listado.

| Prop | Tipo | Descripción |
|---|---|---|
| `task` | `object` | Objeto tarea `{ id, title, status }` |
| `onPress` | `function` | Al tocar la tarjeta (navega al detalle) |
| `onDelete` | `function` | Al presionar el ícono de eliminar |

**Reutilización:** Se usa en `HomeScreen` para cada elemento de la `FlatList`.

---

### 4.3 AppInput (`src/components/AppInput.js`)

Campo de texto reutilizable con efecto de foco y contador de caracteres.

| Prop | Tipo | Descripción |
|---|---|---|
| `label` | `string` | Etiqueta del campo |
| `value` | `string` | Valor controlado |
| `onChangeText` | `function` | Callback de cambio |
| `placeholder` | `string` | Texto de referencia |
| `multiline` | `boolean` | Si acepta múltiples líneas |
| `maxLength` | `number` | Longitud máxima con contador |

**Reutilización:** Se usa en `AddTaskScreen`.

---

### 4.4 EmptyState (`src/components/EmptyState.js`)

Componente visual para el estado vacío de la lista.

| Prop | Tipo | Descripción |
|---|---|---|
| `message` | `string` | Mensaje principal |
| `subMessage` | `string` | Mensaje secundario |

**Reutilización:** Se usa en `HomeScreen`.

---

## 5. Persistencia Local (AsyncStorage)

### Módulo: `src/storage/taskStorage.js`

La persistencia se implementa con `@react-native-async-storage/async-storage`. Los datos se almacenan en formato JSON bajo la clave `@todo_tasks`.

```javascript
const STORAGE_KEY = '@todo_tasks';

// Cargar tareas
export const loadTasks = async () => {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
};

// Guardar tareas
export const saveTasks = async (tasks) => {
  const jsonValue = JSON.stringify(tasks);
  await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
};
```

### Cuándo se usa:

| Acción | Operación |
|---|---|
| Abrir la app / regresar al listado | `loadTasks()` – lectura |
| Agregar nueva tarea | `saveTasks(updatedArray)` – escritura |
| Cambiar estado de tarea | `saveTasks(updatedArray)` – escritura |
| Eliminar tarea | `saveTasks(filteredArray)` – escritura |

---

## 6. Flujo de Navegación

```
App.js
  └── NavigationContainer
        └── Stack.Navigator (AppNavigator)
              ├── Stack.Screen "Home"    → HomeScreen
              ├── Stack.Screen "AddTask" → AddTaskScreen
              └── Stack.Screen "Detail"  → DetailScreen
```

### Rutas de navegación

| Origen | Destino | Disparador |
|---|---|---|
| HomeScreen | AddTaskScreen | Botón FAB o botón header "+" |
| HomeScreen | DetailScreen | Tocar una `TaskCard` |
| AddTaskScreen | HomeScreen | `navigation.goBack()` tras guardar o cancelar |
| DetailScreen | HomeScreen | `navigation.goBack()` o botón regresar |

---

## 7. Hooks Utilizados

| Hook | Archivo | Propósito |
|---|---|---|
| `useState` | `HomeScreen.js` | Lista de tareas |
| `useState` | `AddTaskScreen.js` | Título, estado, loading |
| `useState` | `DetailScreen.js` | Estado actual de la tarea |
| `useEffect` | `HomeScreen.js` | Configurar botón del header |
| `useEffect` | `DetailScreen.js` | Inicializar el header |
| `useFocusEffect` | `HomeScreen.js` | Recargar tareas al enfocar pantalla |
| `useCallback` | `HomeScreen.js` | Optimización de `useFocusEffect` |

---

## 8. Props Utilizadas

En todos los componentes reutilizables (`AppButton`, `TaskCard`, `AppInput`, `EmptyState`) se comunica información a través de **props**, siguiendo el patrón de componentes controlados de React.

---

## 9. Modelo de Datos

```typescript
interface Task {
  id: string;       // UUID v4 único
  title: string;    // Título de la tarea (máx. 100 chars)
  status: 'Pendiente' | 'Completada'; // Estado de la tarea
  createdAt: string; // Fecha ISO 8601
}
```

---

## 10. Comandos de Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web (para pruebas básicas)
npm run web
```
