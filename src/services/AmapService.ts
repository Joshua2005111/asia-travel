/**
 * FOREIGNER_APP 高德地图服务
 * 
 * 支持：
 * - POI搜索
 * - 地理编码/逆地理编码
 * - 路线规划
 * - 周边搜索
 */

import axios from 'axios';

// API配置
const AMAP_CONFIG = {
  baseURL: 'https://restapi.amap.com/v3',
  timeout: 15000,
};

// 高德API Key
const getAmapParams = () => ({
  key: process.env.AMAP_API_KEY || 'your_amap_key',
});

// 地图服务
export const amapService = {
  /**
   * 搜索POI
   */
  async searchPOI(
    keyword: string,
    city?: string,
    types?: string,
    page: number = 1,
    size: number = 20
  ): Promise<AmapPOI[]> {
    try {
      const response = await axios.get(
        `${AMAP_CONFIG.baseURL}/place/text`,
        {
          params: {
            ...getAmapParams(),
            keywords: keyword,
            city,
            types,
            page,
            offset: size,
            extensions: 'all',
          },
          timeout: AMAP_CONFIG.timeout,
        }
      );

      if (response.data.status === '1' && response.data.pois) {
        return response.data.pois.map((poi: any) => ({
          id: poi.id,
          name: poi.name,
          type: poi.type,
          typecode: poi.typecode,
          address: poi.address,
          location: poi.location,
          tel: poi.tel,
          distance: poi.distance,
          rating: poi.biz_ext?.rating ? parseFloat(poi.biz_ext.rating) : null,
          cost: poi.biz_ext?.cost ? parseFloat(poi.biz_ext.cost) : null,
          photos: poi.photos?.map((p: any) => p.url) || [],
          latitude: parseFloat(poi.location.split(',')[1]),
          longitude: parseFloat(poi.location.split(',')[0]),
        }));
      }

      return [];
    } catch (error) {
      console.error('Amap POI search error:', error);
      return [];
    }
  },

  /**
   * 周边搜索
   */
  async searchNearby(
    location: { lat: number; lng: number },
    radius: number = 1000,
    types?: string
  ): Promise<AmapPOI[]> {
    try {
      const response = await axios.get(
        `${AMAP_CONFIG.baseURL}/place/around`,
        {
          params: {
            ...getAmapParams(),
            location: `${location.lng},${location.lat}`,
            radius,
            types,
            offset: 20,
            extensions: 'all',
          },
          timeout: AMAP_CONFIG.timeout,
        }
      );

      if (response.data.status === '1' && response.data.pois) {
        return response.data.pois.map((poi: any) => ({
          id: poi.id,
          name: poi.name,
          type: poi.type,
          typecode: poi.typecode,
          address: poi.address,
          location: poi.location,
          tel: poi.tel,
          distance: poi.distance,
          rating: poi.biz_ext?.rating ? parseFloat(poi.biz_ext.rating) : null,
          cost: poi.biz_ext?.cost ? parseFloat(poi.biz_ext.cost) : null,
          photos: poi.photos?.map((p: any) => p.url) || [],
          latitude: parseFloat(poi.location.split(',')[1]),
          longitude: parseFloat(poi.location.split(',')[0]),
        }));
      }

      return [];
    } catch (error) {
      console.error('Amap nearby search error:', error);
      return [];
    }
  },

  /**
   * 地理编码
   */
  async geocode(address: string, city?: string): Promise<AmapLocation | null> {
    try {
      const response = await axios.get(
        `${AMAP_CONFIG.baseURL}/geocode/geo`,
        {
          params: {
            ...getAmapParams(),
            address,
            city,
          },
          timeout: AMAP_CONFIG.timeout,
        }
      );

      if (response.data.status === '1' && response.data.geocodes?.length > 0) {
        const geo = response.data.geocodes[0];
        return {
          formatted_address: geo.formatted_address,
          country: geo.country,
          province: geo.province,
          city: geo.city,
          district: geo.district,
          township: geo.township,
          street: geo.street,
          number: geo.number,
          lat: parseFloat(geo.location.split(',')[1]),
          lng: parseFloat(geo.location.split(',')[0]),
        };
      }

      return null;
    } catch (error) {
      console.error('Amap geocode error:', error);
      return null;
    }
  },

  /**
   * 逆地理编码
   */
  async reverseGeocode(lat: number, lng: number): Promise<AmapAddress | null> {
    try {
      const response = await axios.get(
        `${AMAP_CONFIG.baseURL}/geocode/regeo`,
        {
          params: {
            ...getAmapParams(),
            location: `${lng},${lat}`,
            extensions: 'base',
          },
          timeout: AMAP_CONFIG.timeout,
        }
      );

      if (response.data.status === '1' && response.data.regeocode) {
        const regeo = response.data.regeocode;
        return {
          formatted_address: regeo.formatted_address,
          country: regeo.addressComponent?.country || '中国',
          province: regeo.addressComponent?.province || '',
          city: regeo.addressComponent?.city || '',
          district: regeo.addressComponent?.district || '',
          township: regeo.addressComponent?.township || '',
          street: regeo.addressComponent?.streetNumber?.street || '',
          number: regeo.addressComponent?.streetNumber?.number || '',
        };
      }

      return null;
    } catch (error) {
      console.error('Amap reverse geocode error:', error);
      return null;
    }
  },

  /**
   * 路线规划（步行）
   */
  async walkingRoute(
    from: { lat: number; lng: number },
    to: { lat: number; lng: number }
  ): Promise<AmapRoute | null> {
    try {
      const response = await axios.get(
        `${AMAP_CONFIG.baseURL}/direction/walking`,
        {
          params: {
            ...getAmapParams(),
            origin: `${from.lng},${from.lat}`,
            destination: `${to.lng},${to.lat}`,
          },
          timeout: AMAP_CONFIG.timeout,
        }
      );

      if (response.data.status === '1' && response.data.route) {
        const route = response.data.route;
        const paths = route.paths?.[0];

        if (paths) {
          return {
            distance: parseFloat(paths.distance),
            duration: parseInt(paths.duration),
            steps: paths.steps?.map((step: any) => ({
              instruction: step.instruction,
              distance: parseFloat(step.distance),
              duration: parseInt(step.duration),
              road: step.road,
            })) || [],
          };
        }
      }

      return null;
    } catch (error) {
      console.error('Amap walking route error:', error);
      return null;
    }
  },

  /**
   * 路线规划（驾车）
   */
  async drivingRoute(
    from: { lat: number; lng: number },
    to: { lat: number; lng: number },
    strategy: number = 0 // 0:速度优先, 1:费用优先, 2:距离优先
  ): Promise<AmapRoute | null> {
    try {
      const response = await axios.get(
        `${AMAP_CONFIG.baseURL}/direction/driving`,
        {
          params: {
            ...getAmapParams(),
            origin: `${from.lng},${from.lat}`,
            destination: `${to.lng},${to.lat}`,
            strategy,
            extensions: 'base',
          },
          timeout: AMAP_CONFIG.timeout,
        }
      );

      if (response.data.status === '1' && response.data.route) {
        const route = response.data.route;
        const paths = route.paths?.[0];

        if (paths) {
          return {
            distance: parseFloat(paths.distance),
            duration: parseInt(paths.duration),
            tolls: parseInt(paths.tolls) || 0,
            traffics: parseInt(paths.traffic_lights) || 0,
            steps: paths.steps?.map((step: any) => ({
              instruction: step.instruction,
              distance: parseFloat(step.distance),
              duration: parseInt(step.duration),
              road: step.road,
            })) || [],
          };
        }
      }

      return null;
    } catch (error) {
      console.error('Amap driving route error:', error);
      return null;
    }
  },

  /**
   * 公交路线
   */
  async transitRoute(
    from: { lat: number; lng: number },
    to: { lat: number; lng: number },
    city: string,
    strategy: number = 0 // 0:最经济, 1:最快捷, 2:最少换乘
  ): Promise<AmapTransitRoute | null> {
    try {
      const response = await axios.get(
        `${AMAP_CONFIG.baseURL}/direction/transit/integrated`,
        {
          params: {
            ...getAmapParams(),
            origin: `${from.lng},${from.lat}`,
            destination: `${to.lng},${to.lat}`,
            city,
            strategy,
            extensions: 'base',
          },
          timeout: AMAP_CONFIG.timeout,
        }
      );

      if (response.data.status === '1' && response.data.route) {
        const route = response.data.route;
        const transits = route.transits?.[0];

        if (transits) {
          return {
            distance: parseFloat(transits.distance),
            duration: parseInt(transits.duration),
            cost: parseFloat(transits.cost) || null,
            walkingDistance: parseInt(transits.walking_distance),
            segments: transits.transits?.map((t: any) => ({
              type: t.type, // 步行、公交、地铁
              lineName: t.lines?.[0]?.name,
              departure: {
                name: t.departure_stop?.name,
                time: t.departure_stop?.time,
              },
              arrival: {
                name: t.arrival_stop?.name,
                time: t.arrival_stop?.time,
              },
            })) || [],
          };
        }
      }

      return null;
    } catch (error) {
      console.error('Amap transit route error:', error);
      return null;
    }
  },

  /**
   * 天气查询
   */
  async weather(city: string): Promise<AmapWeather | null> {
    try {
      const response = await axios.get(
        `${AMAP_CONFIG.baseURL}/weather/weatherInfo`,
        {
          params: {
            ...getAmapParams(),
            city,
            extensions: 'base',
          },
          timeout: AMAP_CONFIG.timeout,
        }
      );

      if (response.data.status === '1' && response.data.lives?.[0]) {
        const weather = response.data.lives[0];
        return {
          province: weather.province,
          city: weather.city,
          weather: weather.weather,
          temperature: parseFloat(weather.temperature),
          windDirection: weather.winddirection,
          windPower: weather.windpower,
          humidity: parseFloat(weather.humidity),
          reportTime: weather.reporttime,
        };
      }

      return null;
    } catch (error) {
      console.error('Amap weather error:', error);
      return null;
    }
  },
};

