// One task's own screen, opened at /tasks/<id>.
// Reads the id from the URL, finds the task, and offers toggle + delete.
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTasks } from '../../src/context/TasksContext';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTask, deleteTask, toggleDone } = useTasks();
  const task = getTask(Number(id));

  // Unknown id -> a clear not-found message.
  if (!task) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={styles.title}>Task not found</Text>
        <Text style={styles.notes}>No task with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: task.title }} />
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.status}>{task.done ? '✓ Done' : '◻ Open'}</Text>
      {task.notes ? <Text style={styles.notes}>{task.notes}</Text> : null}

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={() => toggleDone(task.id)}
      >
        <Text style={styles.buttonText}>{task.done ? 'Mark as open' : 'Mark as done'}</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, styles.deleteButton, pressed && styles.pressed]}
        onPress={() => {
          deleteTask(task.id);
          router.back(); // delete from the task screen, then back to the list
        }}
      >
        <Text style={styles.buttonText}>Delete task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7f9', padding: 20, gap: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  status: { fontSize: 15, color: '#6b7280' },
  notes: { fontSize: 16, color: '#374151' },
  button: {
    minHeight: 44,
    marginTop: 8,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: { backgroundColor: '#dc2626' },
  pressed: { opacity: 0.85 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
