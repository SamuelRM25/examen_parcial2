# 📋 TODO List — Examen Parcial 2

Aplicación móvil desarrollada en **React Native con Expo** para la gestión de tareas pendientes personales.

## 📱 Características

- ✅ Agregar tareas con título y estado inicial
- 📋 Listar todas las tareas con estadísticas visuales
- 🔍 Ver el detalle de cada tarea
- 🔄 Cambiar el estado de una tarea (Pendiente / Completada)
- 🗑️ Eliminar tareas con confirmación
- 💾 Persistencia local mediante AsyncStorage

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos

- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- Expo Go en tu dispositivo móvil (App Store / Google Play)

### Pasos

```bash
# 1. Clonar el repositorio
git clone <https://github.com/SamuelRM25/examen_parcial2.git>
cd examen_parcial2

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm start
# o
npx expo start
```

Escanea el código QR con la app **Expo Go** en tu celular.

## 🗂️ Estructura del proyecto

```
examen_parcial2/
├── App.js                        # Punto de entrada
├── app.json                      # Configuración de Expo
├── src/
│   ├── components/
│   │   ├── AppButton.js          # Botón reutilizable
│   │   ├── AppInput.js           # Input reutilizable
│   │   ├── TaskCard.js           # Tarjeta de tarea reutilizable
│   │   └── EmptyState.js         # Estado vacío reutilizable
│   ├── navigation/
│   │   └── AppNavigator.js       # Configuración del Stack Navigator
│   ├── screens/
│   │   ├── HomeScreen.js         # Pantalla principal (listado)
│   │   ├── AddTaskScreen.js      # Pantalla agregar tarea
│   │   └── DetailScreen.js       # Pantalla detalle de tarea
│   └── storage/
│       └── taskStorage.js        # Módulo de persistencia AsyncStorage
├── manual_usuario.md
└── documentacion_tecnica.md
```

## 📚 Documentación

- [Manual de Usuario](./manual_usuario.md)
- [Documentación Técnica](./documentacion_tecnica.md)

## 👨‍💻 Autor

Samuel Ramírez Martínez — Examen Parcial 2
