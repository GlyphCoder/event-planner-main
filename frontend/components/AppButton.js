import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AppButton({ title, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 14,
    backgroundColor: '#0066FF',
    borderRadius: 10,
    alignItems: 'center'
  },
  text: { color: '#fff', fontWeight: '600' }
});