// 类型定义
export interface AmapPOI {
  id: string;
  name: string;
  type: string;
  typecode: string;
  address: string;
  location: string;
  tel?: string;
  distance?: string;
  rating?: number | null;
  cost?: number | null;
  photos?: string[];
  latitude: number;
  longitude: number;
}

export interface AmapLocation {
  formatted_address: string;
  country: string;
  province: string;
  city: string;
  district: string;
  township: string;
  street: string;
  number: string;
  lat: number;
  lng: number;
}

export interface AmapAddress {
  formatted_address: string;
  country: string;
  province: string;
  city: string;
  district: string;
  township: string;
  street: string;
  number: string;
}

export interface AmapRoute {
  distance: number; // 米
  duration: number; // 秒
  tolls?: number; // 过路费
  traffics?: number; // 红绿灯数
  steps: {
    instruction: string;
    distance: number;
    duration: number;
    road?: string;
  }[];
}

export interface AmapTransitRoute {
  distance: number;
  duration: number;
  cost?: number;
  walkingDistance: number;
  segments: {
    type: number;
    lineName?: string;
    departure: {
      name: string;
      time: string;
    };
    arrival: {
      name: string;
      time: string;
    };
  }[];
}

export interface AmapWeather {
  province: string;
  city: string;
  weather: string;
  temperature: number;
  windDirection: string;
  windPower: string;
  humidity: string;
  reportTime: string;
}

// POI类别代码
export const POI_TYPES = {
  all: '',
  food: '050000', // 餐饮
  scenery: '110000', // 景点
  hotel: '100000', // 酒店
  shopping: '060000', // 购物
  entertainment: '090000', // 娱乐
  transport: '150000', // 交通
  finance: '160000', // 金融
  medical: '170000', // 医疗
  education: '140000', // 教育
  government: '130000', // 政府
  scenic_spot: '110100', // 风景名胜
  hotspot: '110500', // 热点
};

// 热门城市
export const POPULAR_CITIES = [
  { id: 'beijing', name: '北京', code: '010' },
  { id: 'shanghai', name: '上海', code: '021' },
  { id: 'guangzhou', name: '广州', code: '020' },
  { id: 'shenzhen', name: '深圳', code: '0755' },
  { id: 'chengdu', name: '成都', code: '028' },
  { id: 'hangzhou', name: '杭州', code: '0571' },
  { id: 'xian', name: '西安', code: '029' },
  { id: 'chongqing', name: '重庆', code: '023' },
  { id: 'nanjing', name: '南京', code: '025' },
  { id: 'wuhan', name: '武汉', code: '027' },
];

export default amapService;
