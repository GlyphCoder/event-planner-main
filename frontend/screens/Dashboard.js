import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { getAllVendors } from '../services/vendorService';
import { getAllEvents } from '../services/eventService';
import { getAllGifts } from '../services/giftService';
import VendorCard from '../components/VendorCard';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard({ navigation }) {
  const { user, signOut } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Use navigation from hook as well
  const nav = navigation || useNavigation();

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
        } else if (user.role === 'vendor') {
          // For vendors, fetch their profile data and bookings
          const vendorsList = await getAllVendors();
          const eventsList = await getAllEvents();
          
          // Filter events that include this vendor
          const myBookings = eventsList.filter(event => 
            event.vendors && event.vendors.some(v => v === user.id)
          );
          
          setVendors(vendorsList);
          setEvents(myBookings);
          setStats({
            totalBookings: myBookings.length,
            availableVendors: vendorsList.length
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.header}>{user.name}</Text>
          <Text style={styles.roleText}>{user.role?.toUpperCase()}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

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
                <Text style={styles.eventTitle}>{event.eventName || event.title}</Text>
                <Text style={styles.eventInfo}>{event.eventType}</Text>
                <Text style={styles.eventInfo}>Date: {new Date(event.date).toLocaleDateString()}</Text>
                <Text style={styles.eventInfo}>Status: {event.status}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No events found</Text>
          )}
        </>
      )}

      {user.role === 'vendor' && (
        <>
          <View style={styles.adminStats}>
            <Text style={styles.adminTitle}>Vendor Dashboard</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.totalBookings || 0}</Text>
                <Text style={styles.statLabel}>My Bookings</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{stats.availableVendors || 0}</Text>
                <Text style={styles.statLabel}>Competitors</Text>
              </View>
            </View>
          </View>

          <Text style={styles.subHeader}>My Bookings</Text>
          {events.length > 0 ? (
            events.map(event => (
              <View key={event._id} style={styles.eventCard}>
                <Text style={styles.eventTitle}>{event.eventName || event.title}</Text>
                <Text style={styles.eventInfo}>Type: {event.eventType}</Text>
                <Text style={styles.eventInfo}>Date: {new Date(event.date).toLocaleDateString()}</Text>
                <Text style={styles.eventInfo}>Venue: {event.venue || 'TBD'}</Text>
                <Text style={styles.eventInfo}>Status: {event.status}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No bookings yet</Text>
          )}
        </>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0A0A0A' 
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#6A5ACD',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  greeting: { 
    fontSize: 14, 
    color: '#E0E0E0',
    fontWeight: '400',
  },
  header: { 
    fontSize: 26, 
    fontWeight: '800', 
    color: '#fff' 
  },
  roleText: {
    fontSize: 11,
    color: '#C9C0FF',
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 1,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoutText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 13 
  },
  subHeader: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#fff', 
    marginVertical: 16,
    marginTop: 20,
  },
  emptyText: { 
    color: '#888', 
    fontSize: 14, 
    textAlign: 'center', 
    marginTop: 30,
    fontStyle: 'italic',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    elevation: 4,
    shadowColor: '#6A5ACD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statNumber: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: '#6A5ACD',
    marginBottom: 4,
  },
  statLabel: { 
    fontSize: 11, 
    color: '#999',
    fontWeight: '500',
    textAlign: 'center',
  },
  adminStats: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  adminTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#fff', 
    marginBottom: 16 
  },
  eventCard: {
    backgroundColor: '#1A1A1A',
    padding: 18,
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  eventTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#fff', 
    marginBottom: 10 
  },
  eventInfo: { 
    fontSize: 13, 
    color: '#999', 
    marginBottom: 4 
  },
});