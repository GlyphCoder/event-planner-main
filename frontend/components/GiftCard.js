// frontend/components/GiftCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function GiftCard({ gift }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: gift.image_url }} style={styles.image} />
      <Text style={styles.name}>{gift.gift_name}</Text>
      <Text style={styles.price}>Price: ${gift.gift_price}</Text>
      <Text style={styles.available}>Available: {gift.quantity_available_count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
    alignItems: 'center',
  },
  image: { width: 100, height: 100, borderRadius: 8, marginBottom: 8 },
  name: { color: '#fff', fontSize: 16, fontWeight: '600' },
  price: { color: '#ccc', fontSize: 14, marginTop: 2 },
  available: { color: '#ccc', fontSize: 14, marginTop: 2 },
});
