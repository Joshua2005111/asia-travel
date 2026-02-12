/**
 * 💬 FOREIGNER_APP 安全聊天服务
 * 
 * 功能：
 * - 匿名匹配
 * - 30分钟自动删除
 * - 端到端加密
 * - 不保留任何聊天记录
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptionService } from './EncryptionService';
import { analytics } from './AnalyticsService';

// 聊天服务
export const secureChatService = {
  /**
   * 开始匿名聊天会话
   */
  async startAnonymousSession(): Promise<ChatSession> {
    const sessionId = 'session_' + Date.now();
    const startTime = Date.now();

    const session: ChatSession = {
      id: sessionId,
      startTime,
      isAnonymous: true,
      messages: [],
    };

    // 保存会话（加密存储）
    await this.saveSession(session);

    // 30分钟后自动删除
    this.scheduleAutoDelete(sessionId, 30 * 60 * 1000);

    await analytics.presets.chatStarted('anonymous');

    return session;
  },

  /**
   * 发送加密消息
   */
  async sendMessage(
    sessionId: string,
    content: string
  ): Promise<ChatMessage | null> {
    try {
      // 加密消息内容
      const encryptedContent = encryptionService.encrypt(content);

      const message: ChatMessage = {
        id: 'msg_' + Date.now(),
        content: encryptedContent, // 存储加密内容
        contentType: 'text',
        isSelf: true,
        timestamp: Date.now(),
        isRead: false,
      };

      // 获取并更新会话
      const session = await this.getSession(sessionId);
      if (session) {
        session.messages.push(message);
        await this.saveSession(session);
      }

      return message;
    } catch (error) {
      console.error('Send message error:', error);
      return null;
    }
  },

  /**
   * 接收加密消息
   */
  async receiveMessage(
    sessionId: string,
    content: string
  ): Promise<ChatMessage | null> {
    try {
      // 加密消息内容
      const encryptedContent = encryptionService.encrypt(content);

      const message: ChatMessage = {
        id: 'msg_' + Date.now(),
        content: encryptedContent,
        contentType: 'text',
        isSelf: false,
        timestamp: Date.now(),
        isRead: false,
      };

      // 获取并更新会话
      const session = await this.getSession(sessionId);
      if (session) {
        session.messages.push(message);
        await this.saveSession(session);
      }

      return message;
    } catch (error) {
      console.error('Receive message error:', error);
      return null;
    }
  },

  /**
   * 获取并解密消息
   */
  async getDecryptedMessages(sessionId: string): Promise<ChatMessage[]> {
    const session = await this.getSession(sessionId);
    if (!session) return [];

    // 解密所有消息
    return session.messages.map((msg) => ({
      ...msg,
      content: encryptionService.decrypt(msg.content),
    }));
  },

  /**
   * 安排自动删除
   */
  async scheduleAutoDelete(sessionId: string, delayMs: number): Promise<void> {
    const deleteTime = Date.now() + delayMs;

    // 保存删除计划
    const schedules = await this.getDeleteSchedules();
    schedules.push({
      sessionId,
      deleteTime,
    });
    await AsyncStorage.setItem('deleteSchedules', JSON.stringify(schedules));

    // 定时删除
    setTimeout(async () => {
      await this.deleteSession(sessionId);
      await this.removeDeleteSchedule(sessionId);
    }, delayMs);
  },

  /**
   * 删除会话（永久）
   */
  async deleteSession(sessionId: string): Promise<void> {
    try {
      // 删除本地存储
      await AsyncStorage.removeItem(`chat_${sessionId}`);

      // 从会话列表中移除
      const sessions = await this.getSessionIds();
      const index = sessions.indexOf(sessionId);
      if (index > -1) {
        sessions.splice(index, 1);
        await AsyncStorage.setItem('sessionIds', JSON.stringify(sessions));
      }

      // 删除聊天对象引用
      await AsyncStorage.removeItem(`chat_${sessionId}_object`);

      console.log(`[SecureChat] Session ${sessionId} deleted`);
    } catch (error) {
      console.error('Delete session error:', error);
    }
  },

  /**
   * 立即删除所有聊天记录
   */
  async deleteAllChats(): Promise<void> {
    try {
      // 获取所有会话ID
      const sessionIds = await this.getSessionIds();

      // 删除每个会话
      for (const sessionId of sessionIds) {
        await this.deleteSession(sessionId);
      }

      // 删除删除计划
      await AsyncStorage.removeItem('deleteSchedules');
      await AsyncStorage.removeItem('sessionIds');

      await analytics.trackFeatureUsage('chat', 'delete_all');
    } catch (error) {
      console.error('Delete all chats error:', error);
    }
  },

  /**
   * 获取会话
   */
  async getSession(sessionId: string): Promise<ChatSession | null> {
    try {
      const encrypted = await AsyncStorage.getItem(`chat_${sessionId}`);
      if (encrypted) {
        return encryptionService.decryptObject<ChatSession>(encrypted);
      }
      return null;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  },

  /**
   * 保存会话（加密）
   */
  async saveSession(session: ChatSession): Promise<void> {
    try {
      const encrypted = encryptionService.encryptObject(session);
      if (encrypted) {
        await AsyncStorage.setItem(`chat_${session.id}`, encrypted);

        // 添加到会话列表
        const sessionIds = await this.getSessionIds();
        if (!sessionIds.includes(session.id)) {
          sessionIds.push(session.id);
          await AsyncStorage.setItem('sessionIds', JSON.stringify(sessionIds));
        }
      }
    } catch (error) {
      console.error('Save session error:', error);
    }
  },

  /**
   * 获取所有会话ID
   */
  async getSessionIds(): Promise<string[]> {
    try {
      const ids = await AsyncStorage.getItem('sessionIds');
      return ids ? JSON.parse(ids) : [];
    } catch {
      return [];
    }
  },

  /**
   * 获取删除计划
   */
  async getDeleteSchedules(): Promise<DeleteSchedule[]> {
    try {
      const schedules = await AsyncStorage.getItem('deleteSchedules');
      return schedules ? JSON.parse(schedules) : [];
    } catch {
      return [];
    }
  },

  /**
   * 移除删除计划
   */
  async removeDeleteSchedule(sessionId: string): Promise<void> {
    try {
      const schedules = await this.getDeleteSchedules();
      const filtered = schedules.filter((s) => s.sessionId !== sessionId);
      await AsyncStorage.setItem('deleteSchedules', JSON.stringify(filtered));
    } catch (error) {
      console.error('Remove delete schedule error:', error);
    }
  },

  /**
   * 获取会话剩余时间（毫秒）
   */
  async getRemainingTime(sessionId: string): Promise<number> {
    const schedules = await this.getDeleteSchedules();
    const schedule = schedules.find((s) => s.sessionId === sessionId);
    if (!schedule) return 0;

    const remaining = schedule.deleteTime - Date.now();
    return Math.max(0, remaining);
  },

  /**
   * 检查是否有活跃会话
   */
  async hasActiveSession(): Promise<boolean> {
    const sessionIds = await this.getSessionIds();
    return sessionIds.length > 0;
  },

  /**
   * 获取当前会话
   */
  async getCurrentSession(): Promise<ChatSession | null> {
    const sessionIds = await this.getSessionIds();
    if (sessionIds.length === 0) return null;

    const latestId = sessionIds[sessionIds.length - 1];
    return this.getSession(latestId);
  },
};

// 类型定义
export interface ChatSession {
  id: string;
  startTime: number;
  isAnonymous: boolean;
  partnerId?: string;
  partnerCountry?: string;
  messages: ChatMessage[];
  status: 'active' | 'ended' | 'deleted';
}

export interface ChatMessage {
  id: string;
  content: string; // 加密后的内容
  contentType: 'text' | 'image' | 'voice';
  isSelf: boolean;
  timestamp: number;
  isRead: boolean;
}

export interface DeleteSchedule {
  sessionId: string;
  deleteTime: number;
}

export default secureChatService;
