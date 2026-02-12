/**
 * FOREIGNER_APP 推送通知服务
 * 
 * 支持：
 * - FCM推送
 * - 本地推送
 * - 推送统计
 */

import PushNotification, {
  PushNotification as PushNotificationType,
  PushNotificationIOS,
} from 'react-native-push-notification';
import notifee from '@notifee/react-native';

// 通知配置
export const NOTIFICATION_CONFIG = {
  // 频道ID
  CHANNELS: {
    MESSAGES: 'messages',
    MYSTERY_BOX: 'mystery_box',
    BEREL: 'bereal',
    SYSTEM: 'system',
  },

  // 通知图标
  ICONS: {
    DEFAULT: 'ic_notification',
    MESSAGE: 'ic_message',
    MYSTERY: 'ic_mystery',
    BEREL: 'ic_camera',
  },

  // 通知优先级
  PRIORITY: {
    HIGH: 'high',
    DEFAULT: 'default',
  },
};

// 推送服务
export const notificationService = {
  /**
   * 初始化推送
   */
  async initialize(): Promise<void> {
    return new Promise((resolve) => {
      // 配置本地通知
      PushNotification.configure({
        // 请求权限
        onRegister: (token) => {
          console.log('[Push] Registered:', token);
          // 保存token到服务器
          this.saveToken(token);
        },

        // 通知点击
        onNotification: (notification) => {
          console.log('[Push] Notification:', notification);
          this.handleNotification(notification);
        },

        // Android权限
        senderID: process.env.FCM_SENDER_ID || '123456789',

        // iOS权限
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        // 弹出请求权限
        popInitialNotification: true,
        requestPermissions: true,
      });

      resolve();
    });
  },

  /**
   * 创建通知频道 (Android)
   */
  async createChannels(): Promise<void> {
    await notifee.createChannel({
      id: NOTIFICATION_CONFIG.CHANNELS.MESSAGES,
      name: 'Messages',
      importance: 4,
      sound: 'default',
    });

    await notifee.createChannel({
      id: NOTIFICATION_CONFIG.CHANNELS.MYSTERY_BOX,
      name: 'Mystery Box',
      importance: 4,
      sound: 'default',
    });

    await notifee.createChannel({
      id: NOTIFICATION_CONFIG.CHANNELS.BEREL,
      name: 'BeReal',
      importance: 4,
      sound: 'default',
    });

    await notifee.createChannel({
      id: NOTIFICATION_CONFIG.CHANNELS.SYSTEM,
      name: 'System',
      importance: 3,
      sound: 'default',
    });
  },

  /**
   * 显示本地通知
   */
  showLocalNotification(
    channelId: string,
    title: string,
    body: string,
    data?: object,
    bigPicture?: string
  ): void {
    PushNotification.localNotification({
      channelId,
      title,
      message: body,
      data,
      bigPictureStyle: bigPicture
        ? {
            'content-title': title,
            'big-text': body,
            'picture-url': bigPicture,
          }
        : undefined,
      userInfo: data,
      playSound: true,
      soundName: 'default',
      vibrate: true,
    });
  },

  /**
   * 显示BeReal推送
   */
  showBeRealPush(message: string = '📸 你现在在哪？全世界都在看！'): void {
    this.showLocalNotification(
      NOTIFICATION_CONFIG.CHANNELS.BEREL,
      'BeReal时间到！',
      message,
      { type: 'bereal' },
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600'
    );
  },

  /**
   * 显示盲盒推送
   */
  showMysteryBoxPush(message: string = '🎲 今日盲盒已更新，3个惊喜等你发现！'): void {
    this.showLocalNotification(
      NOTIFICATION_CONFIG.CHANNELS.MYSTERY_BOX,
      '盲盒时间到！',
      message,
      { type: 'mystery_box' }
    );
  },

  /**
   * 显示消息推送
   */
  showMessagePush(
    senderName: string,
    message: string,
    chatId: string
  ): void {
    this.showLocalNotification(
      NOTIFICATION_CONFIG.CHANNELS.MESSAGES,
      senderName,
      message,
      { type: 'message', chatId }
    );
  },

  /**
   * 调度本地通知 (定时推送)
   */
  scheduleNotification(
    channelId: string,
    title: string,
    body: string,
    date: Date,
    data?: object
  ): void {
    PushNotification.localNotificationSchedule({
      channelId,
      title,
      message: body,
      date,
      repeatType: undefined,
      userInfo: data,
      playSound: true,
      soundName: 'default',
    });
  },

  /**
   * 调度BeReal推送 (随机时间)
   */
  scheduleBeRealPush(): void {
    // 随机时间 (10:00 - 22:00之间)
    const hour = Math.floor(Math.random() * 12) + 10;
    const minute = Math.floor(Math.random() * 60);
    
    const now = new Date();
    const scheduledTime = new Date(now);
    scheduledTime.setHours(hour, minute, 0, 0);

    // 如果时间已过，调度到明天
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    this.scheduleNotification(
      NOTIFICATION_CONFIG.CHANNELS.BEREL,
      'BeReal时间到！',
      '📸 你现在在哪？全世界都在看！',
      scheduledTime,
      { type: 'bereal' }
    );
  },

  /**
   * 取消所有本地通知
   */
  cancelAllNotifications(): void {
    PushNotification.cancelAllLocalNotifications();
  },

  /**
   * 取消特定通知
   */
  cancelNotification(id: string): void {
    PushNotification.cancelLocalNotification(id);
  },

  /**
   * 设置Badge数量 (iOS)
   */
  setBadge(count: number): void {
    PushNotification.setApplicationIconBadgeNumber(count);
  },

  /**
   * 获取Badge数量
   */
  async getBadge(): Promise<number> {
    return new Promise((resolve) => {
      if (Platform.OS === 'ios') {
        PushNotificationIOS.getApplicationIconBadgeCount((count) => {
          resolve(count);
        });
      } else {
        resolve(0);
      }
    });
  },

  /**
   * 处理通知点击
   */
  handleNotification(notification: any): void {
    const { data } = notification;

    if (!data) return;

    switch (data.type) {
      case 'bereal':
        // 跳转到BeReal页面
        navigate('BeReal');
        break;
      case 'mystery_box':
        // 跳转到盲盒页面
        navigate('MysteryBox');
        break;
      case 'message':
        // 跳转到聊天页面
        if (data.chatId) {
          navigate('Chat', { chatId: data.chatId });
        }
        break;
      default:
        // 默认跳转到首页
        navigate('Home');
    }
  },

  /**
   * 保存Token到服务器
   */
  async saveToken(token: { token: string; os: string }): Promise<void> {
    try {
      await fetch(`${process.env.API_BASE_URL}/push/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(token),
      });
    } catch (error) {
      console.error('[Push] Save token failed:', error);
    }
  },

  /**
   * 统计通知点击
   */
  async trackClick(
    notificationId: string,
    action: string
  ): Promise<void> {
    try {
      await fetch(`${process.env.API_BASE_URL}/push/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          notificationId,
          action,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('[Push] Track failed:', error);
    }
  },
};

// 辅助函数
let navigateFunction: ((screen: string, params?: object) => void) | null = null;
export const setNavigateFunction = (fn: (screen: string, params?: object) => void) => {
  navigateFunction = fn;
};
const navigate = (screen: string, params?: object) => {
  if (navigateFunction) {
    navigateFunction(screen, params);
  }
};

let getAuthToken: () => string = () => '';
export const setAuthTokenGetter = (fn: () => string) => {
  getAuthToken = fn;
};

export default notificationService;
