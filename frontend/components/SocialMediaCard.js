import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SocialMediaCard({ post }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: post.imageUrl }} style={styles.image} />
      <Text style={styles.caption}>{post.caption}</Text>
      <Text style={styles.handle}>@{post.instaHandle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: { width: '100%', height: 180, borderRadius: 10 },
  caption: { marginTop: 8, fontSize: 14, color: '#111' },
  handle: { fontSize: 12, color: '#888', marginTop: 4 },
});
