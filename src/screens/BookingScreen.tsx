import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BookingSearch {
  type: 'train' | 'flight' | 'car' | 'taxi';
  departure: string;
  arrival: string;
  date: Date;
  passengers: number;
}

export default function BookingScreen() {
  const { t } = useTranslation();
  const [search, setSearch] = useState<BookingSearch>({
    type: 'train',
    departure: '',
    arrival: '',
    date: new Date(),
    passengers: 1,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const bookingTypes = [
    { id: 'train', icon: 'train', label: t('booking.train') },
    { id: 'flight', icon: 'airplane', label: t('booking.flight') },
    { id: 'car', icon: 'car', label: t('booking.car') },
    { id: 'taxi', icon: 'taxi', label: t('booking.taxi') },
  ];

  const handleSearch = async () => {
    if (!search.departure || !search.arrival) {
      Alert.alert(t('common.error'), t('booking.error.locationRequired'));
      return;
    }

    setLoading(true);
    try {
      // API call to search bookings
      // const response = await bookingAPI.search(search);
      // setResults(response.data);
      
      // Mock results for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      setResults([
        {
          id: '1',
          operator: 'China Railway',
          departureTime: '08:30',
          arrivalTime: '14:45',
          duration: '6h 15m',
          price: 450,
          currency: 'CNY',
          type: 'train',
        },
        {
          id: '2',
          operator: 'China Railway',
          departureTime: '12:00',
          arrivalTime: '18:30',
          duration: '6h 30m',
          price: 420,
          currency: 'CNY',
          type: 'train',
        },
        {
          id: '3',
          operator: 'China Railway',
          departureTime: '15:30',
          arrivalTime: '21:45',
          duration: '6h 15m',
          price: 480,
          currency: 'CNY',
          type: 'train',
        },
      ]);
    } catch (error) {
      Alert.alert(t('common.error'), t('booking.error.searchFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (item: any) => {
    Alert.alert(
      t('booking.confirm'),
      `${t('booking.operator')}: ${item.operator}\n${t('booking.price')}: ¥${item.price}`,
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('common.confirm'), 
          onPress: () => {
            // Navigate to payment screen
            navigation.navigate('Payment', {
              bookingId: `booking_${Date.now()}`,
              amount: item.price * search.passengers,
              description: `${item.type.toUpperCase()} - ${item.operator}`,
            });
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('booking.title')}</Text>
        <Text style={styles.subtitle}>{t('booking.subtitle')}</Text>
      </View>

      {/* Booking Type Selector */}
      <View style={styles.typeSelector}>
        {bookingTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeButton,
              search.type === type.id && styles.typeButtonActive,
            ]}
            onPress={() => setSearch({ ...search, type: type.id as any })}
          >
            <Icon
              name={type.icon}
              size={24}
              color={search.type === type.id ? '#007AFF' : '#8E8E93'}
            />
            <Text
              style={[
                styles.typeLabel,
                search.type === type.id && styles.typeLabelActive,
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Form */}
      <View style={styles.searchForm}>
        <View style={styles.inputGroup}>
          <Icon name="map-marker" size={20} color="#007AFF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={t('booking.departure')}
            value={search.departure}
            onChangeText={(text) => setSearch({ ...search, departure: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Icon name="map-marker-check" size={20} color="#007AFF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={t('booking.arrival')}
            value={search.arrival}
            onChangeText={(text) => setSearch({ ...search, arrival: text })}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Icon name="calendar" size={20} color="#007AFF" style={styles.inputIcon} />
            <DatePicker
              style={styles.datePicker}
              date={search.date}
              mode="date"
              placeholder={t('booking.date')}
              format="YYYY-MM-DD"
              minDate={new Date()}
              confirmBtnText={t('common.confirm')}
              cancelBtnText={t('common.cancel')}
              customStyles={{
                dateIcon: { display: 'none' },
                dateInput: styles.dateInput,
              }}
              onDateChange={(date: Date) => setSearch({ ...search, date })}
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Icon name="account-group" size={20} color="#007AFF" style={styles.inputIcon} />
            <View style={styles.passengerSelector}>
              <Text style={styles.passengerText}>{search.passengers} {t('booking.passengers')}</Text>
              <View style={styles.passengerControls}>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={() => setSearch({ ...search, passengers: Math.max(1, search.passengers - 1) })}
                >
                  <Text style={styles.passengerButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.passengerButton}
                  onPress={() => setSearch({ ...search, passengers: Math.min(9, search.passengers + 1) })}
                >
                  <Text style={styles.passengerButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Icon name="magnify" size={20} color="#FFFFFF" />
              <Text style={styles.searchButtonText}>{t('booking.search')}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Results */}
      {results.length > 0 && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>{t('booking.results')}</Text>
          {results.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.resultCard}
              onPress={() => handleBooking(item)}
            >
              <View style={styles.resultHeader}>
                <Text style={styles.operator}>{item.operator}</Text>
                <Text style={styles.price}>¥{item.price}</Text>
              </View>
              <View style={styles.resultBody}>
                <View style={styles.timeBlock}>
                  <Text style={styles.time}>{item.departureTime}</Text>
                  <Icon name="arrow-right" size={16} color="#8E8E93" />
                  <Text style={styles.time}>{item.arrivalTime}</Text>
                </View>
                <Text style={styles.duration}>{item.duration}</Text>
              </View>
              <View style={styles.resultFooter}>
                <Icon name="seat" size={16} color="#8E8E93" />
                <Text style={styles.seats}>{t('booking.available')}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  typeButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    minWidth: 70,
  },
  typeButtonActive: {
    backgroundColor: '#E8F2FF',
  },
  typeLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  typeLabelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  searchForm: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  datePicker: {
    flex: 1,
  },
  dateInput: {
    borderWidth: 0,
    alignItems: 'flex-start',
  },
  passengerSelector: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passengerText: {
    fontSize: 16,
  },
  passengerControls: {
    flexDirection: 'row',
  },
  passengerButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  passengerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  searchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  results: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  operator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  resultBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: '500',
  },
  duration: {
    fontSize: 14,
    color: '#8E8E93',
  },
  resultFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seats: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
});
