/**
 * 🇨🇳🇰🇷 看得懂吗 - 中韩年轻人互动服务
 * 
 * 功能：
 * - 中韩双语匹配
 * - 语言伙伴配对
 * - 实时翻译聊天
 * - 文化交流社区
 */

import axios from 'axios';
import { translationAPI } from './TranslationAPI';

// 匹配服务
export const crossBorderService = {
  /**
   * 获取匹配配置
   */
  getMatchingConfig(): MatchingConfig {
    return {
      languages: ['zh', 'kr', 'en'],
      allowCrossBorder: true,
      translationEnabled: true,
      cultureExchangeEnabled: true,
    };
  },

  /**
   * 匹配中韩年轻人
   */
  async matchUser(
    userId: string,
    preferences: MatchingPreferences
  ): Promise<MatchResult> {
    try {
      // 实际项目中发送到服务器
      // 筛选条件：国家、语言偏好、兴趣

      const mockPartner: MatchPartner = {
        id: 'partner_' + Date.now(),
        username: '韩语学习者',
        country: 'KR',
        avatar: 'https://i.pravatar.cc/150?img=1',
        languages: ['kr', 'en'],
        learningLanguage: 'zh',
        interests: ['美食', 'K-pop', '旅游'],
        bio: '正在学习中文，喜欢中国文化和美食',
        isOnline: true,
        mutualMatch: true,
      };

      return {
        success: true,
        partner: mockPartner,
        matchType: preferences.preferChina || preferences.preferKorea 
          ? 'cross_border' 
          : 'global',
        translationEnabled: true,
      };
    } catch (error) {
      console.error('Match error:', error);
      return { success: false };
    }
  },

  /**
   * 实时翻译消息（中韩聊天）
   */
  async sendTranslatedMessage(
    sessionId: string,
    content: string,
    fromLang: string,
    toLang: string
  ): Promise<TranslatedMessage> {
    try {
      // 翻译消息
      const translated = await translationAPI.translateText(content, toLang);

      const message: TranslatedMessage = {
        id: 'msg_' + Date.now(),
        original: content,
        translated: translated,
        fromLang,
        toLang,
        timestamp: Date.now(),
      };

      return message;
    } catch (error) {
      console.error('Translate message error:', error);
      return {
        id: 'msg_' + Date.now(),
        original: content,
        translated: content,
        fromLang,
        toLang,
        timestamp: Date.now(),
      };
    }
  },

  /**
   * 创建语言伙伴配对
   */
  async createLanguagePartner(
    userId: string,
    targetLanguage: string,
    nativeLanguage: string
  ): Promise<LanguagePartner> {
    const partner: LanguagePartner = {
      id: 'lp_' + Date.now(),
      userId,
      partnerId: null,
      targetLanguage, // 学习语言
      nativeLanguage, // 母语
      status: 'pending',
      level: 'beginner',
      goals: ['日常对话', '旅游用语', '文化了解'],
      practiceSchedule: null,
      matchedAt: null,
    };

    // 实际项目中发送到服务器配对
    return partner;
  },

  /**
   * 获取文化交流内容
   */
  async getCultureFeed(
    language: string,
    category: CultureCategory
  ): Promise<CultureContent[]> {
    const feed: CultureContent[] = [
      {
        id: 'culture_1',
        type: 'food',
        title: '韩国美食介绍',
        description: '韩国泡菜、石锅拌饭、参鸡汤等经典美食',
        image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=600',
        language: 'kr',
        translations: {
          zh: '韩国美食介绍',
          en: 'Korean Food Introduction',
        },
        author: '首尔小哥',
        authorCountry: 'KR',
        likes: 234,
        comments: 45,
      },
      {
        id: 'culture_2',
        type: 'trend',
        title: '中国Z世代流行语',
        description: 'yyds、绝绝子、破防了...你懂几个？',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
        language: 'zh',
        translations: {
          kr: '中国 Z세대 유행어',
          en: 'Chinese Gen Z Slang',
        },
        author: '北京小姐姐',
        authorCountry: 'CN',
        likes: 567,
        comments: 89,
      },
      {
        id: 'culture_3',
        type: 'idiom',
        title: '成语故事：画蛇添足',
        description: '画画比赛的故事，蛇画完后多画了脚反而输了',
        image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600',
        language: 'zh',
        translations: {
          kr: '성어 이야기: 여사첨족',
          en: 'Idiom Story: Drawing Snake and Adding Feet',
        },
        author: '中文老师',
        authorCountry: 'CN',
        likes: 123,
        comments: 34,
      },
    ];

    return feed;
  },

  /**
   * 发布文化交流内容
   */
  async postCultureContent(
    userId: string,
    content: Omit<CultureContent, 'id' | 'author' | 'authorCountry' | 'likes' | 'comments'>
  ): Promise<CultureContent> {
    const post: CultureContent = {
      id: 'culture_' + Date.now(),
      ...content,
      author: '我',
      authorCountry: 'CN',
      likes: 0,
      comments: 0,
    };

    return post;
  },

  /**
   * 获取热门话题（中韩双语）
   */
  async getTrendingTopics(language: string): Promise<TrendingTopic[]> {
    const topics: TrendingTopic[] = [
      {
        id: 'topic_1',
        title: 'K-pop vs C-pop',
        description: '你更喜欢哪个？',
        icon: '🎵',
        posts: 1234,
        language: 'mixed',
      },
      {
        id: 'topic_2',
        title: '韩剧 vs 国产剧',
        description: '最近在追什么剧？',
        icon: '📺',
        posts: 2345,
        language: 'mixed',
      },
      {
        id: 'topic_3',
        title: '中韩美食大PK',
        description: '你家乡有什么美食？',
        icon: '🍜',
        posts: 3456,
        language: 'mixed',
      },
    ];

    return topics;
  },

  /**
   * 互相关注（中韩年轻人成为朋友）
   */
  async followUser(userId: string, targetUserId: string): Promise<{
    success: boolean;
    followStatus: 'pending' | 'accepted' | 'mutual';
  }> {
    return {
      success: true,
      followStatus: 'mutual',
    };
  },

  /**
   * 获取推荐用户（中韩）
   */
  async getRecommendedUsers(
    userId: string,
    countryFilter?: string[]
  ): Promise<RecommendedUser[]> {
    const users: RecommendedUser[] = [
      {
        id: 'user_1',
        username: '首尔欧巴',
        country: 'KR',
        avatar: 'https://i.pravatar.cc/150?img=11',
        bio: '学习中文3年，喜欢旅游',
        mutualFriends: 5,
        isFollowing: false,
        tags: ['K-pop', '篮球', '美食'],
      },
      {
        id: 'user_2',
        username: '北京妞妞',
        country: 'CN',
        avatar: 'https://i.pravatar.cc/150?img=5',
        bio: '韩语学习中，喜欢韩剧和韩国美食',
        mutualFriends: 12,
        isFollowing: true,
        tags: ['韩语学习', '韩剧', '购物'],
      },
    ];

    return users;
  },
};

