// The "new task" screen: a controlled form.
// An empty title is refused with a visible message — nothing is added.
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTasks } from '../src/context/TasksContext';

export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  function save() {
    if (title.trim() === '') {
      setError('Please enter a title.');
      return;
    }
    addTask(title.trim(), notes.trim());
    router.back(); // adds the task and returns to the list at once
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(t) => {
          setTitle(t);
          if (error) setError('');
        }}
        placeholder="What needs doing?"
        returnKeyType="done"
        onSubmitEditing={save}
        autoFocus
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput
        style={[styles.input, styles.notesInput]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Extra details"
        multiline
      />

      <Pressable
        style={({ pressed }) => [styles.saveButton, pressed && styles.savePressed]}
        onPress={save}
      >
        <Text style={styles.saveButtonText}>Save task</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7f9', padding: 16, gap: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginTop: 8 },
  input: {
    minHeight: 44,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#111827',
  },
  notesInput: { minHeight: 90, textAlignVertical: 'top', paddingTop: 12 },
  error: { color: '#dc2626', fontSize: 14 },
  saveButton: {
    minHeight: 44,
    marginTop: 16,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savePressed: { backgroundColor: '#1d4ed8' },
  saveButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
