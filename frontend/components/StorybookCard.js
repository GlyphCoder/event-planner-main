// frontend/components/StorybookCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StorybookCard({ book }) {
  const openLink = () => {
    if (book.book_link) Linking.openURL(book.book_link);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openLink}>
      <View style={styles.header}>
        <Ionicons name="book-outline" size={24} color="#fff" />
        <Text style={styles.title}>Storybook ID: {book.storybook_id}</Text>
      </View>
      <Text style={styles.info}>Customer ID: {book.cid}</Text>
      <Text style={styles.link}>Open Storybook</Text>
    </TouchableOpacity>
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
  link: { color: '#1F2937', fontSize: 14, marginTop: 4, fontWeight: '600' },
});
