import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import MapView, { Marker, Region } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const INITIAL_REGION: Region = {
  latitude: 39.9042,
  longitude: 116.4074,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const CATEGORIES = [
  { id: 'attraction', icon: 'camera', label: 'maps.attractions' },
  { id: 'restaurant', icon: 'food', label: 'maps.restaurants' },
  { id: 'hotel', icon: 'bed', label: 'maps.hotels' },
  { id: 'transport', icon: 'bus', label: 'maps.transport' },
  { id: 'shopping', icon: 'shopping', label: 'maps.shopping' },
  { id: 'atm', icon: 'cash', label: 'maps.atm' },
];

export default function MapsScreen() {
  const { t } = useTranslation();
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Icon name="magnify" size={20} color="#8E8E93" />
        <TextInput
          style={styles.searchInput}
          placeholder={t('maps.searchPlaceholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close" size={20} color="#8E8E93" />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.categories}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            >
              <Icon
                name={category.icon}
                size={20}
                color={selectedCategory === category.id ? '#FFFFFF' : '#007AFF'}
              />
              <Text
                style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelActive,
                ]}
              >
                {t(category.label)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChange={setRegion}
          showsUserLocation
        >
          <Marker
            coordinate={{ latitude: 39.9042, longitude: 116.4074 }}
            title="Tiananmen Square"
            description="Popular tourist attraction"
          />
          <Marker
            coordinate={{ latitude: 39.9163, longitude: 116.3972 }}
            title="Forbidden City"
            description="Imperial palace"
          />
        </MapView>

        <View style={styles.mapControls}>
          <TouchableOpacity
            style={styles.mapControlButton}
            onPress={() => {
              setRegion({
                ...region,
                latitudeDelta: region.latitudeDelta * 0.5,
                longitudeDelta: region.longitudeDelta * 0.5,
              });
            }}
          >
            <Icon name="plus" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mapControlButton}
            onPress={() => {
              setRegion({
                ...region,
                latitudeDelta: region.latitudeDelta * 2,
                longitudeDelta: region.longitudeDelta * 2,
              });
            }}
          >
            <Icon name="minus" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mapControlButton}
            onPress={() => setRegion(INITIAL_REGION)}
          >
            <Icon name="crosshairs-gps" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>Tiananmen Square</Text>
          <Text style={styles.locationAddress}>
            Chang'an Avenue, Dongcheng District, Beijing
          </Text>
          <View style={styles.locationActions}>
            <TouchableOpacity style={styles.locationAction}>
              <Icon name="directions" size={20} color="#007AFF" />
              <Text style={styles.locationActionText}>Navigate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationAction}>
              <Icon name="heart-outline" size={20} color="#007AFF" />
              <Text style={styles.locationActionText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.locationAction}>
              <Icon name="share-variant" size={20} color="#007AFF" />
              <Text style={styles.locationActionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  categories: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#007AFF',
    marginLeft: 6,
  },
  categoryLabelActive: {
    color: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width,
    height: '60%',
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    top: 80,
  },
  mapControlButton: {
    backgroundColor: '#FFFFFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationCard: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  locationAddress: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  locationActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  locationAction: {
    alignItems: 'center',
  },
  locationActionText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
  },
});
