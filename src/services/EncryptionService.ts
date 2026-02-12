/**
 * 🔐 FOREIGNER_APP 数据加密服务
 * 
 * 功能：
 * - AES-256 加密
 * - 安全存储
 * - 数据脱敏
 */

import CryptoJS from 'crypto-js';

// 加密密钥（实际项目中存储在后端或安全区域）
const ENCRYPTION_KEY = 'kandedongma_2024_secret_key';

// 加密服务
export const encryptionService = {
  /**
   * 加密字符串
   */
  encrypt(text: string): string {
    try {
      const encrypted = CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      return text;
    }
  },

  /**
   * 解密字符串
   */
  decrypt(encryptedText: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      return encryptedText;
    }
  },

  /**
   * 哈希密码
   */
  hashPassword(password: string): string {
    return CryptoJS.SHA256(password + ENCRYPTION_KEY).toString();
  },

  /**
   * 生成随机Token
   */
  generateToken(): string {
    const random = CryptoJS.lib.WordArray.random(32);
    return random.toString();
  },

  /**
   * 加密对象
   */
  encryptObject<T>(data: T): string {
    try {
      const jsonString = JSON.stringify(data);
      return this.encrypt(jsonString);
    } catch (error) {
      console.error('Encrypt object error:', error);
      return '';
    }
  },

  /**
   * 解密对象
   */
  decryptObject<T>(encryptedData: string): T | null {
    try {
      const decrypted = this.decrypt(encryptedData);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decrypt object error:', error);
      return null;
    }
  },

  /**
   * 数据脱敏 - 邮箱
   */
  maskEmail(email: string): string {
    const [local, domain] = email.split('@');
    if (local.length <= 2) {
      return `**@${domain}`;
    }
    const masked = local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
    return `${masked}@${domain}`;
  },

  /**
   * 数据脱敏 - 手机号
   */
  maskPhone(phone: string): string {
    if (phone.length < 7) return '****';
    return phone.slice(0, 3) + '****' + phone.slice(-2);
  },

  /**
   * 数据脱敏 - 用户名
   */
  maskUsername(username: string): string {
    if (username.length <= 2) return '**';
    return username[0] + '*'.repeat(username.length - 1);
  },

  /**
   * 数据脱敏 - 聊天内容
   */
  maskChatMessage(message: string): string {
    // 移除敏感信息
    return message
      .replace(/\d{11}/g, '***') // 手机号
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '***@***.***') // 邮箱
      .replace(/\b\d{6}\b/g, '******'); // 身份证号
  },

  /**
   * 安全比较字符串
   */
  secureCompare(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  },

  /**
   * 生成安全的随机数
   */
  secureRandom(min: number, max: number): number {
    const range = max - min + 1;
    const bytes = CryptoJS.lib.WordArray.random(4);
    const num = parseInt(bytes.toString().slice(0, 8), 16);
    return (num % range) + min;
  },

  /**
   * 加密存储到本地
   */
  async secureStore(key: string, data: any): Promise<void> {
    try {
      const encrypted = this.encryptObject(data);
      if (encrypted) {
        AsyncStorage.setItem(key, encrypted);
      }
    } catch (error) {
      console.error('Secure store error:', error);
    }
  },

  /**
   * 从本地解密读取
   */
  async secureRetrieve<T>(key: string): Promise<T | null> {
    try {
      const encrypted = await AsyncStorage.getItem(key);
      if (encrypted) {
        return this.decryptObject<T>(encrypted);
      }
      return null;
    } catch (error) {
      console.error('Secure retrieve error:', error);
      return null;
    }
  },
};

// 安全擦除（内存中）
export const secureErase = {
  /**
   * 安全擦除字符串
   */
  string(str: string): void {
    // 用0覆盖原字符串
    for (let i = 0; i < str.length; i++) {
      str = str.substring(0, i) + '\0' + str.substring(i + 1);
    }
  },

  /**
   * 安全擦除对象
   */
  object(obj: any): void {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        this.string(obj[key]);
      } else if (typeof obj[key] === 'object') {
        this.object(obj[key]);
      }
    }
  },
};

export default encryptionService;
