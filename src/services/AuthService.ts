import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthResult {
  success: boolean;
  user?: any;
  token?: string;
  error?: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'userToken';
  private readonly USER_KEY = 'userData';

  // Simulated login (replace with real API)
  async login(email: string, password: string): Promise<AuthResult> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo user (replace with real authentication)
      const user = {
        id: Date.now().toString(),
        username: email.split('@')[0],
        email,
        avatar: undefined,
        language: 'en',
        createdAt: new Date()
      };
      
      const token = `demo_token_${Date.now()}`;
      
      // Save to storage
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      return { success: true, user, token };
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' };
    }
  }

  // Simulated register
  async register(username: string, email: string, password: string): Promise<AuthResult> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: Date.now().toString(),
        username,
        email,
        avatar: undefined,
        language: 'en',
        createdAt: new Date()
      };
      
      const token = `demo_token_${Date.now()}`;
      
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      return { success: true, user, token };
    } catch (error: any) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  }

  // Check if user is logged in
  async isLoggedIn(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(this.TOKEN_KEY);
      return !!token;
    } catch {
      return false;
    }
  }

  // Get stored token
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(this.TOKEN_KEY);
  }

  // Get stored user
  async getUser(): Promise<any | null> {
    try {
      const userData = await AsyncStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  // Logout
  async logout(): Promise<void> {
    await AsyncStorage.multiRemove([this.TOKEN_KEY, this.USER_KEY]);
  }
}

export const authService = new AuthService();
