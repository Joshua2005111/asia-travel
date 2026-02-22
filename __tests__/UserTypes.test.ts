/**
 * Test for User Types
 */

import { UserPreferences, UserProfile, UserState } from '../src/types/UserTypes';

describe('User Types', () => {
  describe('UserPreferences', () => {
    it('should have all required properties', () => {
      const prefs: UserPreferences = {
        preferredLanguages: ['en', 'zh'],
        notificationsEnabled: true,
        darkMode: false,
        currency: 'CNY',
        autoTranslate: true,
        showPricesInNativeCurrency: true,
      };

      expect(prefs.preferredLanguages).toBeDefined();
      expect(prefs.notificationsEnabled).toBeDefined();
      expect(prefs.darkMode).toBeDefined();
      expect(prefs.currency).toBeDefined();
      expect(prefs.autoTranslate).toBeDefined();
      expect(prefs.showPricesInNativeCurrency).toBeDefined();
    });

    it('should accept valid currency codes', () => {
      const validCurrencies = ['CNY', 'USD', 'EUR', 'KRW', 'JPY', 'GBP'];
      
      validCurrencies.forEach(currency => {
        const prefs: UserPreferences = {
          preferredLanguages: [],
          notificationsEnabled: true,
          darkMode: false,
          currency,
          autoTranslate: false,
          showPricesInNativeCurrency: false,
        };
        expect(prefs.currency).toBe(currency);
      });
    });
  });

  describe('UserProfile', () => {
    it('should have required properties', () => {
      const profile: UserProfile = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        nationality: 'US',
        nativeLanguage: 'en',
        preferredLanguages: ['en', 'zh'],
        createdAt: '2026-01-01T00:00:00Z',
      };

      expect(profile.id).toBeDefined();
      expect(profile.name).toBeDefined();
      expect(profile.email).toBeDefined();
      expect(profile.nationality).toBeDefined();
      expect(profile.nativeLanguage).toBeDefined();
      expect(profile.preferredLanguages).toBeDefined();
      expect(profile.createdAt).toBeDefined();
    });

    it('should allow optional avatar', () => {
      const profileWithAvatar: UserProfile = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://example.com/avatar.jpg',
        nationality: 'US',
        nativeLanguage: 'en',
        preferredLanguages: [],
        createdAt: '2026-01-01T00:00:00Z',
      };

      const profileWithoutAvatar: UserProfile = {
        id: '456',
        name: 'Jane Doe',
        email: 'jane@example.com',
        nationality: 'UK',
        nativeLanguage: 'en',
        preferredLanguages: [],
        createdAt: '2026-01-01T00:00:00Z',
      };

      expect(profileWithAvatar.avatar).toBeDefined();
      expect(profileWithoutAvatar.avatar).toBeUndefined();
    });
  });

  describe('UserState', () => {
    it('should have all required state properties', () => {
      const state: Partial<UserState> = {
        isAuthenticated: false,
        user: null,
        preferences: {
          preferredLanguages: [],
          notificationsEnabled: true,
          darkMode: false,
          currency: 'CNY',
          autoTranslate: true,
          showPricesInNativeCurrency: false,
        },
        isLoading: false,
        error: null,
      };

      expect(state.isAuthenticated).toBeDefined();
      expect(state.user).toBeDefined();
      expect(state.preferences).toBeDefined();
      expect(state.isLoading).toBeDefined();
      expect(state.error).toBeDefined();
    });

    it('should have all required action methods', () => {
      const actions: UserState = {
        isAuthenticated: false,
        user: null,
        preferences: {
          preferredLanguages: [],
          notificationsEnabled: true,
          darkMode: false,
          currency: 'CNY',
          autoTranslate: false,
          showPricesInNativeCurrency: false,
        },
        isLoading: false,
        error: null,
        setUser: jest.fn(),
        updateProfile: jest.fn(),
        updatePreferences: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        login: jest.fn(),
        logout: jest.fn(),
        deleteAccount: jest.fn(),
        resetError: jest.fn(),
      };

      expect(typeof actions.setUser).toBe('function');
      expect(typeof actions.updateProfile).toBe('function');
      expect(typeof actions.updatePreferences).toBe('function');
      expect(typeof actions.setLoading).toBe('function');
      expect(typeof actions.setError).toBe('function');
      expect(typeof actions.login).toBe('function');
      expect(typeof actions.logout).toBe('function');
      expect(typeof actions.deleteAccount).toBe('function');
      expect(typeof actions.resetError).toBe('function');
    });
  });
});
