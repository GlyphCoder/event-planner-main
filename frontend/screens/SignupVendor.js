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

const VENDOR_CATEGORIES = [
  'Photography',
  'Catering',
  'Music & Entertainment',
  'Decorations',
  'Venue',
  'Transportation',
  'Other'
];

export default function SignupVendor({ navigation }) {
  const { signUp } = useContext(AuthContext);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    category: '',
    businessName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    console.log('handleSignup for vendor called');
    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.category || !form.businessName) {
      Alert.alert('Error', 'Please fill in all required fields');
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

    // Validate phone number is 10 digits
    if (form.phone && form.phone.trim() !== '') {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(form.phone)) {
        Alert.alert('Error', 'Phone number must be exactly 10 digits');
        return;
      }
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
      console.log('Calling signUp from AuthContext');
      const result = await signUp({ 
        name: form.name,
        email: form.email,
        password: form.password,
        usertype: 'vendor',
        phone: form.phone,
        category: form.category,
        businessName: form.businessName
      });
      console.log('signUp result:', result);
      
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
        Alert.alert('Success', 'Vendor registered successfully! You are now logged in.', [
          { text: 'OK', onPress: () => {
            // Force navigation to dashboard after successful signup
            // Navigation will be handled by AppNavigator based on user state
          }}
        ]);
      }
    } catch (error) {
      console.error('Error in handleSignup:', error);
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
            <Text style={styles.title}>Vendor Registration</Text>
            <Text style={styles.subtitle}>Join our vendor network</Text>
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
              placeholder="Business Name"
              value={form.businessName}
              onChangeText={(value) => setForm({ ...form, businessName: value })}
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
              placeholder="Phone Number"
              value={form.phone}
              onChangeText={(value) => setForm({ ...form, phone: value })}
              keyboardType="phone-pad"
              style={styles.input}
              placeholderTextColor="#ccc"
            />
            
            <AppInput
              placeholder="Service Category (e.g., Photography, Catering)"
              value={form.category}
              onChangeText={(value) => setForm({ ...form, category: value })}
              autoCapitalize="words"
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
              title="Register as Vendor"
              onPress={() => {
                console.log('Vendor button pressed');
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