// 类型定义
export interface MatchingConfig {
  languages: string[];
  allowCrossBorder: boolean;
  translationEnabled: boolean;
  cultureExchangeEnabled: boolean;
}

export interface MatchingPreferences {
  preferChina?: boolean;
  preferKorea?: boolean;
  preferGlobal?: boolean;
  interests?: string[];
  learningLanguage?: string;
}

export interface MatchResult {
  success: boolean;
  partner?: MatchPartner;
  matchType?: 'cross_border' | 'global';
  translationEnabled?: boolean;
}

export interface MatchPartner {
  id: string;
  username: string;
  country: string;
  avatar?: string;
  languages: string[];
  learningLanguage: string;
  interests: string[];
  bio: string;
  isOnline: boolean;
  mutualMatch: boolean;
}

export interface TranslatedMessage {
  id: string;
  original: string;
  translated: string;
  fromLang: string;
  toLang: string;
  timestamp: number;
}

export interface LanguagePartner {
  id: string;
  userId: string;
  partnerId: string | null;
  targetLanguage: string;
  nativeLanguage: string;
  status: 'pending' | 'active' | 'completed';
  level: string;
  goals: string[];
  practiceSchedule: PracticeSchedule | null;
  matchedAt: string | null;
}

export interface PracticeSchedule {
  frequency: string;
  duration: number;
  timezones: string[];
}

export type CultureCategory = 'food' | 'trend' | 'idiom' | 'travel' | 'entertainment' | 'daily';

export interface CultureContent {
  id: string;
  type: CultureCategory;
  title: string;
  description: string;
  image?: string;
  language: string;
  translations: {
    zh: string;
    kr: string;
    en: string;
  };
  author: string;
  authorCountry: string;
  likes: number;
  comments: number;
}

export interface TrendingTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  posts: number;
  language: string;
}

export interface RecommendedUser {
  id: string;
  username: string;
  country: string;
  avatar?: string;
  bio: string;
  mutualFriends: number;
  isFollowing: boolean;
  tags: string[];
}

export default crossBorderService;
