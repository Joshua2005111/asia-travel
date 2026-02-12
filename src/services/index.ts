/**
 * FOREIGNER_APP 服务层索引
 */

// 翻译相关
export { translationAPI, PRESET_PHRASES, SPEECH_CONFIG, TTS_CONFIG, LANGUAGE_CODES } from './TranslationAPI';

// 预订相关
export { default as BookingAPI } from './BookingAPI';

// 支付相关
export { default as PaymentAPI } from './PaymentAPI';

// 地图相关
export { default as amapService, POI_TYPES, POPULAR_CITIES } from './AmapService';

// AI服务相关
export { default as AIService } from './AIService';

// 推送相关
export { default as notificationService, NOTIFICATION_CONFIG } from './NotificationService';

// 分析相关
export { default as analytics } from './AnalyticsService';

// 认证相关
export { default as authService, type AuthResponse, type User } from './AuthService';

// 加密相关
export { default as encryptionService, secureErase } from './EncryptionService';

// 安全聊天相关
export { default as secureChatService, type ChatSession, type ChatMessage } from './SecureChatService';

// 内容审核相关
export { default as moderationService, type ModerationResult, type ReportReason } from './ModerationService';

// 中韩互动相关
export { default as crossBorderService, type MatchingConfig, type MatchPartner, type CultureContent } from './CrossBorderService';

// 榜单相关
export { default as rankingService, type RankingCategory, type RankingItem, type UserPoints, type Reward } from './RankingService';

// 论坛相关
export { default as forumService, type ForumTopic, type ForumPost, type ForumComment } from './ForumService';
