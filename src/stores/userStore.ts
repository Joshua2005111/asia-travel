/**
 * 看得懂吗 - 用户Store
 * 
 * 用户状态管理
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 用户类型
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  country: string;
  language: string;
  level: number;
  exp: number;
  joinedAt: string;
}

// 用户Store
interface UserStore {
  // 状态
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  token: string | null;

  // Actions
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addExp: (amount: number) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  // 初始状态
  user: null,
  isLoggedIn: false,
  isLoading: false,
  token: null,

  // 设置用户
  setUser: (user) => {
    set({ user, isLoggedIn: true });
    AsyncStorage.setItem('user', JSON.stringify(user));
  },

  // 设置Token
  setToken: (token) => {
    set({ token });
    AsyncStorage.setItem('token', token);
  },

  // 退出登录
  logout: () => {
    set({ user: null, token: null, isLoggedIn: false });
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('token');
  },

  // 更新资料
  updateProfile: (data) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, ...data };
      set({ user: updatedUser });
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  },

  // 增加经验
  addExp: (amount) => {
    const { user } = get();
    if (user) {
      const newExp = user.exp + amount;
      const newLevel = Math.floor(newExp / 100) + 1;
      const updatedUser = { ...user, exp: newExp, level: newLevel };
      set({ user: updatedUser });
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  },

  // 登录
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟用户数据
      const mockUser: User = {
        id: 'user_' + Date.now(),
        username: email.split('@')[0],
        email,
        country: 'US',
        language: 'en',
        level: 1,
        exp: 0,
        joinedAt: new Date().toISOString(),
      };

      const mockToken = 'token_' + Date.now();

      get().setUser(mockUser);
      get().setToken(mockToken);
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },

  // 注册
  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟用户数据
      const mockUser: User = {
        id: 'user_' + Date.now(),
        username,
        email,
        country: 'US',
        language: 'en',
        level: 1,
        exp: 0,
        joinedAt: new Date().toISOString(),
      };

      const mockToken = 'token_' + Date.now();

      get().setUser(mockUser);
      get().setToken(mockToken);
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      return false;
    }
  },
}));

// 导出类型
export type { User };
