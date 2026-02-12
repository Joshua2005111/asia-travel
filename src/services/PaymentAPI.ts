import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

class PaymentAPI {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

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
   * 处理支付回调
   */
  async handlePaymentCallback(callbackData: any) {
    const response = await this.client.post('/payment/callback', callbackData);
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

  /**
   * 获取支付方式列表
   */
  async getAvailablePaymentMethods() {
    const response = await this.client.get('/payment/methods');
    return response.data;
  }

  /**
   * 验证支付签名
   */
  async verifyPaymentSignature(params: {
    paymentId: string;
    signature: string;
  }) {
    const response = await this.client.post('/payment/verify', params);
    return response.data;
  }
}

export const paymentAPI = new PaymentAPI();
export default paymentAPI;
