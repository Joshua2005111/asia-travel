import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t } = useTranslation();

  const settingsItems = [
    { id: 'language', title: '🌐 ' + t('profile.language'), value: 'English' },
    { id: 'currency', title: '💱 ' + t('profile.currency'), value: 'USD' },
    { id: 'notifications', title: '🔔 Notifications', value: 'On' },
    { id: 'help', title: '❓ ' + t('profile.help'), value: '' },
    { id: 'privacy', title: '🔒 Privacy Policy', value: '' },
    { id: 'about', title: 'ℹ️ About', value: 'v1.0.0' },
  ];

  const menuItems = [
    { id: 'orders', title: '📦 My Orders', value: '0' },
    { id: 'favorites', title: '❤️ Favorites', value: '0' },
    { id: 'itinerary', title: '📋 My Itineraries', value: '0' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('profile.title')}</Text>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Guest User</Text>
            <Text style={styles.profileEmail}>Sign in to sync data</Text>
          </View>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <Text style={styles.menuText}>{item.title}</Text>
            <View style={styles.menuValue}>
              <Text style={styles.menuValueText}>{item.value}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Settings */}
        <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>
        {settingsItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.settingItem}>
            <Text style={styles.settingText}>{item.title}</Text>
            <View style={styles.settingValue}>
              {item.value ? (
                <Text style={styles.settingValueText}>{item.value}</Text>
              ) : null}
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        ))}

        {/* Emergency Section */}
        <View style={styles.emergencySection}>
          <Text style={styles.emergencyTitle}>🆘 Emergency Contacts</Text>
          <Text style={styles.emergencyText}>
            Police: 110 | Ambulance: 120 | Fire: 119
          </Text>
          <TouchableOpacity style={styles.hospitalButton}>
            <Text style={styles.hospitalButtonText}>Find Nearest Hospital</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <Text style={styles.versionText}>China Tourist Guide v1.0.0</Text>
      </View>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  signInButton: {
    backgroundColor: '#1E3A8A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  signInText: {
    color: 'white',
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  menuText: {
    fontSize: 16,
    color: '#1F2937',
  },
  menuValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValueText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingText: {
    fontSize: 16,
    color: '#1F2937',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: 14,
    color: '#6B7280',
    marginRight: 8,
  },
  emergencySection: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#991B1B',
  },
  emergencyText: {
    fontSize: 14,
    color: '#B91C1C',
    marginTop: 8,
  },
  hospitalButton: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  hospitalButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 20,
  },
});
