import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { t } = useTranslation();

  const quickActions = [
    { id: '1', title: '🚑 Emergency', color: '#EF4444', screen: 'Emergency' },
    { id: '2', title: '🔤 Translate', color: '#3B82F6', screen: 'Translate' },
    { id: '3', title: '🗺️ Maps', color: '#10B981', screen: 'Maps' },
    { id: '4', title: '🎫 Tickets', color: '#8B5CF6', screen: 'Booking' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcome}>{t('home.welcome')}</Text>
          <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
        </View>

        {/* Emergency Button */}
        <TouchableOpacity style={styles.emergencyButton}>
          <Ionicons name="call" size={24} color="white" />
          <Text style={styles.emergencyText}>{t('home.emergency')}</Text>
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>{t('home.quick_actions')}</Text>
        <View style={styles.grid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.card, { backgroundColor: action.color }]}
            >
              <Text style={styles.cardText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Destinations */}
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Beijing', 'Shanghai', 'Xi\'an', 'Chengdu', 'Guilin'].map((city) => (
            <TouchableOpacity key={city} style={styles.cityCard}>
              <Text style={styles.cityText}>{city}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  emergencyButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  emergencyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    height: 80,
    justifyContent: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cityCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});
