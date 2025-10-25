// frontend/components/EventCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventCard({ event }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={24} color="#fff" />
        <Text style={styles.title}>{event.event_name || 'Event Name'}</Text>
      </View>
      <Text style={styles.info}>Date: {event.date}</Text>
      <Text style={styles.info}>Customer ID: {event.cid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  title: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  info: { color: '#ccc', fontSize: 14, marginTop: 2 },
});
