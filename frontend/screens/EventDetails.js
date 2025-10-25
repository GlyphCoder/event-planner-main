import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EventDetails({ route }) {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.detail}>{event.description}</Text>
      <Text style={styles.detail}>Date: {event.date}</Text>
      <Text style={styles.detail}>Location: {event.location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { fontSize: 22, color: '#fff', fontWeight: '700' },
  detail: { color: '#ccc', fontSize: 14, marginTop: 8 },
});
