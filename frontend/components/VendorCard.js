import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function VendorCard({ vendor }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{vendor.name}</Text>
        <Text style={styles.category}>{vendor.category}</Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.info}>📧 {vendor.email}</Text>
        {vendor.phone && <Text style={styles.info}>📞 {vendor.phone}</Text>}
      </View>
      
      {vendor.otherData && (
        <View style={styles.extraInfo}>
          {vendor.otherData.experience && (
            <Text style={styles.extraText}>Experience: {vendor.otherData.experience}</Text>
          )}
          {vendor.otherData.rating && (
            <Text style={styles.extraText}>Rating: ⭐ {vendor.otherData.rating}</Text>
          )}
          {vendor.otherData.priceRange && (
            <Text style={styles.extraText}>Price: {vendor.otherData.priceRange}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: '700', color: '#111', flex: 1 },
  category: { 
    fontSize: 12, 
    color: '#666', 
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  details: {
    marginBottom: 12,
  },
  info: { fontSize: 14, color: '#555', marginBottom: 4 },
  extraInfo: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007BFF',
  },
  extraText: { fontSize: 13, color: '#666', marginBottom: 2 },
});