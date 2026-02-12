/**
 * FOREIGNER_APP 环境配置
 */

// 开发环境配置
export const config = {
  // API配置
  api: {
    baseURL: 'https://api.foreigner-app.com/v1',
    timeout: 30000,
  },

  // MiniMax API
  minimax: {
    apiKey: process.env.MINIMAX_API_KEY || '',
    model: 'MiniMax-M2.1',
  },

  // 高德地图
  amap: {
    apiKey: process.env.AMAP_API_KEY || '',
    sdkKey: process.env.AMAP_SDK_KEY || '',
  },

  // Stripe支付
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  },

  // 应用配置
  app: {
    name: 'FOREIGNER',
    version: '1.0.0',
    buildNumber: '1',
  },

  // 功能开关
  features: {
    enableTranslation: true,
    enableMaps: true,
    enablePayment: true,
    enableChat: true,
    enableMysteryBox: true,
    enableBeReal: true,
    enableAIPlanning: true,
  },

  // 百度统计
  analytics: {
    appKey: process.env.BAIDU_ANALYTICS_KEY || '',
  },

  // 推送配置
  push: {
    enabled: true,
    fcmSenderId: process.env.FCM_SENDER_ID || '',
  },
};

// 开发环境
export const isDev = __DEV__;

export default config;
