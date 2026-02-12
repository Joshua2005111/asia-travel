import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  phone?: string;
  preferences?: {
    language?: string;
    currency?: string;
    emergencyContact?: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, phone?: string, passportId?: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      const data = await api.login(email, password);
      await SecureStore.setItemAsync('authToken', data.token);
      await SecureStore.setItemAsync('userData', JSON.stringify(data.user));
      set({ user: data.user, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  register: async (email: string, password: string, phone?: string, passportId?: string) => {
    try {
      const data = await api.register(email, password, phone, passportId);
      await SecureStore.setItemAsync('authToken', data.token);
      await SecureStore.setItemAsync('userData', JSON.stringify(data.user));
      set({ user: data.user, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
      set({ user: null, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const userDataStr = await SecureStore.getItemAsync('userData');
      if (userDataStr) {
        const user = JSON.parse(userDataStr);
        // Verify token is still valid
        await api.getProfile();
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      // Token invalid or expired
      await SecureStore.deleteItemAsync('authToken');
      await SecureStore.deleteItemAsync('userData');
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: (data: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      set({ user: updatedUser });
      SecureStore.setItemAsync('userData', JSON.stringify(updatedUser));
    }
  },
}));

// Settings store
interface SettingsState {
  language: string;
  currency: string;
  darkMode: boolean;
  notifications: boolean;
  setLanguage: (lang: string) => void;
  setCurrency: (currency: string) => void;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'en',
  currency: 'USD',
  darkMode: false,
  notifications: true,

  setLanguage: (language: string) => set({ language }),
  setCurrency: (currency: string) => set({ currency }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
}));

// Translation history store
interface Translation {
  id: string;
  original: string;
  translation: string;
  sourceLang: string;
  targetLang: string;
  timestamp: Date;
}

interface TranslationHistoryState {
  history: Translation[];
  addTranslation: (translation: Omit<Translation, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  deleteTranslation: (id: string) => void;
}

export const useTranslationHistoryStore = create<TranslationHistoryState>((set) => ({
  history: [],

  addTranslation: (translation) => {
    const newTranslation: Translation = {
      ...translation,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    set((state) => ({
      history: [newTranslation, ...state.history].slice(0, 100), // Keep last 100
    }));
  },

  clearHistory: () => set({ history: [] }),

  deleteTranslation: (id: string) => {
    set((state) => ({
      history: state.history.filter((t) => t.id !== id),
    }));
  },
}));
