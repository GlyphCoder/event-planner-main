// frontend/navigation/DrawerNavigator.js
import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import EventDetails from '../screens/EventDetails';
import VendorList from '../screens/VendorList';
import GiftShop from '../screens/GiftShop';
import StorybookScreen from '../screens/StorybookScreen';
import SocialMediaScreen from '../screens/SocialMediaScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {user?.role === 'admin' && (
        <>
          <Drawer.Screen name="VendorList" component={VendorList} />
          <Drawer.Screen name="GiftShop" component={GiftShop} />
          <Drawer.Screen name="SocialMediaScreen" component={SocialMediaScreen} />
        </>
      )}
      {user?.role === 'vendor' && (
        <>
          <Drawer.Screen name="EventDetails" component={EventDetails} />
          <Drawer.Screen name="GiftShop" component={GiftShop} />
        </>
      )}
      {user?.role === 'customer' && (
        <>
          <Drawer.Screen name="EventDetails" component={EventDetails} />
          <Drawer.Screen name="StorybookScreen" component={StorybookScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
}
