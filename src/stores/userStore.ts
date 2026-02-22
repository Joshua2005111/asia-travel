import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  language: string;
  createdAt: Date;
}

export interface UserState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export interface UserStats {
  totalTrips: number;
  totalSpent: number;
  countriesVisited: number;
 翻译次数: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export const ACHIEVEMENTS: Achievement[] = [];

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  
  logout: async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
    set({ user: null, token: null });
  },
  
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
}));
