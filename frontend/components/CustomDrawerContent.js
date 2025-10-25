import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function CustomDrawerContent(props) {
  const { signOut, user } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user?.name || 'User'}</Text>
        <Text style={styles.role}>{user?.role}</Text>
      </View>

      <ScrollView style={styles.menu}>
        {props.state.routeNames.map((route, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(route)}
          >
            <Ionicons name="chevron-forward-outline" size={20} color="#333" />
            <Text style={styles.menuText}>{route}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 20, backgroundColor: '#F9FAFB' },
  header: { paddingHorizontal: 20, marginBottom: 20 },
  username: { fontSize: 20, fontWeight: '700', color: '#111' },
  role: { fontSize: 14, color: '#555', marginTop: 4 },
  menu: { flex: 1 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  menuText: { fontSize: 16, color: '#111', marginLeft: 8 },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    margin: 20,
  },
  logoutText: { color: '#fff', fontWeight: '600', marginLeft: 8 },
});
