import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function AppButton({ title, onPress, style, loading }) {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.btn, style, loading && styles.disabledBtn]}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 14,
    backgroundColor: '#0066FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledBtn: {
    backgroundColor: '#a9a9a9',
  },
  text: { 
    color: '#fff', 
    fontWeight: '600',
    textAlign: 'center',
  }
});