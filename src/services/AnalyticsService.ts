/**
 * FOREIGNER_APP 分析服务
 * 
 * 支持：
 * - 用户行为追踪
 * - 事件统计
 * - 用户属性
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// 分析服务
export const analytics = {
  /**
   * 初始化
   */
  async initialize(): Promise<void> {
    // 从服务器获取用户ID
    const userId = await this.getUserId();
    if (!userId) {
      const newUserId = this.generateUserId();
      await this.setUserId(newUserId);
    }
  },

  /**
   * 获取用户ID
   */
  async getUserId(): Promise<string | null> {
    return AsyncStorage.getItem('analytics_user_id');
  },

  /**
   * 设置用户ID
   */
  async setUserId(userId: string): Promise<void> {
    await AsyncStorage.setItem('analytics_user_id', userId);
  },

  /**
   * 生成用户ID
   */
  generateUserId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  /**
   * 追踪页面浏览
   */
  async trackPageView(
    pageName: string,
    params?: Record<string, any>
  ): Promise<void> {
    const event = {
      type: 'page_view',
      page_name: pageName,
      params,
      timestamp: new Date().toISOString(),
    };

    await this.sendEvent(event);
  },

  /**
   * 追踪点击事件
   */
  async trackClick(
    eventName: string,
    params?: Record<string, any>
  ): Promise<void> {
    const event = {
      type: 'click',
      event_name: eventName,
      params,
      timestamp: new Date().toISOString(),
    };

    await this.sendEvent(event);
  },

  /**
   * 追踪功能使用
   */
  async trackFeatureUsage(
    featureName: string,
    action: string,
    params?: Record<string, any>
  ): Promise<void> {
    const event = {
      type: 'feature_usage',
      feature_name: featureName,
      action,
      params,
      timestamp: new Date().toISOString(),
    };

    await this.sendEvent(event);
  },

  /**
   * 追踪错误
   */
  async trackError(
    errorType: string,
    errorMessage: string,
    stack?: string
  ): Promise<void> {
    const event = {
      type: 'error',
      error_type: errorType,
      error_message: errorMessage,
      stack,
      timestamp: new Date().toISOString(),
    };

    await this.sendEvent(event);
  },

  /**
   * 追踪用户属性
   */
  async setUserProperty(
    propertyName: string,
    propertyValue: any
  ): Promise<void> {
    const event = {
      type: 'user_property',
      property_name: propertyName,
      property_value: propertyValue,
      timestamp: new Date().toISOString(),
    };

    await this.sendEvent(event);
  },

  /**
   * 追踪转化
   */
  async trackConversion(
    conversionName: string,
    value?: number,
    params?: Record<string, any>
  ): Promise<void> {
    const event = {
      type: 'conversion',
      conversion_name: conversionName,
      value,
      params,
      timestamp: new Date().toISOString(),
    };

    await this.sendEvent(event);
  },

  /**
   * 发送事件
   */
  async sendEvent(event: Record<string, any>): Promise<void> {
    try {
      // 本地存储
      const events = await this.getEvents();
      events.push(event);
      
      // 最多保留100个事件
      if (events.length > 100) {
        events.shift();
      }
      
      await AsyncStorage.setItem('analytics_events', JSON.stringify(events));

      // 开发环境打印
      if (__DEV__) {
        console.log('[Analytics]', event.type, event.event_name || event.page_name);
      }

      // 批量发送到服务器 (实际项目中实现)
      // await this.flush();
    } catch (error) {
      console.error('[Analytics] Send failed:', error);
    }
  },

  /**
   * 获取本地事件
   */
  async getEvents(): Promise<Record<string, any>[]> {
    const eventsJson = await AsyncStorage.getItem('analytics_events');
    return eventsJson ? JSON.parse(eventsJson) : [];
  },

  /**
   * 清空本地事件
   */
  async clearEvents(): Promise<void> {
    await AsyncStorage.removeItem('analytics_events');
  },

  /**
   * 获取用户统计
   */
  async getUserStats(): Promise<UserStats> {
    const events = await this.getEvents();

    const stats: UserStats = {
      totalSessions: 1,
      totalPageViews: 0,
      totalClicks: 0,
      featuresUsed: {},
      firstSeen: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
    };

    events.forEach((event) => {
      if (event.type === 'page_view') {
        stats.totalPageViews++;
      } else if (event.type === 'click') {
        stats.totalClicks++;
      } else if (event.type === 'feature_usage') {
        const feature = event.feature_name;
        stats.featuresUsed[feature] = (stats.featuresUsed[feature] || 0) + 1;
      }
    });

    return stats;
  },

  /**
   * 预设事件追踪
   */
  presets: {
    // 启动App
    async appOpened(source?: string): Promise<void> {
      await analytics.trackConversion('app_open', undefined, { source });
    },

    // 完成引导
    async onboardingCompleted(): Promise<void> {
      await analytics.trackConversion('onboarding_completed');
      await analytics.setUserProperty('onboarding_completed', true);
    },

    // 使用盲盒
    async mysteryBoxOpened(source: 'home' | 'push' | 'direct'): Promise<void> {
      await analytics.trackFeatureUsage('mystery_box', 'opened', { source });
    },

    // 使用聊天
    async chatStarted(partnerCountry?: string): Promise<void> {
      await analytics.trackFeatureUsage('anonymous_chat', 'started', {
        partner_country: partnerCountry,
      });
    },

    // 使用翻译
    async translationUsed(type: 'text' | 'voice' | 'preset'): Promise<void> {
      await analytics.trackFeatureUsage('translation', type);
    },

    // 使用BeReal
    async berealPosted(): Promise<void> {
      await analytics.trackFeatureUsage('bereal', 'posted');
      await analytics.trackConversion('bereal_post');
    },

    // 打卡
    async checkIn(placeId: string): Promise<void> {
      await analytics.trackFeatureUsage('checkin', 'created', { place_id: placeId });
      await analytics.trackConversion('checkin');
    },

    // 收藏地点
    async placeSaved(placeId: string): Promise<void> {
      await analytics.trackFeatureUsage('favorite', 'added', { place_id: placeId });
    },

    // 分享
    async shared(contentType: string): Promise<void> {
      await analytics.trackFeatureUsage('share', contentType);
      await analytics.trackConversion('share');
    },
  },
};

// 类型定义
export interface UserStats {
  totalSessions: number;
  totalPageViews: number;
  totalClicks: number;
  featuresUsed: Record<string, number>;
  firstSeen: string;
  lastSeen: string;
}

export default analytics;
