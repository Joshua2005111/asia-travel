/**
 * FOREIGNER_APP 认证服务
 * 
 * 支持：
 * - 邮箱注册/登录
 * - 第三方登录 (Google, Apple, WeChat)
 * - Token管理
 */

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { analytics } from './AnalyticsService';

// API配置
const AUTH_CONFIG = {
  baseURL: 'https://api.kandedongma.com/v1',
  timeout: 30000,
};

// 认证服务
export const authService = {
  /**
   * 邮箱注册
   */
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${AUTH_CONFIG.baseURL}/auth/register`,
        {
          username,
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: AUTH_CONFIG.timeout,
        }
      );

      const { user, token } = response.data;

      // 保存Token
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // 追踪注册成功
      await analytics.trackConversion('registration_completed');

      return { success: true, user, token };
    } catch (error: any) {
      console.error('Register error:', error?.response?.data || error.message);
      return {
        success: false,
        error: error?.response?.data?.message || '注册失败，请稍后重试',
      };
    }
  },

  /**
   * 邮箱登录
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${AUTH_CONFIG.baseURL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: AUTH_CONFIG.timeout,
        }
      );

      const { user, token } = response.data;

      // 保存Token
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // 追踪登录成功
      await analytics.trackConversion('login_completed');

      return { success: true, user, token };
    } catch (error: any) {
      console.error('Login error:', error?.response?.data || error.message);
      return {
        success: false,
        error: error?.response?.data?.message || '登录失败，请检查邮箱和密码',
      };
    }
  },

  /**
   * 第三方登录
   */
  async socialLogin(
    provider: 'google' | 'apple' | 'wechat',
    token: string
  ): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${AUTH_CONFIG.baseURL}/auth/social`,
        {
          provider,
          access_token: token,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: AUTH_CONFIG.timeout,
        }
      );

      const { user, token: authToken } = response.data;

      // 保存Token
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('socialProvider', provider);

      await analytics.trackConversion('social_login_completed', undefined, {
        provider,
      });

      return { success: true, user, token: authToken };
    } catch (error: any) {
      console.error('Social login error:', error?.response?.data || error.message);
      return {
        success: false,
        error: error?.response?.data?.message || '第三方登录失败',
      };
    }
  },

  /**
   * 退出登录
   */
  async logout(): Promise<void> {
    try {
      const token = await AsyncStorage.getItem('authToken');

      if (token) {
        await axios.post(
          `${AUTH_CONFIG.baseURL}/auth/logout`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // 清除本地存储
      await AsyncStorage.multiRemove(['authToken', 'user', 'socialProvider']);
      await analytics.trackConversion('logout');
    }
  },

  /**
   * 获取当前Token
   */
  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem('authToken');
  },

  /**
   * 检查是否已登录
   */
  async isLoggedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem('authToken');
    return !!token;
  },

  /**
   * 获取用户信息
   */
  async getUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  },

  /**
   * 刷新Token
   */
  async refreshToken(): Promise<boolean> {
    try {
      const oldToken = await AsyncStorage.getItem('authToken');
      if (!oldToken) return false;

      const response = await axios.post(
        `${AUTH_CONFIG.baseURL}/auth/refresh`,
        {},
        {
          headers: { Authorization: `Bearer ${oldToken}` },
        }
      );

      const { token } = response.data;
      await AsyncStorage.setItem('authToken', token);
      return true;
    } catch (error) {
      console.error('Refresh token error:', error);
      await this.logout();
      return false;
    }
  },

  /**
   * 重置密码
   */
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      await axios.post(
        `${AUTH_CONFIG.baseURL}/auth/reset-password`,
        { email },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error?.response?.data?.message || '重置密码失败',
      };
    }
  },

  /**
   * 更新用户信息
   */
  async updateProfile(data: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const token = await this.getToken();
      if (!token) return { success: false, error: '未登录' };

      const response = await axios.patch(
        `${AUTH_CONFIG.baseURL}/auth/profile`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { user } = response.data;
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return { success: true, user };
    } catch (error: any) {
      return {
        success: false,
        error: error?.response?.data?.message || '更新失败',
      };
    }
  },

  /**
   * 绑定第三方账号
   */
  async linkSocial(
    provider: 'google' | 'apple' | 'wechat',
    token: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const authToken = await this.getToken();
      if (!authToken) return { success: false, error: '请先登录' };

      await axios.post(
        `${AUTH_CONFIG.baseURL}/auth/link-social`,
        {
          provider,
          access_token: token,
        },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error?.response?.data?.message || '绑定失败',
      };
    }
  },
};

// 类型定义
export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  country: string;
  language: string;
  level: number;
  exp: number;
  joinedAt: string;
  socialProviders?: string[];
}

export default authService;
