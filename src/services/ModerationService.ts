/**
 * 🚨 FOREIGNER_APP 内容审核服务
 * 
 * 功能：
 * - 敏感词过滤
 * - 内容安全检测
 * - 危险交易识别
 * - 举报系统
 */

import axios from 'axios';

// 敏感词库（示例，实际项目中更完善）
const SENSITIVE_WORDS = [
  // 违禁品
  '毒品', 'drug', 'cocaine', 'heroin', '大麻', 'marijuana',
  // 武器
  '枪', 'gun', '刀', 'knife', '武器', 'weapon',
  // 诈骗
  '诈骗', 'fraud', 'scam', '骗子', '诈骗犯',
  // 色情
  '裸照', '色情', 'porn', 'sex',
  // 赌博
  '赌博', '赌钱', 'gambling', 'casino',
  // 器官交易
  '器官', 'organ',
  // 人口贩卖
  '贩卖', 'trafficking', 'slavery',
];

// 危险交易关键词
const DANGEROUS_TRANSACTIONS = [
  '私下交易', '微信转账', '支付宝转账', '银行转账',
  '先付款', '交保证金', 'VIP会员费', '解锁费用',
  '免费试用', '超值优惠', '限量供应', '限时抢购',
  '海外代购', '清关费', '关税',
];

// 审核服务
export const moderationService = {
  /**
   * 检测消息安全性
   */
  async checkMessage(
    message: string,
    senderId: string
  ): Promise<ModerationResult> {
    const result: ModerationResult = {
      isSafe: true,
      riskLevel: 'low',
      flags: [],
      suggestions: [],
    };

    const lowerMessage = message.toLowerCase();

    // 1. 检测敏感词
    for (const word of SENSITIVE_WORDS) {
      if (message.includes(word) || lowerMessage.includes(word.toLowerCase())) {
        result.isSafe = false;
        result.riskLevel = 'high';
        result.flags.push({
          type: 'sensitive_word',
          word,
          message: '包含敏感内容',
        });
      }
    }

    // 2. 检测危险交易
    for (const keyword of DANGEROUS_TRANSACTIONS) {
      if (message.includes(keyword)) {
        result.riskLevel = 'high';
        result.flags.push({
          type: 'dangerous_transaction',
          keyword,
          message: '可能涉及危险交易',
        });
        result.suggestions.push('请勿进行私下交易，建议使用平台担保交易');
      }
    }

    // 3. 检测诱导行为
    const诱导Patterns = [
      /点击链接/i,
      /添加微信/i,
      /加我微信/i,
      /私聊我/i,
      /看主页/i,
    ];

    for (const pattern of诱导Patterns) {
      if (pattern.test(message)) {
        result.flags.push({
          type: 'inducement',
          message: '可能存在诱导行为',
        });
      }
    }

    // 4. 检测频繁转账要求
    const moneyPatterns = [
      /转[0-9]+元/i,
      /转[0-9]+块/i,
      /pay.*[0-9]/i,
      /人民币/i,
    ];

    let moneyCount = 0;
    for (const pattern of moneyPatterns) {
      if (pattern.test(message)) {
        moneyCount++;
      }
    }

    if (moneyCount >= 2) {
      result.flags.push({
        type: 'frequent_money',
        message: '频繁涉及金钱交易',
      });
    }

    // 5. 综合风险评估
    if (result.flags.length >= 3) {
      result.riskLevel = 'critical';
      result.isSafe = false;
    } else if (result.flags.length >= 2) {
      result.riskLevel = 'high';
    } else if (result.flags.length === 1) {
      result.riskLevel = 'medium';
    }

    // 6. 生成安全建议
    if (result.riskLevel !== 'low') {
      result.suggestions = [
        '请勿向陌生人转账',
        '建议使用平台担保交易',
        '如遇诈骗请立即举报',
        '如需帮助请联系客服',
      ];
    }

    return result;
  },

  /**
   * 举报用户
   */
  async reportUser(
    reportedUserId: string,
    reporterId: string,
    reason: ReportReason,
    description: string
  ): Promise<{ success: boolean; reportId?: string }> {
    try {
      const reportId = 'report_' + Date.now();

      // 保存举报记录
      const report = {
        id: reportId,
        reportedUserId,
        reporterId,
        reason,
        description,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // 实际项目中发送到服务器
      console.log('[Moderation] User reported:', report);

      // 触发安全审核
      await this.queueForReview(reportedUserId);

      return { success: true, reportId };
    } catch (error) {
      console.error('Report user error:', error);
      return { success: false };
    }
  },

  /**
   * 封禁用户
   */
  async banUser(
    userId: string,
    reason: string,
    duration?: number // 小时，不传则永久
  ): Promise<void> {
    // 实际项目中发送到服务器
    console.log('[Moderation] User banned:', { userId, reason, duration });

    // 删除用户的所有会话
    // 通知用户
  },

  /**
   * 触发审核队列
   */
  async queueForReview(userId: string): Promise<void> {
    console.log('[Moderation] Queued for review:', userId);
    // 实际项目中发送到审核队列
  },

  /**
   * 检测用户年龄
   */
  async verifyAge(userId: string): Promise<{
    isAdult: boolean;
    age?: number;
  }> {
    // 实际项目中对接年龄验证服务
    return { isAdult: true, age: 25 };
  },

  /**
   * 获取安全等级
   */
  getSecurityLevel(): SecurityLevel {
    return {
      minimumAge: 18,
      maxChatDuration: 30, // 30分钟
      requirePhoneVerification: false,
      allowSocialLogin: true,
      autoDeleteEnabled: true,
      contentModeration: true,
      suspiciousTransactionDetection: true,
    };
  },

  /**
   * 创建安全会话
   */
  async createSafeSession(
    userId: string,
    partnerId: string,
    preferences: {
      allowFinancialDiscussion: boolean;
      allowContactExchange: boolean;
      allowMeetingRequests: boolean;
    }
  ): Promise<SafeSessionConfig> {
    const sessionConfig: SafeSessionConfig = {
      userId,
      partnerId,
      startTime: Date.now(),
      maxDuration: 30 * 60 * 1000, // 30分钟
      safetyFeatures: {
        financialContentMonitor: true,
        contactExchangeMonitor: true,
        meetingRequestMonitor: true,
        sensitiveWordFilter: true,
      },
      preferences,
    };

    return sessionConfig;
  },
};

// 举报原因
export type ReportReason =
  | 'harassment'
  | 'scam'
  | 'spam'
  | 'inappropriate_content'
  | 'dangerous_behavior'
  | 'minor_safety'
  | 'other';

// 审核结果
export interface ModerationResult {
  isSafe: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  flags: ModerationFlag[];
  suggestions: string[];
}

export interface ModerationFlag {
  type: string;
  word?: string;
  message: string;
}

export interface SecurityLevel {
  minimumAge: number;
  maxChatDuration: number;
  requirePhoneVerification: boolean;
  allowSocialLogin: boolean;
  autoDeleteEnabled: boolean;
  contentModeration: boolean;
  suspiciousTransactionDetection: boolean;
}

export interface SafeSessionConfig {
  userId: string;
  partnerId: string;
  startTime: number;
  maxDuration: number;
  safetyFeatures: {
    financialContentMonitor: boolean;
    contactExchangeMonitor: boolean;
    meetingRequestMonitor: boolean;
    sensitiveWordFilter: boolean;
  };
  preferences: {
    allowFinancialDiscussion: boolean;
    allowContactExchange: boolean;
    allowMeetingRequests: boolean;
  };
}

export default moderationService;
