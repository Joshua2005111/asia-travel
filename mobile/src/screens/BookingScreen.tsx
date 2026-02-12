import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';

export default function BookingScreen() {
  const { t } = useTranslation();

  const bookingTypes = [
    { id: 'train', title: '🚂 ' + t('booking.train'), desc: 'High-speed & normal trains' },
    { id: 'flight', title: '✈️ ' + t('booking.flight'), desc: 'Domestic & international flights' },
    { id: 'car', title: '🚗 ' + t('booking.car'), desc: 'Rent a car for your trip' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('booking.title')}</Text>

        {/* Booking Options */}
        {bookingTypes.map((type) => (
          <TouchableOpacity key={type.id} style={styles.bookingCard}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={type.id === 'train' ? 'train' : type.id === 'flight' ? 'airplane' : 'car'}
                size={32}
                color="white"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.bookingTitle}>{type.title.replace(/[^\w\s]/gi, '')}</Text>
              <Text style={styles.bookingDesc}>{type.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        ))}

        {/* Promotional Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoTitle}>🎉 Special Offer</Text>
          <Text style={styles.promoText}>Get 10% off on your first train booking!</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Bookings */}
        <Text style={styles.sectionTitle}>Recent Bookings</Text>
        <View style={styles.emptyState}>
          <Ionicons name="ticket-outline" size={48} color="#9CA3AF" />
          <Text style={styles.emptyText}>No bookings yet</Text>
          <Text style={styles.emptySubtext}>Your booking history will appear here</Text>
        </View>
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
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  bookingDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  promoBanner: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#92400E',
  },
  promoText: {
    fontSize: 14,
    color: '#B45309',
    marginTop: 4,
  },
  promoButton: {
    backgroundColor: '#1E3A8A',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  promoButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
});
