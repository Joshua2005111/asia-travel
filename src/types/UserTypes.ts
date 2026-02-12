export interface UserPreferences {
  preferredLanguages: string[];
  notificationsEnabled: boolean;
  darkMode: boolean;
  currency: string;
  autoTranslate: boolean;
  showPricesInNativeCurrency: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  nationality: string;
  nativeLanguage: string;
  preferredLanguages: string[];
  createdAt: string;
}

export interface UserState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
  resetError: () => void;
}
