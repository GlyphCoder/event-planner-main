import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function Splash({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');  // Navigate directly to Login screen
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // Replace with your app logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Celevara</Text>
      <Text style={styles.subtitle}>Plan. Celebrate. Remember.</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5D3FD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    color: '#eee',
    marginTop: 5,
  },
});