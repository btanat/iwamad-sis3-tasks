// The root layout: three screens in a Stack, wrapped so gestures and
// shared task state work everywhere. The "new" screen slides up as a modal.
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TasksProvider } from '../src/context/TasksContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TasksProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'My Tasks' }} />
          <Stack.Screen name="new" options={{ title: 'New Task', presentation: 'modal' }} />
          <Stack.Screen name="tasks/[id]" options={{ title: 'Task' }} />
        </Stack>
      </TasksProvider>
    </GestureHandlerRootView>
  );
}
