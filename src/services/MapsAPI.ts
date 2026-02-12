/**
 * FOREIGNER_APP 地图API服务
 * 
 * 支持：
 * - POI搜索
 * - 地点详情
 * - 路线规划
 * - 地理编码/逆地理编码
 */

import axios from 'axios';

// API配置
const MAPS_CONFIG = {
  baseURL: 'https://api.mapbox.com',
  timeout: 15000,
};

// POI类别
export const POI_CATEGORIES = {
  all: { id: 'all', label: '全部', emoji: '📍', color: '#3B82F6' },
  food: { id: 'food', label: '美食', emoji: '🍜', color: '#EF4444' },
  view: { id: 'view', label: '景点', emoji: '🏛️', color: '#10B981' },
  secret: { id: 'secret', label: '私藏', emoji: '🎁', color: '#8B5CF6' },
  coffee: { id: 'coffee', label: '咖啡', emoji: '☕', color: '#F59E0B' },
  shopping: { id: 'shopping', label: '购物', emoji: '🛍️', color: '#EC4899' },
  nightlife: { id: 'nightlife', label: '夜生活', emoji: '🌙', color: '#6366F1' },
  culture: { id: 'culture', label: '文化', emoji: '🎭', color: '#14B8A6' },
};

// 地图API
export const mapsAPI = {
  /**
   * 搜索POI
   */
  async searchPOI(
    query: string,
    location?: { lat: number; lng: number },
    category?: string,
    limit: number = 20
  ): Promise<POI[]> {
    try {
      // 模拟数据（实际项目中替换为真实API调用）
      const mockPOIs: POI[] = [
        {
          id: '1',
          name: '武康路',
          type: '街区',
          category: 'view',
          distance: '200m',
          rating: 4.8,
          lat: 31.2061,
          lng: 121.4378,
          image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400',
          description: '上海最浪漫的梧桐路，网红打卡圣地',
          openingHours: '全天开放',
          price: '免费',
        },
        {
          id: '2',
          name: '上海交通大学',
          type: '景点',
          category: 'view',
          distance: '500m',
          rating: 4.6,
          lat: 31.2012,
          lng: 121.4389,
          image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
          description: '百年名校，美丽的校园风光',
          openingHours: '09:00-17:00',
          price: '免费',
        },
        {
          id: '3',
          name: '% Arabica武康路店',
          type: '咖啡',
          category: 'coffee',
          distance: '150m',
          rating: 4.7,
          lat: 31.2065,
          lng: 121.4380,
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
          description: '网红咖啡店，%符号拿铁',
          openingHours: '08:00-19:00',
          price: '¥35-50',
        },
        {
          id: '4',
          name: '隆江猪脚饭',
          type: '美食',
          category: 'food',
          distance: '300m',
          rating: 4.5,
          lat: 31.2055,
          lng: 121.4390,
          image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
          description: '本地人推荐的宝藏小店',
          openingHours: '10:00-21:00',
          price: '¥25-40',
        },
      ];

      return mockPOIs.filter((poi) =>
        category ? poi.category === category : true
      );
    } catch (error) {
      console.error('POI search error:', error);
      throw error;
    }
  },

  /**
   * 获取地点详情
   */
  async getPlaceDetails(placeId: string): Promise<POIDetails | null> {
    try {
      // 模拟数据
      const mockDetails: POIDetails = {
        id: placeId,
        name: '武康路',
        address: '上海市徐汇区武康路',
        phone: '+86-21-12345678',
        rating: 4.8,
        reviews: 12500,
        images: [
          'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
        ],
        categories: ['景点', '街区', '拍照打卡'],
        openingHours: '全天开放',
        price: '免费',
        website: 'https://example.com',
        description: '武康路是上海最浪漫的梧桐路之一，全长1公里，沿途有许多历史建筑和网红店铺。',
        tips: [
          '建议下午来，阳光斜照很适合拍照',
          '周末人比较多，建议工作日来',
          '路边咖啡店很多，可以坐下来休息',
        ],
      };

      return mockDetails;
    } catch (error) {
      console.error('Get place details error:', error);
      throw error;
    }
  },

  /**
   * 获取路线
   */
  async getDirections(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number },
    mode: 'walking' | 'driving' | 'transit' = 'walking'
  ): Promise<Route> {
    try {
      // 模拟数据
      const mockRoute: Route = {
        distance: 1.2,
        duration: 15,
        steps: [
          {
            instruction: '向北走',
            distance: 100,
            duration: 1,
          },
          {
            instruction: '右转进入武康路',
            distance: 500,
            duration: 6,
          },
          {
            instruction: '直行',
            distance: 400,
            duration: 5,
          },
          {
            instruction: '到达目的地',
            distance: 200,
            duration: 3,
          },
        ],
        polyline: 'abc123',
      };

      return mockRoute;
    } catch (error) {
      console.error('Get directions error:', error);
      throw error;
    }
  },

  /**
   * 逆地理编码
   */
  async reverseGeocode(lat: number, lng: number): Promise<Address> {
    try {
      // 模拟数据
      const mockAddress: Address = {
        formatted: '上海市徐汇区武康路',
        neighborhood: '湖南路街道',
        city: '上海',
        district: '徐汇区',
        country: '中国',
      };

      return mockAddress;
    } catch (error) {
      console.error('Reverse geocode error:', error);
      throw error;
    }
  },
};

// 类型定义
export interface POI {
  id: string;
  name: string;
  type: string;
  category: string;
  distance: string;
  rating: number;
  lat: number;
  lng: number;
  image?: string;
  description?: string;
  openingHours?: string;
  price?: string;
}

export interface POIDetails extends POI {
  address: string;
  phone?: string;
  reviews: number;
  images: string[];
  categories: string[];
  website?: string;
  tips: string[];
}

export interface Route {
  distance: number; // 公里
  duration: number; // 分钟
  steps: RouteStep[];
  polyline?: string;
}

export interface RouteStep {
  instruction: string;
  distance: number; // 米
  duration: number; // 分钟
}

export interface Address {
  formatted: string;
  neighborhood: string;
  city: string;
  district: string;
  country: string;
}

export default mapsAPI;
