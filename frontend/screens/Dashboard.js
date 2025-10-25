import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getAllVendors } from '../services/vendorService';
import { getAllEvents } from '../services/eventService';
import { getAllGifts } from '../services/giftService';
import VendorCard from '../components/VendorCard';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (user.role === 'customer') {
          const [vendorsList, eventsList] = await Promise.all([
            getAllVendors(),
            getAllEvents()
          ]);
          setVendors(vendorsList);
          setEvents(eventsList);
        } else if (user.role === 'admin') {
          const [eventsList, giftsList, vendorsList] = await Promise.all([
            getAllEvents(),
            getAllGifts(),
            getAllVendors()
          ]);
          setEvents(eventsList);
          setGifts(giftsList);
          setVendors(vendorsList);
          setStats({ 
            totalEvents: eventsList.length, 
            totalGifts: giftsList.length,
            totalVendors: vendorsList.length
          });
        }
      } catch (err) {
        console.error('Dashboard fetchData error:', err);
        Alert.alert('Error', 'Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome, {user.name}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {user.role === 'customer' && (
        <>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{vendors.length}</Text>
              <Text style={styles.statLabel}>Available Vendors</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{events.length}</Text>
              <Text style={styles.statLabel}>Your Events</Text>
            </View>
          </View>

          <Text style={styles.subHeader}>Available Vendors</Text>
          {vendors.length > 0 ? (
            vendors.map(vendor => <VendorCard key={vendor._id} vendor={vendor} />)
          ) : (
            <Text style={styles.emptyText}>No vendors available</Text>
          )}

          {events.length > 0 && (
            <>
              <Text style={styles.subHeader}>Your Events</Text>
              {events.map(event => (
                <View key={event._id} style={styles.eventCard}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventInfo}>{event.description}</Text>
                  <Text style={styles.eventInfo}>Date: {new Date(event.date).toLocaleDateString()}</Text>
                  <Text style={styles.eventInfo}>Location: {event.location}</Text>
                </View>
              ))}
            </>
          )}
        </>
      )}

      {user.role === 'admin' && (
        <>
          <View style={styles.adminStats}>
            <Text style={styles.adminTitle}>Admin Dashboard</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.totalEvents || 0}</Text>
                <Text style={styles.statLabel}>Total Events</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.totalGifts || 0}</Text>
                <Text style={styles.statLabel}>Total Gifts</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.totalVendors || 0}</Text>
                <Text style={styles.statLabel}>Total Vendors</Text>
              </View>
            </View>
          </View>

          <Text style={styles.subHeader}>Recent Events</Text>
          {events.length > 0 ? (
            events.map(event => (
              <View key={event._id} style={styles.eventCard}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventInfo}>{event.description}</Text>
                <Text style={styles.eventInfo}>Date: {new Date(event.date).toLocaleDateString()}</Text>
                <Text style={styles.eventInfo}>Status: {event.status}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No events found</Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#000' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: { fontSize: 24, fontWeight: '700', color: '#fff' },
  logoutButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutText: { color: '#fff', fontWeight: '600', fontSize: 12 },
  subHeader: { fontSize: 18, fontWeight: '600', color: '#fff', marginVertical: 12 },
  emptyText: { color: '#ccc', fontSize: 14, textAlign: 'center', marginTop: 20 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: { fontSize: 24, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: 12, color: '#ccc', marginTop: 4 },
  adminStats: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    marginVertical: 12,
  },
  adminTitle: { fontSize: 18, fontWeight: '600', color: '#fff', marginBottom: 12 },
  eventCard: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  eventTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 8 },
  eventInfo: { fontSize: 14, color: '#ccc', marginBottom: 4 },
});