import { create } from 'zustand';
import { BookingState } from '../types/BookingTypes';

export const useBookingStore = create<BookingState>((set) => ({
  currentSearch: null,
  searchResults: [],
  selectedBooking: null,
  bookingHistory: [],
  isLoading: false,
  error: null,

  setSearch: (search) => set({ currentSearch: search }),

  setSearchResults: (results) => set({ searchResults: results }),

  selectBooking: (booking) => set({ selectedBooking: booking }),

  addToHistory: (booking) =>
    set((state) => ({
      bookingHistory: [booking, ...state.bookingHistory],
    })),

  cancelBooking: (bookingId) =>
    set((state) => ({
      bookingHistory: state.bookingHistory.map((booking) =>
        booking.referenceNumber === bookingId
          ? { ...booking, status: 'cancelled' as const }
          : booking
      ),
    })),

  setLoading: (loading) => set({ isLoading: loading }),

  setError: (error) => set({ error }),

  clearSearch: () =>
    set({
      currentSearch: null,
      searchResults: [],
      selectedBooking: null,
      error: null,
    }),
}));
