/**
 * LoginScreen.js
 * UI for login/register. Minor header added by Danendra Daffa to personalize files.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { loginUser, registerUser } from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi!');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Format email tidak valid!');
      return;
    }

    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);

    if (result.success) {
      navigation.replace('Home');
    } else {
      Alert.alert('Login Gagal', result.error);
    }
  };

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi!');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Format email tidak valid!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password minimal 6 karakter!');
      return;
    }

    setLoading(true);
    const result = await registerUser(email, password);
    setLoading(false);

    if (result.success) {
      Alert.alert('Berhasil', 'Akun berhasil dibuat. Silakan login.', [
        {
          text: 'OK',
          onPress: () => {
            setIsLogin(true);
            setPassword('');
          },
        },
      ]);
    } else {
      Alert.alert('Registrasi Gagal', result.error);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff5f9" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {isLogin ? 'Selamat Datang' : 'Buat Akun Baru'}
            </Text>
            <Text style={styles.subtitle}>
              {isLogin ? 'Masuk untuk melanjutkan' : 'Daftar untuk memulai'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="nama@email.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder={
                  isLogin ? 'Masukkan password' : 'Minimal 6 karakter'
                }
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2563eb" />
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={isLogin ? handleLogin : handleRegister}
                  activeOpacity={0.7}
                >
                  <Text style={styles.buttonText}>
                    {isLogin ? 'Masuk' : 'Daftar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.switchButton}
                  onPress={() => {
                    setIsLogin(!isLogin);
                    setPassword('');
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.switchText}>
                    {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
                    <Text style={styles.switchTextBold}>
                      {isLogin ? 'Daftar' : 'Masuk'}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Footer */}
          {/* <View style={styles.footer}>
            <Text style={styles.footerText}>
              Data disimpan dengan aman menggunakan Firebase & MMKV
            </Text>
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f9',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#d6306d',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#b8668c',
    fontWeight: '500',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d6306d',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff0f5',
    borderWidth: 1,
    borderColor: '#e8a5c5',
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    color: '#2a0f3d',
  },
  loadingContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d6306d',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#d6306d',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8,
  },
  switchText: {
    fontSize: 14,
    color: '#b8668c',
  },
  switchTextBold: {
    color: '#d6306d',
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#d4b5c9',
    textAlign: 'center',
  },
});

export default LoginScreen;
