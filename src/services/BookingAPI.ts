import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

class BookingAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth interceptor
    this.client.interceptors.request.use(async (config) => {
      // In a real app, get token from secure storage
      // const token = await SecureStore.getItemAsync('authToken');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    });
  }

  async searchTrain(params: {
    departure: string;
    arrival: string;
    date: string;
    passengers: number;
  }) {
    const response = await this.client.get('/booking/search/train', { params });
    return response.data;
  }

  async searchFlight(params: {
    departure: string;
    arrival: string;
    date: string;
    passengers: number;
  }) {
    const response = await this.client.get('/booking/search/flight', { params });
    return response.data;
  }

  async searchCar(params: {
    location: string;
    date: string;
    days: number;
  }) {
    const response = await this.client.get('/booking/search/car', { params });
    return response.data;
  }

  async createBooking(bookingData: {
    type: string;
    details: any;
    passengers: any[];
  }) {
    const response = await this.client.post('/booking/create', bookingData);
    return response.data;
  }

  async getBookingDetails(bookingId: string) {
    const response = await this.client.get(`/booking/${bookingId}`);
    return response.data;
  }

  async getBookingHistory() {
    const response = await this.client.get('/booking/history');
    return response.data;
  }

  async cancelBooking(bookingId: string) {
    const response = await this.client.delete(`/booking/${bookingId}`);
    return response.data;
  }

  // ==================== 支付相关 ====================

  /**
   * 创建支付订单
   */
  async createPaymentOrder(params: {
    bookingId: string;
    amount: number;
    currency: string;
    paymentMethod: 'wechat' | 'alipay' | 'card';
  }) {
    const response = await this.client.post('/payment/create', params);
    return response.data;
  }

  /**
   * 获取支付状态
   */
  async getPaymentStatus(paymentId: string) {
    const response = await this.client.get(`/payment/${paymentId}/status`);
    return response.data;
  }

  /**
   * 发起微信支付
   */
  async initiateWeChatPay(params: {
    bookingId: string;
    amount: number;
    description: string;
  }) {
    const response = await this.client.post('/payment/wechat', params);
    return response.data;
  }

  /**
   * 发起支付宝支付
   */
  async initiateAlipay(params: {
    bookingId: string;
    amount: number;
    description: string;
  }) {
    const response = await this.client.post('/payment/alipay', params);
    return response.data;
  }

  /**
   * 发起信用卡支付
   */
  async initiateCardPay(params: {
    bookingId: string;
    amount: number;
    currency: string;
    cardLast4: string;
  }) {
    const response = await this.client.post('/payment/card', params);
    return response.data;
  }

  /**
   * 申请退款
   */
  async refundPayment(params: {
    paymentId: string;
    amount: number;
    reason: string;
  }) {
    const response = await this.client.post('/payment/refund', params);
    return response.data;
  }
}

export const bookingAPI = new BookingAPI();
export default bookingAPI;
