import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllGifts } from '../services/giftService';

export default function GiftShop() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllGifts();
      setGifts(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gift Shop</Text>
      <FlatList
        data={gifts}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  header: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 12 },
  item: { color: '#ccc', padding: 8, borderBottomWidth: 0.3, borderColor: '#333' },
});
