import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import bookingAPI from '../services/BookingAPI';

export interface PaymentMethod {
  id: string;
  type: 'wechat' | 'alipay' | 'card';
  name: string;
  icon: string;
  last4?: string;
  isDefault: boolean;
}

export interface PaymentState {
  // 支付方式列表
  paymentMethods: PaymentMethod[];
  
  // 当前支付方式
  selectedPaymentMethod: string | null;
  
  // 支付状态
  isProcessing: boolean;
  currentPaymentId: string | null;
  paymentStatus: 'idle' | 'processing' | 'success' | 'failed' | 'refunded';
  
  // 错误信息
  error: string | null;
  
  // Actions
  loadPaymentMethods: () => Promise<void>;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => Promise<void>;
  removePaymentMethod: (id: string) => Promise<void>;
  setDefaultPaymentMethod: (id: string) => Promise<void>;
  selectPaymentMethod: (id: string) => void;
  
  // 支付操作
  initiatePayment: (bookingId: string, amount: number, description: string) => Promise<boolean>;
  checkPaymentStatus: (paymentId: string) => Promise<boolean>;
  refundPayment: (paymentId: string, amount: number, reason: string) => Promise<boolean>;
  
  // 重置状态
  resetPaymentState: () => void;
}

const STORAGE_KEY = '@payment_methods';

export const usePaymentStore = create<PaymentState>((set, get) => ({
  // 初始状态
  paymentMethods: [],
  selectedPaymentMethod: null,
  isProcessing: false,
  currentPaymentId: null,
  paymentStatus: 'idle',
  error: null,

  // ==================== 支付方式管理 ====================

  loadPaymentMethods: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const methods = JSON.parse(data);
        set({ paymentMethods: methods });
      } else {
        // 默认支付方式
        const defaultMethods: PaymentMethod[] = [
          {
            id: 'wechat_default',
            type: 'wechat',
            name: '微信支付',
            icon: 'wechat',
            isDefault: true,
          },
          {
            id: 'alipay_default',
            type: 'alipay',
            name: '支付宝',
            icon: 'alipay',
            isDefault: false,
          },
        ];
        set({ paymentMethods: defaultMethods });
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMethods));
      }
    } catch (error) {
      console.error('Failed to load payment methods:', error);
    }
  },

  addPaymentMethod: async (method) => {
    try {
      const { paymentMethods } = get();
      const newMethod: PaymentMethod = {
        ...method,
        id: `${method.type}_${Date.now()}`,
      };
      
      const updatedMethods = [...paymentMethods, newMethod];
      set({ paymentMethods: updatedMethods });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMethods));
    } catch (error) {
      console.error('Failed to add payment method:', error);
    }
  },

  removePaymentMethod: async (id) => {
    try {
      const { paymentMethods } = get();
      const updatedMethods = paymentMethods.filter(m => m.id !== id);
      set({ paymentMethods: updatedMethods });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMethods));
    } catch (error) {
      console.error('Failed to remove payment method:', error);
    }
  },

  setDefaultPaymentMethod: async (id) => {
    try {
      const { paymentMethods } = get();
      const updatedMethods = paymentMethods.map(m => ({
        ...m,
        isDefault: m.id === id,
      }));
      set({ paymentMethods: updatedMethods });
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMethods));
    } catch (error) {
      console.error('Failed to set default payment method:', error);
    }
  },

  selectPaymentMethod: (id) => {
    set({ selectedPaymentMethod: id });
  },

  // ==================== 支付操作 ====================

  initiatePayment: async (bookingId, amount, description) => {
    const { selectedPaymentMethod, paymentMethods } = get();
    
    if (!selectedPaymentMethod) {
      Alert.alert('提示', '请选择支付方式');
      return false;
    }

    const method = paymentMethods.find(m => m.id === selectedPaymentMethod);
    if (!method) {
      Alert.alert('错误', '支付方式不存在');
      return false;
    }

    set({ isProcessing: true, paymentStatus: 'processing', error: null });

    try {
      let success = false;

      switch (method.type) {
        case 'wechat':
          const wechatResult = await bookingAPI.initiateWeChatPay({
            bookingId,
            amount,
            description,
          });
          if (wechatResult.status === 'success') {
            // 实际场景中会调用微信 SDK
            // const wechatPay = await WeChat.pay({ ... });
            set({ currentPaymentId: wechatResult.paymentId });
            success = true;
          }
          break;

        case 'alipay':
          const alipayResult = await bookingAPI.initiateAlipay({
            bookingId,
            amount,
            description,
          });
          if (alipayResult.status === 'success') {
            // 实际场景中会调用支付宝 SDK
            // const alipay = await Alipay.pay(alipayResult.payParams);
            set({ currentPaymentId: alipayResult.paymentId });
            success = true;
          }
          break;

        case 'card':
          const cardResult = await bookingAPI.initiateCardPay({
            bookingId,
            amount,
            currency: 'CNY',
            cardLast4: method.last4 || '****',
          });
          if (cardResult.status === 'success') {
            set({ currentPaymentId: cardResult.paymentId });
            success = true;
          }
          break;
      }

      if (success) {
        set({ paymentStatus: 'success', isProcessing: false });
        return true;
      } else {
        set({ paymentStatus: 'failed', isProcessing: false });
        return false;
      }
    } catch (error: any) {
      console.error('Payment failed:', error);
      set({ 
        paymentStatus: 'failed', 
        isProcessing: false,
        error: error.message || '支付失败，请重试'
      });
      return false;
    }
  },

  checkPaymentStatus: async (paymentId) => {
    try {
      const result = await bookingAPI.getPaymentStatus(paymentId);
      
      if (result.status === 'success') {
        set({ paymentStatus: 'success' });
        return true;
      } else if (result.status === 'pending') {
        // 支付中，继续等待
        set({ paymentStatus: 'processing' });
        return false;
      } else {
        set({ paymentStatus: 'failed' });
        return false;
      }
    } catch (error) {
      console.error('Failed to check payment status:', error);
      return false;
    }
  },

  refundPayment: async (paymentId, amount, reason) => {
    set({ isProcessing: true, error: null });

    try {
      const result = await bookingAPI.refundPayment({
        paymentId,
        amount,
        reason,
      });

      if (result.status === 'success') {
        set({ paymentStatus: 'refunded', isProcessing: false });
        return true;
      } else {
        set({ paymentStatus: 'failed', isProcessing: false });
        return false;
      }
    } catch (error: any) {
      console.error('Refund failed:', error);
      set({ 
        paymentStatus: 'failed', 
        isProcessing: false,
        error: error.message || '退款失败，请重试'
      });
      return false;
    }
  },

  // ==================== 重置状态 ====================

  resetPaymentState: () => {
    set({
      isProcessing: false,
      currentPaymentId: null,
      paymentStatus: 'idle',
      error: null,
    });
  },
}));

export default usePaymentStore;
