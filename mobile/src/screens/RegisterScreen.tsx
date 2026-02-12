import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import api from '../services/api';
import * as SecureStore from 'expo-secure-store';

export default function RegisterScreen({ onRegister }: { onRegister: () => void }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    passportId: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    // Validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert(t('auth.error'), t('auth.fill_all_fields'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert(t('auth.error'), t('auth.passwords_not_match'));
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert(t('auth.error'), t('auth.password_too_short'));
      return;
    }

    setLoading(true);
    try {
      const data = await api.register(
        formData.email,
        formData.password,
        formData.phone || undefined,
        formData.passportId || undefined
      );

      // Save token and user data
      await SecureStore.setItemAsync('authToken', data.token);
      await SecureStore.setItemAsync('userData', JSON.stringify(data.user));

      onRegister();
    } catch (error: any) {
      Alert.alert(
        t('auth.error'),
        error.response?.data?.error || t('auth.registration_failed')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => {}}>
            <Ionicons name="arrow-back" size={24} color="#1E3A8A" />
          </TouchableOpacity>
          <Text style={styles.title}>{t('auth.register')}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <Ionicons name="person-add-circle" size={80} color="#1E3A8A" />
            <Text style={styles.subtitle}>{t('auth.create_account')}</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder={t('auth.email')}
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Phone */}
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder={t('auth.phone')}
                placeholderTextColor="#9CA3AF"
                value={formData.phone}
                onChangeText={(value) => handleChange('phone', value)}
                keyboardType="phone-pad"
              />
            </View>

            {/* Passport ID */}
            <View style={styles.inputContainer}>
              <Ionicons name="document-text-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder={t('auth.passport_id')}
                placeholderTextColor="#9CA3AF"
                value={formData.passportId}
                onChangeText={(value) => handleChange('passportId', value)}
                autoCapitalize="characters"
              />
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder={t('auth.password')}
                placeholderTextColor="#9CA3AF"
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.input}
                placeholder={t('auth.confirm_password')}
                placeholderTextColor="#9CA3AF"
                value={formData.confirmPassword}
                onChangeText={(value) => handleChange('confirmPassword', value)}
                secureTextEntry={!showPassword}
              />
            </View>

            {/* Terms */}
            <View style={styles.termsContainer}>
              <TouchableOpacity style={styles.checkbox} onPress={() => {}}>
                <Ionicons name="checkbox-outline" size={20} color="#1E3A8A" />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                {t('auth.agree_terms')}{' '}
                <Text style={styles.termsLink}>{t('auth.terms_of_service')}</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>{t('auth.register')}</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>{t('auth.have_account')}</Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.loginLink}>{t('auth.login')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    marginLeft: 8,
    color: '#6B7280',
    fontSize: 14,
    flex: 1,
  },
  termsLink: {
    color: '#1E3A8A',
    fontWeight: '600',
  },
  checkbox: {
    padding: 4,
  },
  button: {
    backgroundColor: '#1E3A8A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  loginText: {
    color: '#6B7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#1E3A8A',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});
