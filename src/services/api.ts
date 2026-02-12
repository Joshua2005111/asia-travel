import axios, { AxiosInstance, AxiosError } from 'axios';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://api.foreigner-app.com/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = process.env.API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      switch (status) {
        case 401:
          console.error('Unauthorized - Invalid or expired token');
          break;
        case 403:
          console.error('Forbidden - Insufficient permissions');
          break;
        case 404:
          console.error('Not Found - Resource does not exist');
          break;
        case 429:
          console.error('Too Many Requests - Rate limit exceeded');
          break;
        case 500:
          console.error('Internal Server Error');
          break;
        default:
          console.error(`API Error: ${status}`, data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error - No response received');
    }
    return Promise.reject(error);
  }
);

// ==================== Translation API ====================

export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

export interface TranslationResponse {
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  confidence: number;
  pronunciation?: string;
}

export const translateAPI = {
  async translate(request: TranslationRequest): Promise<TranslationResponse> {
    const response = await apiClient.post<TranslationResponse>('/translate', request);
    return response.data;
  },

  async detectLanguage(text: string): Promise<string> {
    const response = await apiClient.post<{ language: string }>('/detect-language', { text });
    return response.data.language;
  },

  async getSupportedLanguages(): Promise<{ code: string; name: string }[]> {
    const response = await apiClient.get<{ code: string; name: string }[]>('/languages');
    return response.data;
  },
};

// ==================== Booking API ====================

export interface SearchParams {
  type: 'train' | 'flight' | 'car' | 'taxi';
  departure: string;
  arrival: string;
  date: string;
  passengers: number;
}

export interface BookingRequest {
  searchId: string;
  selectedOption: string;
  passengers: {
    name: string;
    passportId: string;
    phone?: string;
    email?: string;
  }[];
}

export interface BookingConfirmation {
  referenceNumber: string;
  status: string;
  details: Record<string, unknown>;
}

export const bookingAPI = {
  async search(params: SearchParams): Promise<unknown[]> {
    const response = await apiClient.post('/booking/search', params);
    return response.data;
  },

  async createBooking(request: BookingRequest): Promise<BookingConfirmation> {
    const response = await apiClient.post<BookingConfirmation>('/booking/create', request);
    return response.data;
  },

  async getBookingStatus(referenceNumber: string): Promise<BookingConfirmation> {
    const response = await apiClient.get<BookingConfirmation>(`/booking/${referenceNumber}`);
    return response.data;
  },

  async cancelBooking(referenceNumber: string): Promise<void> {
    await apiClient.post(`/booking/${referenceNumber}/cancel`);
  },

  async getBookingHistory(): Promise<BookingConfirmation[]> {
    const response = await apiClient.get<BookingConfirmation[]>('/booking/history');
    return response.data;
  },
};

// ==================== Payment API ====================

export interface PaymentRequest {
  bookingReference: string;
  amount: number;
  currency: string;
  paymentMethod: 'wechat' | 'alipay' | 'card';
}

export interface PaymentStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionId?: string;
  amount: number;
  currency: string;
}

export const paymentAPI = {
  async initiatePayment(request: PaymentRequest): Promise<{ paymentUrl: string; transactionId: string }> {
    const response = await apiClient.post('/payment/initiate', request);
    return response.data;
  },

  async checkPaymentStatus(transactionId: string): Promise<PaymentStatus> {
    const response = await apiClient.get<PaymentStatus>(`/payment/status/${transactionId}`);
    return response.data;
  },

  async processRefund(transactionId: string, amount?: number): Promise<{ refundId: string; status: string }> {
    const response = await apiClient.post(`/payment/refund`, { transactionId, amount });
    return response.data;
  },
};

// ==================== User API ====================

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

export const userAPI = {
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>('/user/profile');
    return response.data;
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put<UserProfile>('/user/profile', data);
    return response.data;
  },

  async updatePreferences(preferences: { preferredLanguages: string[]; notifications: boolean }): Promise<void> {
    await apiClient.put('/user/preferences', preferences);
  },

  async deleteAccount(): Promise<void> {
    await apiClient.delete('/user/account');
  },
};

// ==================== Location API ====================

export interface LocationSearchParams {
  query: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  type?: 'restaurant' | 'attraction' | 'hotel' | 'transport' | 'all';
}

export interface LocationResult {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type: string;
  rating?: number;
  reviews?: number;
  priceLevel?: number;
  imageUrl?: string;
  translatedName?: string;
  translatedAddress?: string;
}

export const locationAPI = {
  async search(params: LocationSearchParams): Promise<LocationResult[]> {
    const response = await apiClient.post<LocationResult[]>('/locations/search', params);
    return response.data;
  },

  async getDetails(placeId: string): Promise<LocationResult> {
    const response = await apiClient.get<LocationResult>(`/locations/${placeId}`);
    return response.data;
  },

  async getDirections(from: { lat: number; lng: number }, to: { lat: number; lng: number }): Promise<{ steps: string[]; distance: string; duration: string }> {
    const response = await apiClient.post('/locations/directions', { from, to });
    return response.data;
  },

  async getNearby(latitude: number, longitude: number, type?: string): Promise<LocationResult[]> {
    const response = await apiClient.get<LocationResult[]>('/locations/nearby', {
      params: { latitude, longitude, type },
    });
    return response.data;
  },
};

// ==================== Mystery Box API ====================

export interface MysteryBox {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  locations: string[];
  category: string;
  discount?: number;
  expiresAt?: string;
}

export const mysteryBoxAPI = {
  async getAvailableBoxes(): Promise<MysteryBox[]> {
    const response = await apiClient.get<MysteryBox[]>('/mystery-box/available');
    return response.data;
  },

  async getBoxDetails(boxId: string): Promise<MysteryBox> {
    const response = await apiClient.get<MysteryBox>(`/mystery-box/${boxId}`);
    return response.data;
  },

  async purchaseBox(boxId: string): Promise<{ purchaseId: string; redemptionCode: string }> {
    const response = await apiClient.post(`/mystery-box/${boxId}/purchase`);
    return response.data;
  },

  async revealContent(purchaseId: string): Promise<{ content: string; details: Record<string, unknown> }> {
    const response = await apiClient.post(`/mystery-box/reveal`, { purchaseId });
    return response.data;
  },
};

// ==================== Chat API ====================

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'local';
  content: string;
  timestamp: string;
  language?: string;
  translatedContent?: string;
}

export const chatAPI = {
  async sendMessage(message: string, context?: Record<string, unknown>): Promise<ChatMessage> {
    const response = await apiClient.post<ChatMessage>('/chat/send', { message, context });
    return response.data;
  },

  async getChatHistory(): Promise<ChatMessage[]> {
    const response = await apiClient.get<ChatMessage[]>('/chat/history');
    return response.data;
  },

  async clearHistory(): Promise<void> {
    await apiClient.delete('/chat/history');
  },
};

// ==================== Export API Client ====================

export default apiClient;
