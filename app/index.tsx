// The task list — the home screen.
// FlatList + swipe-to-delete + long-press-to-toggle + animated rows.
import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useTasks } from '../src/context/TasksContext';
import type { Task } from '../src/data/tasks';

export default function TaskListScreen() {
  const { tasks, deleteTask, toggleDone } = useTasks();

  function renderItem({ item }: { item: Task }) {
    return (
      <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
        <ReanimatedSwipeable
          friction={2}
          rightThreshold={60}
          renderRightActions={() => (
            <Pressable style={styles.deleteAction} onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteActionText}>Delete</Text>
            </Pressable>
          )}
        >
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={() => router.push(`/tasks/${item.id}`)}
            onLongPress={() => toggleDone(item.id)}
          >
            <View style={styles.rowText}>
              <Text style={[styles.title, item.done && styles.titleDone]}>{item.title}</Text>
              {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
            </View>
            {item.done ? <Animated.Text entering={ZoomIn} style={styles.badge}>✓ Done</Animated.Text> : null}
          </Pressable>
        </ReanimatedSwipeable>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Swipe a task left to delete · long-press to mark it done.</Text>
      <FlatList
        data={tasks}
        keyExtractor={(t) => String(t.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet. Tap “New Task” to add one.</Text>}
      />
      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && styles.addPressed]}
        onPress={() => router.push('/new')}
      >
        <Text style={styles.addButtonText}>+ New Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7f9' },
  hint: { fontSize: 13, color: '#6b7280', padding: 16, paddingBottom: 8 },
  list: { paddingHorizontal: 16, paddingBottom: 16, gap: 10 },
  row: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  rowPressed: { backgroundColor: '#eef2ff' },
  rowText: { flex: 1, gap: 2 },
  title: { fontSize: 17, fontWeight: '600', color: '#111827' },
  titleDone: { textDecorationLine: 'line-through', color: '#9ca3af' },
  notes: { fontSize: 13, color: '#6b7280' },
  badge: { marginLeft: 12, fontSize: 13, fontWeight: '700', color: '#16a34a' },
  empty: { textAlign: 'center', color: '#6b7280', marginTop: 48, fontSize: 15 },
  deleteAction: {
    backgroundColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 12,
    marginLeft: 10,
  },
  deleteActionText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  addButton: {
    minHeight: 44,
    margin: 16,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPressed: { backgroundColor: '#1d4ed8' },
  addButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
