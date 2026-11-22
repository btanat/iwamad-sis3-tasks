// Your own 404 page, shown for any unknown route, with a link back.
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Oops' }} />
      <Text style={styles.title}>This page doesn’t exist</Text>
      <Link href="/" style={styles.link}>Go back to my tasks</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7f9', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  title: { fontSize: 20, fontWeight: '700', color: '#111827' },
  link: { fontSize: 16, color: '#2563eb', fontWeight: '600' },
});
