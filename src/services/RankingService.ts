/**
 * 🎯 ChinaMate - 榜单服务
 * 
 * 功能：
 * - 地点榜单（美食、景点、娱乐）
 * - 用户评分系统
 * - 打卡记录
 * - 每周Top3奖励
 */

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { analytics } from './AnalyticsService';

// 榜单服务
export const rankingService = {
  /**
   * 获取榜单分类
   */
  async getCategories(): Promise<RankingCategory[]> {
    const categories: RankingCategory[] = [
      {
        id: 'food',
        name: '美食',
        nameEn: 'Food',
        nameKr: '음식',
        icon: '🍜',
        description: '上海最受欢迎的美食',
        color: '#FF6B6B',
      },
      {
        id: 'view',
        name: '景点',
        nameEn: 'Attractions',
        nameKr: '관광지',
        icon: '🏛️',
        description: '必打卡的网红景点',
        color: '#4ECDC4',
      },
      {
        id: 'coffee',
        name: '咖啡',
        nameEn: 'Coffee',
        nameKr: '카페',
        icon: '☕',
        description: '精品咖啡馆推荐',
        color: '#A67B5B',
      },
      {
        id: 'nightlife',
        name: '夜生活',
        nameEn: 'Nightlife',
        nameKr: '야경',
        icon: '🌙',
        description: '酒吧、夜市、Livehouse',
        color: '#9B59B6',
      },
      {
        id: 'shopping',
        name: '购物',
        nameEn: 'Shopping',
        nameKr: '쇼핑',
        icon: '🛍️',
        description: '商场、集市、买手店',
        color: '#3498DB',
      },
      {
        id: 'experience',
        name: '体验',
        nameEn: 'Experience',
        nameKr: '체험',
        icon: '🎯',
        description: 'DIY、SPA、密室逃脱',
        color: '#F39C12',
      },
    ];

    return categories;
  },

  /**
   * 获取榜单列表
   */
  async getRankings(
    categoryId: string,
    city: string = '上海',
    period: 'daily' | 'weekly' | 'monthly' = 'weekly',
    page: number = 1,
    size: number = 20
  ): Promise<RankingList> {
    try {
      // 模拟数据
      const rankings: RankingItem[] = [
        {
          id: 'rank_1',
          placeId: 'place_001',
          name: '裕兴记',
          category: 'food',
          city: '上海',
          address: '黄浦区方斜路521号',
          image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
          rating: 4.8,
          reviewCount: 2341,
          checkinCount: 5678,
          score: 98.5,
          trend: 'up',
          tags: ['本帮菜', '面馆', '老字号'],
          isTop3: true,
        },
        {
          id: 'rank_2',
          placeId: 'place_002',
          name: '外滩',
          category: 'view',
          city: '上海',
          address: '黄浦区中山东一路',
          image: 'https://images.unsplash.com/photo-1548567117-8278942325a5?w=400',
          rating: 4.9,
          reviewCount: 5678,
          checkinCount: 12345,
          score: 99.2,
          trend: 'same',
          tags: ['地标', '夜景', '网红打卡'],
          isTop3: true,
        },
        {
          id: 'rank_3',
          placeId: 'place_003',
          name: 'M Stand',
          category: 'coffee',
          city: '上海',
          address: '徐汇区淮海中路',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
          rating: 4.7,
          reviewCount: 1890,
          checkinCount: 4567,
          score: 96.8,
          trend: 'up',
          tags: ['网红咖啡', '设计感', '武康路'],
          isTop3: true,
        },
      ];

      return {
        rankings,
        total: 100,
        page,
        hasMore: true,
        period,
        categoryId,
        city,
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Get rankings error:', error);
      return {
        rankings: [],
        total: 0,
        page: 1,
        hasMore: false,
        period,
        categoryId,
        city,
        updatedAt: new Date().toISOString(),
      };
    }
  },

  /**
   * 获取地点详情
   */
  async getPlaceDetail(placeId: string): Promise<PlaceDetail | null> {
    try {
      const detail: PlaceDetail = {
        id: placeId,
        name: '裕兴记',
        category: 'food',
        city: '上海',
        address: '黄浦区方斜路521号',
        phone: '021-12345678',
        hours: '11:00-21:00',
        price: '人均80元',
        image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600',
        rating: 4.8,
        reviewCount: 2341,
        checkinCount: 5678,
        tags: ['本帮菜', '面馆', '老字号'],
        description: '百年老店，主打本帮菜和特色面食',
        lat: 31.2085,
        lng: 121.4818,
        reviews: [],
      };

      return detail;
    } catch (error) {
      console.error('Get place detail error:', error);
      return null;
    }
  },

  /**
   * 评分/打卡
   */
  async checkin(
    placeId: string,
    rating: number,
    review?: string,
    photos?: string[]
  ): Promise<CheckinResult> {
    try {
      const checkin: Checkin = {
        id: 'checkin_' + Date.now(),
        userId: 'current_user',
        placeId,
        rating,
        review,
        photos,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
      };

      // 发送到服务器
      await analytics.presets.checkIn(placeId);

      // 更新本地积分
      await this.addPoints(10); // 打卡+10积分

      return {
        success: true,
        checkin,
        pointsEarned: 10,
        newLevel: 2,
      };
    } catch (error) {
      console.error('Checkin error:', error);
      return { success: false };
    }
  },

  /**
   * 获取我的打卡
   */
  async getMyCheckins(page: number = 1): Promise<Checkin[]> {
    const checkins: Checkin[] = [
      {
        id: 'checkin_1',
        userId: 'current_user',
        placeId: 'place_001',
        placeName: '裕兴记',
        rating: 5,
        review: '味道很正宗！',
        createdAt: '2026-02-10',
        likes: 12,
        comments: 3,
      },
    ];

    return checkins;
  },

  /**
   * 获取用户积分
   */
  async getUserPoints(): Promise<UserPoints> {
    return {
      totalPoints: 1250,
      level: 5,
      currentLevelPoints: 250,
      nextLevelPoints: 500,
      weeklyRank: 42,
      monthlyRank: 128,
      badges: [
        { id: 'foodie', name: '美食家', icon: '🍜', earnedAt: '2026-01-15' },
        { id: 'explorer', name: '探索者', icon: '🗺️', earnedAt: '2026-02-01' },
      ],
      rewards: [
        { id: 'reward_1', name: '免费咖啡', icon: '☕', redeemedAt: '2026-02-05' },
      ],
    };
  },

  /**
   * 添加积分
   */
  async addPoints(points: number): Promise<void> {
    const current = await AsyncStorage.getItem('userPoints');
    const newTotal = (current ? parseInt(current) : 0) + points;
    await AsyncStorage.setItem('userPoints', String(newTotal));
  },

  /**
   * 获取奖励列表
   */
  async getRewards(): Promise<Reward[]> {
    const rewards: Reward[] = [
      {
        id: 'reward_1',
        name: '免费咖啡券',
        icon: '☕',
        description: '合作咖啡馆免费饮品',
        pointsRequired: 500,
        stock: 100,
        expiredAt: '2026-03-31',
      },
      {
        id: 'reward_2',
        name: '景点门票5折',
        icon: '🎫',
        description: '指定景点门票5折券',
        pointsRequired: 1000,
        stock: 50,
        expiredAt: '2026-03-31',
      },
      {
        id: 'reward_3',
        name: '米其林餐厅体验',
        icon: '🍽️',
        description: '价值500元餐厅代金券',
        pointsRequired: 3000,
        stock: 10,
        expiredAt: '2026-02-28',
      },
    ];

    return rewards;
  },

  /**
   * 兑换奖励
   */
  async redeemReward(rewardId: string): Promise<{ success: boolean; code?: string }> {
    try {
      const code = 'CHINAMATE_' + Date.now();
      return { success: true, code };
    } catch (error) {
      return { success: false };
    }
  },

  /**
   * 获取每周Top3
   */
  async getWeeklyTop3(): Promise<WeeklyWinner[]> {
    const winners: WeeklyWinner[] = [
      {
        rank: 1,
        placeId: 'place_001',
        placeName: '裕兴记',
        category: 'food',
        city: '上海',
        score: 98.5,
        checkinCount: 5678,
        reward: {
          type: 'coffee',
          name: '☕ 咖啡券 x3',
          description: '合作咖啡馆免费饮品3杯',
          city: '上海/北京/成都/杭州',
          validDays: 30,
        },
      },
      {
        rank: 2,
        placeId: 'place_002',
        placeName: '外滩',
        category: 'view',
        city: '上海',
        score: 99.2,
        checkinCount: 12345,
        reward: {
          type: 'movie',
          name: '🎬 电影券 x3',
          description: 'CGV/万达/百老汇 通用电影票3张',
          city: '全国通用',
          validDays: 30,
        },
      },
      {
        rank: 3,
        placeId: 'place_003',
        placeName: 'M Stand',
        category: 'coffee',
        city: '上海',
        score: 96.8,
        checkinCount: 4567,
        reward: {
          type: 'coffee',
          name: '☕ 咖啡券 x2',
          description: '合作咖啡馆免费饮品2杯',
          city: '上海/北京/成都/杭州',
          validDays: 30,
        },
      },
    ];

    return winners;
  },

  /**
   * 获取月榜Top1
   */
  async getMonthlyTop1(): Promise<MonthlyWinner | null> {
    const winner: MonthlyWinner = {
      rank: 1,
      placeId: 'place_monthly_001',
      placeName: '外滩',
      category: 'view',
      city: '上海',
      monthScore: 98.8,
      monthCheckinCount: 45678,
      reward: {
        type: 'trip',
        name: '🎁 中国任选城市深度游 x1',
        description: '中国任选一城市深度游一天',
        cities: [
          '北京', '杭州', '成都', '西安', 
          '重庆', '广州', '苏州', '南京', 
          '厦门', '青岛', '云南', '哈尔滨'
        ],
        includes: ['专车接送', '专业导游', '午餐', '景点门票', '旅拍服务'],
        duration: '1天',
        validDays: 90,
      },
    };

    return winner;
  },

  /**
   * 领取奖励
   */
  async claimReward(
    winnerId: string,
    rewardType: 'coffee' | 'movie' | 'trip',
    selectedCity?: string
  ): Promise<ClaimResult> {
    try {
      const rewardId = 'reward_' + Date.now();
      
      let rewardDetails: any = {};
      
      if (rewardType === 'coffee') {
        rewardDetails = {
          type: 'coffee',
          name: '☕ 免费咖啡券 x3',
          quantity: 3,
          locations: '上海/北京/成都/杭州 合作门店',
          code: 'COFFEE_' + Date.now().toString().slice(-6),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
      } else if (rewardType === 'movie') {
        rewardDetails = {
          type: 'movie',
          name: '🎬 免费电影票 x3',
          quantity: 3,
          locations: '全国CGV/万达/百老汇影院',
          code: 'MOVIE_' + Date.now().toString().slice(-6),
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
      } else if (rewardType === 'trip') {
        rewardDetails = {
          type: 'trip',
          name: '🎁 城市深度游 x1',
          city: selectedCity || '杭州',
          includes: ['专车接送', '专业导游', '午餐', '景点门票'],
          duration: '1天',
          code: 'TRIP_' + Date.now().toString().slice(-6),
          validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        };
      }

      return {
        success: true,
        rewardId,
        rewardDetails,
        message: `恭喜！您获得了${rewardDetails.name}`,
      };
    } catch (error) {
      console.error('Claim reward error:', error);
      return { success: false };
    }
  },

  /**
   * 搜索地点
   */
  async searchPlaces(
    keyword: string,
    city: string = '上海'
  ): Promise<SearchResult[]> {
    const results: SearchResult[] = [
      {
        id: 'search_1',
        name: '裕兴记',
        category: 'food',
        address: '黄浦区方斜路521号',
        rating: 4.8,
        distance: '0.5km',
      },
    ];

    return results;
  },
};

// 类型定义
export interface RankingCategory {
  id: string;
  name: string;
  nameEn: string;
  nameKr: string;
  icon: string;
  description: string;
  color: string;
}

export interface RankingList {
  rankings: RankingItem[];
  total: number;
  page: number;
  hasMore: boolean;
  period: string;
  categoryId: string;
  city: string;
  updatedAt: string;
}

export interface RankingItem {
  id: string;
  placeId: string;
  name: string;
  category: string;
  city: string;
  address: string;
  image: string;
  rating: number;
  reviewCount: number;
  checkinCount: number;
  score: number;
  trend: 'up' | 'down' | 'same';
  tags: string[];
  isTop3: boolean;
}

export interface PlaceDetail {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  phone?: string;
  hours?: string;
  price?: string;
  image: string;
  rating: number;
  reviewCount: number;
  checkinCount: number;
  tags: string[];
  description: string;
  lat: number;
  lng: number;
  reviews: PlaceReview[];
}

export interface PlaceReview {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  rating: number;
  review: string;
  photos: string[];
  createdAt: string;
  likes: number;
}

export interface Checkin {
  id: string;
  userId: string;
  placeId: string;
  placeName?: string;
  rating: number;
  review?: string;
  photos?: string[];
  createdAt: string;
  likes: number;
  comments: number;
}

export interface CheckinResult {
  success: boolean;
  checkin?: Checkin;
  pointsEarned?: number;
  newLevel?: number;
}

export interface UserPoints {
  totalPoints: number;
  level: number;
  currentLevelPoints: number;
  nextLevelPoints: number;
  weeklyRank: number;
  monthlyRank: number;
  badges: UserBadge[];
  rewards: RedeemedReward[];
}

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  earnedAt: string;
}

export interface RedeemedReward {
  id: string;
  name: string;
  icon: string;
  redeemedAt: string;
}

export interface Reward {
  id: string;
  name: string;
  icon: string;
  description: string;
  pointsRequired: number;
  stock: number;
  expiredAt: string;
}

export interface WeeklyWinner {
  rank: number;
  placeId: string;
  placeName: string;
  category: string;
  city: string;
  score: number;
  checkinCount: number;
  reward: {
    type: 'coffee' | 'movie';
    name: string;
    description: string;
    city: string;
    validDays: number;
  };
}

export interface MonthlyWinner {
  rank: number;
  placeId: string;
  placeName: string;
  category: string;
  city: string;
  monthScore: number;
  monthCheckinCount: number;
  reward: {
    type: 'trip';
    name: string;
    description: string;
    cities: string[];
    includes: string[];
    duration: string;
    validDays: number;
  };
}

export interface ClaimResult {
  success: boolean;
  rewardId?: string;
  rewardDetails?: {
    type: string;
    name: string;
    quantity?: number;
    city?: string;
    cities?: string[];
    includes?: string[];
    duration?: string;
    locations?: string;
    code: string;
    validUntil: string;
  };
  message?: string;
}

export interface SearchResult {
  id: string;
  name: string;
  category: string;
  address: string;
  rating: number;
  distance: string;
}

export default rankingService;
