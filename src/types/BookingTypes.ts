export type BookingType = 'train' | 'flight' | 'car' | 'taxi';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BookingSearch {
  type: BookingType;
  departure: string;
  arrival: string;
  date: Date;
  passengers: number;
}

export interface TrainResult {
  id: string;
  operator: string;
  trainNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  seats: SeatInfo[];
}

export interface FlightResult {
  id: string;
  operator: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  class: string;
}

export interface CarResult {
  id: string;
  provider: string;
  carType: string;
  seats: number;
  price: number;
  currency: string;
  features: string[];
}

export interface SeatInfo {
  type: string;
  available: number;
  price: number;
}

export interface BookingDetails {
  type: BookingType;
  operator: string;
  referenceNumber: string;
  departure: {
    station: string;
    time: string;
  };
  arrival: {
    station: string;
    time: string;
  };
  price: number;
  currency: string;
  passengers: PassengerInfo[];
  status: BookingStatus;
}

export interface PassengerInfo {
  name: string;
  passportId: string;
  phone?: string;
}

export interface BookingState {
  currentSearch: BookingSearch | null;
  searchResults: TrainResult[] | FlightResult[] | CarResult[];
  selectedBooking: BookingDetails | null;
  bookingHistory: BookingDetails[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setSearch: (search: BookingSearch) => void;
  setSearchResults: (results: TrainResult[] | FlightResult[] | CarResult[]) => void;
  selectBooking: (booking: BookingDetails | null) => void;
  addToHistory: (booking: BookingDetails) => void;
  cancelBooking: (bookingId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearSearch: () => void;
}
