import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getCustomerEvents } from '../services/customerService';

export default function StorybookScreen() {
  const { user } = useContext(AuthContext);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getCustomerEvents(user._id);
      setStories(data);
    })();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Event Storybook</Text>
      {stories.length ? (
        stories.map((s, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.desc}>{s.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>No stories yet</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  header: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 12 },
  card: { backgroundColor: '#111', padding: 12, borderRadius: 8, marginVertical: 8 },
  title: { color: '#fff', fontWeight: '600', fontSize: 16 },
  desc: { color: '#ccc', marginTop: 6 },
  empty: { color: '#777', textAlign: 'center', marginTop: 20 },
});
