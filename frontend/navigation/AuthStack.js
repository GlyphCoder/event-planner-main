import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignupCustomer from '../screens/SignupCustomer';
import SignupVendor from '../screens/SignupVendor';
import SignupAdmin from '../screens/SignupAdmin';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignupCustomer" component={SignupCustomer} />
      <Stack.Screen name="SignupVendor" component={SignupVendor} />
      <Stack.Screen name="SignupAdmin" component={SignupAdmin} />
    </Stack.Navigator>
  );
}