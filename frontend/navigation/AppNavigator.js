// import React, { useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AuthStack from './AuthStack';
// import DrawerNavigator from './DrawerNavigator';
// import { AuthContext } from '../context/AuthContext';

// export default function AppNavigator() {
//   const { user } = useContext(AuthContext);

//   return (
//     <NavigationContainer>
//       {user ? <DrawerNavigator /> : <AuthStack />}
//     </NavigationContainer>
//   );
// }

// navigation/AppNavigator.js
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';
import { AuthContext } from '../context/AuthContext';

export default function AppNavigator() {
  const { user } = useContext(AuthContext);
  console.log('AppNavigator: User state', user);
  
  if (user && user.id) {
    return <DrawerNavigator />;
  }
  
  return <AuthStack />;
}

