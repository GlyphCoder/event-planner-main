import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { getSocialPosts } from '../services/mediaService'; // ✅ corrected import
import SocialMediaCard from '../components/SocialMediaCard';

export default function SocialMediaScreen() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSocialPosts(); // ✅ updated function name
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching social media posts:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff6f00" />
        <Text style={styles.loadingText}>Loading Social Posts...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Social Media Highlights</Text>
      {posts.length ? (
        posts.map((p, i) => <SocialMediaCard key={i} post={p} />)
      ) : (
        <Text style={styles.empty}>No social posts yet</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  empty: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#ccc',
    marginTop: 10,
  },
});
