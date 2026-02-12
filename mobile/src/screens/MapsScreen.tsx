import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';

export default function MapsScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('maps.title')}</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder={t('maps.search')}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Category Buttons */}
        <View style={styles.categories}>
          {['Food', 'Hotels', 'Attractions', 'Transport', 'Hospital', 'Bank'].map((cat) => (
            <TouchableOpacity key={cat} style={styles.categoryButton}>
              <Text style={styles.categoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={48} color="#1E3A8A" />
          <Text style={styles.mapText}>Map will appear here</Text>
          <Text style={styles.mapSubtext}>Amap SDK integration required</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="location" size={24} color="#1E3A8A" />
            <Text style={styles.actionText}>{t('maps.nearby')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="navigate" size={24} color="#1E3A8A" />
            <Text style={styles.actionText}>{t('maps.directions')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="star" size={24} color="#1E3A8A" />
            <Text style={styles.actionText}>Saved</Text>
          </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#1F2937',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 12,
  },
  mapSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});
