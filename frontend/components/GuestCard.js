// frontend/components/GuestCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GuestCard({ guest }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="person-outline" size={24} color="#fff" />
        <Text style={styles.title}>{guest.name}</Text>
      </View>
      <Text style={styles.info}>Email: {guest.guest_email_id}</Text>
      <Text style={styles.info}>Guest ID: {guest.guest_id}</Text>
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
