import axios, { AxiosInstance, AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  private client: AxiosInstance;
  private static instance: ApiService;

  private constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - clear storage and redirect to login
          SecureStore.deleteItemAsync('authToken');
          SecureStore.deleteItemAsync('userData');
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // Auth endpoints
  async register(email: string, password: string, phone?: string, passportId?: string) {
    const response = await this.client.post('/auth/register', {
      email,
      password,
      phone,
      passportId,
    });
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async logout() {
    await this.client.post('/auth/logout');
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('userData');
  }

  async getProfile() {
    const response = await this.client.get('/auth/profile');
    return response.data;
  }

  async updateProfile(data: any) {
    const response = await this.client.put('/auth/profile', data);
    return response.data;
  }

  // Translate endpoints
  async translateText(text: string, sourceLang: string, targetLang: string) {
    const response = await this.client.post('/translate/text', {
      text,
      sourceLang,
      targetLang,
    });
    return response.data;
  }

  async translateVoice(audioData: string, targetLang: string) {
    const response = await this.client.post('/translate/voice', {
      audioData,
      targetLang,
    });
    return response.data;
  }

  async getSupportedLanguages() {
    const response = await this.client.get('/translate/languages');
    return response.data;
  }

  async getTranslationHistory() {
    const response = await this.client.get('/translate/history');
    return response.data;
  }

  // Maps endpoints
  async searchPlaces(query: string, lat?: number, lng?: number, type?: string) {
    const params: any = { query };
    if (lat !== undefined) params.lat = lat;
    if (lng !== undefined) params.lng = lng;
    if (type) params.type = type;

    const response = await this.client.get('/maps/search', { params });
    return response.data;
  }

  async getNearbyPlaces(lat: number, lng: number, radius?: number, type?: string) {
    const params: any = { lat, lng };
    if (radius) params.radius = radius;
    if (type) params.type = type;

    const response = await this.client.get('/maps/nearby', { params });
    return response.data;
  }

  async getDirections(origin: string, destination: string, mode?: string) {
    const params: any = { origin, destination };
    if (mode) params.mode = mode;

    const response = await this.client.get('/maps/directions', { params });
    return response.data;
  }

  async getPlaceDetails(placeId: string) {
    const response = await this.client.get(`/maps/place/${placeId}`);
    return response.data;
  }

  async saveFavoritePlace(placeId: string) {
    const response = await this.client.post('/maps/favorites', { placeId });
    return response.data;
  }

  async getFavoritePlaces() {
    const response = await this.client.get('/maps/favorites');
    return response.data;
  }

  // Payment endpoints
  async createPaymentIntent(amount: number, currency: string, bookingId?: string, description?: string) {
    const response = await this.client.post('/payment/create-intent', {
      amount,
      currency,
      bookingId,
      description,
    });
    return response.data;
  }

  async confirmPayment(paymentIntentId: string) {
    const response = await this.client.post('/payment/confirm', { paymentIntentId });
    return response.data;
  }

  async getPaymentHistory() {
    const response = await this.client.get('/payment/history');
    return response.data;
  }

  async requestRefund(paymentIntentId: string, reason?: string) {
    const response = await this.client.post('/payment/refund', {
      paymentIntentId,
      reason,
    });
    return response.data;
  }
}

export const api = ApiService.getInstance();
export default api;
