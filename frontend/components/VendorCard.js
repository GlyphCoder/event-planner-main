import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function VendorCard({ vendor }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{vendor.name || 'Vendor'}</Text>
          {vendor.category && (
            <Text style={styles.category}>{vendor.category}</Text>
          )}
        </View>
        {vendor.ratings > 0 && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {vendor.ratings?.toFixed(1) || '5.0'}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.details}>
        {vendor.email && (
          <View style={styles.infoRow}>
            <Text style={styles.emoji}>📧</Text>
            <Text style={styles.info}>{vendor.email}</Text>
          </View>
        )}
        {vendor.phone && (
          <View style={styles.infoRow}>
            <Text style={styles.emoji}>📞</Text>
            <Text style={styles.info}>{vendor.phone}</Text>
          </View>
        )}
        {vendor.location && (
          <View style={styles.infoRow}>
            <Text style={styles.emoji}>📍</Text>
            <Text style={styles.info}>{vendor.location}</Text>
          </View>
        )}
      </View>
      
      {vendor.priceRange && (
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            ${vendor.priceRange?.min || 0} - ${vendor.priceRange?.max || 'Contact'}
          </Text>
        </View>
      )}
      
      {vendor.services && vendor.services.length > 0 && (
        <View style={styles.servicesContainer}>
          {vendor.services.slice(0, 3).map((service, index) => (
            <View key={index} style={[styles.serviceTag, index < 2 && { marginRight: 6 }]}>
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    shadowColor: '#6A5ACD',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  name: { 
    fontSize: 18, 
    fontWeight: '800', 
    color: '#fff',
    marginBottom: 6,
  },
  category: { 
    fontSize: 11, 
    color: '#6A5ACD', 
    backgroundColor: 'rgba(106, 90, 205, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    fontWeight: '600',
    overflow: 'hidden',
  },
  ratingBadge: {
    backgroundColor: '#2D1B4E',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6A5ACD',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFD700',
  },
  details: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  info: { 
    fontSize: 13, 
    color: '#999',
    flex: 1,
  },
  priceContainer: {
    backgroundColor: 'rgba(106, 90, 205, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(106, 90, 205, 0.3)',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6A5ACD',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  serviceText: {
    fontSize: 11,
    color: '#ccc',
    fontWeight: '500',
  },
});