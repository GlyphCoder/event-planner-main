import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';

export default function SignupCustomer({ navigation }) {
  const { signUp } = useContext(AuthContext);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    console.log('handleSignup called');
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate email has @
    if (!form.email.includes('@')) {
      Alert.alert('Error', 'Email must contain @ symbol');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Validate password is alphanumeric
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(form.password)) {
      Alert.alert('Error', 'Password must contain only letters and numbers (alphanumeric)');
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (form.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const result = await signUp({ 
        name: form.name,
        email: form.email,
        password: form.password,
        usertype: 'customer' 
      });
      
      if (result?.error) {
        if (result.error.includes('already exists')) {
          Alert.alert('Registration Failed', 'An account with this email already exists. Please try logging in instead.', [
            { text: 'Go to Login', onPress: () => navigation.navigate('Login') },
            { text: 'Try Again', style: 'cancel' }
          ]);
        } else {
          Alert.alert('Registration Failed', result.error);
        }
      } else {
        Alert.alert('Success', 'Customer registered successfully! You are now logged in.');
        // User is automatically logged in via AuthContext, no need to navigate to Login
      }
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.glassCard}>
          <View style={styles.header}>
            <Text style={styles.title}>Customer Registration</Text>
            <Text style={styles.subtitle}>Create your customer account</Text>
          </View>

          <View style={styles.form}>
            <AppInput
              placeholder="Full Name"
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
              autoCapitalize="words"
              style={styles.input}
              placeholderTextColor="#ccc"
            />
            
            <AppInput
              placeholder="Email"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor="#ccc"
            />
            
            <AppInput
              placeholder="Password"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#ccc"
            />
            
            <AppInput
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#ccc"
            />

            <AppButton
              title="Register as Customer"
              onPress={() => {
                console.log('Button pressed');
                handleSignup();
              }}
              loading={loading}
              style={styles.signupButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Text 
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
              >
                Sign In
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A5ACD',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Semi-transparent white
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#eee',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  signupButton: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 12,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#ccc',
    fontSize: 15,
  },
  loginLink: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});