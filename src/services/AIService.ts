/**
 * FOREIGNER_APP AI服务 (MiniMax版)
 * 
 * 支持：
 * - AI旅行规划 (MiniMax-M2.1)
 * - 智能推荐
 * - 聊天机器人
 */

import axios from 'axios';

// API配置
const AI_CONFIG = {
  baseURL: 'https://api.minimax.chat/v1',
  timeout: 60000,
};

// MiniMax API Headers
const getMiniMaxHeaders = () => ({
  'Authorization': `Bearer ${process.env.MINIMAX_API_KEY}`,
  'Content-Type': 'application/json',
});

// AI服务
export const aiService = {
  /**
   * 生成旅行行程 (使用 MiniMax-M2.1)
   */
  async generateItinerary(
    params: ItineraryParams
  ): Promise<Itinerary> {
    try {
      const {
        destination,
        duration,
        interests,
        budget,
        style,
        language = 'zh-CN',
      } = params;

      const response = await axios.post(
        `${AI_CONFIG.baseURL}/text/chatcompletion_v2`,
        {
          model: 'MiniMax-M2.1',
          messages: [
            {
              role: 'system',
              content: `你是一个专业的中国旅行规划师。根据用户的需求，生成详细、有趣、实用的旅行行程。用${language === 'zh-CN' ? '中文' : language}回答。`
            },
            {
              role: 'user',
              content: `
请为我去${destination}设计一个${duration}天的旅行行程：

兴趣偏好：${interests.join('、')}
预算：${budget}
旅行风格：${style}
语言偏好：${language}

请生成JSON格式的行程，包括：
1. 每天的行程安排
2. 每个景点/活动的推荐理由
3. 餐饮推荐
4. 交通建议
5. 实用Tips
              `.trim(),
            },
          ],
          temperature: 0.7,
          tokens_to_generate: 4000,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: AI_CONFIG.timeout,
        }
      );

      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
      const jsonContent = jsonMatch ? jsonMatch[1] : content;

      return JSON.parse(jsonContent);
    } catch (error: any) {
      console.error('MiniMax itinerary error:', error?.response?.data || error.message);
      throw error;
    }
  },

  /**
   * 智能推荐地点 (使用 MiniMax)
   */
  async recommendPlaces(
    params: RecommendParams
  ): Promise<Recommendation[]> {
    try {
      const {
        location,
        preferences,
        timeAvailable,
        budget,
        language = 'zh-CN',
      } = params;

      const response = await axios.post(
        `${AI_CONFIG.baseURL}/text/chatcompletion_v2`,
        {
          model: 'MiniMax-M2.1',
          messages: [
            {
              role: 'system',
              content: '你是一个了解中国本地生活的推荐专家。根据用户的位置、偏好和时间，推荐最适合的地点。用' + (language === 'zh-CN' ? '中文' : language) + '回答。'
            },
            {
              role: 'user',
              content: `
我在${location}，还有${timeAvailable}时间。

偏好：${preferences.join('、')}
预算：${budget}
语言：${language}

请推荐5个最适合的地点，每个包括：
- 名称
- 类型
- 推荐理由
- 预计时间
- 预估费用
- 亮点
              `.trim(),
            },
          ],
          temperature: 0.7,
          tokens_to_generate: 2000,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: AI_CONFIG.timeout,
        }
      );

      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
      const jsonContent = jsonMatch ? jsonMatch[1] : content;

      return JSON.parse(jsonContent);
    } catch (error: any) {
      console.error('MiniMax recommendation error:', error?.response?.data || error.message);
      throw error;
    }
  },

  /**
   * 聊天对话 (使用 MiniMax)
   */
  async chat(
    messages: ChatMessage[],
    context?: ChatContext
  ): Promise<string> {
    try {
      const systemMessage = {
        role: 'system',
        content: `你是一个友好的中国旅行助手。可以回答关于中国旅行的各种问题，包括景点、交通、美食、文化等。用${context?.language || '中文'}回答，保持友好、热情的态度。`,
      };

      const response = await axios.post(
        `${AI_CONFIG.baseURL}/text/chatcompletion_v2`,
        {
          model: 'MiniMax-M2.1',
          messages: [
            systemMessage,
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ],
          temperature: 0.8,
          tokens_to_generate: 1000,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: 30000,
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('MiniMax chat error:', error?.response?.data || error.message);
      throw error;
    }
  },

  /**
   * 生成旅行故事 (使用 MiniMax)
   */
  async generateTravelStory(
    experience: TravelExperience
  ): Promise<TravelStory> {
    try {
      const response = await axios.post(
        `${AI_CONFIG.baseURL}/text/chatcompletion_v2`,
        {
          model: 'MiniMax-M2.1',
          messages: [
            {
              role: 'system',
              content: '你是一个旅行故事作家。用生动、有趣的文字将旅行经历写成故事。'
            },
            {
              role: 'user',
              content: `
把我的这段旅行经历写成一个生动的故事：

目的地：${experience.destination}
日期：${experience.date}
同行：${experience.companions}
最难忘的瞬间：${experience.highlights.join('、')}
美食体验：${experience.foodExperience}
文化感受：${experience.culturalExperience}
              `.trim(),
            },
          ],
          temperature: 0.8,
          tokens_to_generate: 2000,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: AI_CONFIG.timeout,
        }
      );

      return {
        title: `${experience.destination}之旅`,
        story: response.data.choices[0].message.content,
        highlights: experience.highlights,
        photos: [],
      };
    } catch (error: any) {
      console.error('MiniMax story error:', error?.response?.data || error.message);
      throw error;
    }
  },

  /**
   * 盲盒推荐 (使用 MiniMax)
   */
  async generateMysteryBox(
    params: MysteryBoxParams
  ): Promise<MysteryBox> {
    try {
      const {
        location,
        timeOfDay,
        userPreferences,
      } = params;

      const response = await axios.post(
        `${AI_CONFIG.baseURL}/text/chatcompletion_v2`,
        {
          model: 'MiniMax-M2.1',
          messages: [
            {
              role: 'system',
              content: '你是一个了解中国本地宝藏地点的推荐专家。推荐一些本地人私藏、不为人知但非常有特色的地点。'
            },
            {
              role: 'user',
              content: `
请为在${location}、${timeOfDay}时段的用户推荐3个惊喜地点。

用户偏好：${userPreferences?.join('、') || '无特殊偏好'}

每个地点请包含：
- 名称
- 类型（美食/景点/体验/夜生活）
- 一句话推荐理由
- 适合人群
- 惊喜指数（1-5星）
              `.trim(),
            },
          ],
          temperature: 0.9, // 更高温度增加随机性
          tokens_to_generate: 1500,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: AI_CONFIG.timeout,
        }
      );

      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
      const jsonContent = jsonMatch ? jsonMatch[1] : content;

      return JSON.parse(jsonContent);
    } catch (error: any) {
      console.error('MiniMax mystery box error:', error?.response?.data || error.message);
      throw error;
    }
  },
};

// 类型定义
export interface ItineraryParams {
  destination: string;
  duration: number;
  interests: string[];
  budget: 'budget' | 'moderate' | 'luxury';
  style: 'adventure' | 'relaxation' | 'culture' | 'foodie' | 'photography';
  language?: string;
}

export interface Itinerary {
  destination: string;
  duration: number;
  totalBudget: string;
  highlights: string[];
  days: ItineraryDay[];
}

export interface ItineraryDay {
  day: number;
  theme: string;
  morning: ItineraryActivity;
  afternoon: ItineraryActivity;
  evening: ItineraryActivity;
  tips: string[];
  meals: MealRecommendation[];
}

export interface ItineraryActivity {
  name: string;
  type: string;
  duration: string;
  address: string;
  cost: string;
  reason: string;
}

export interface MealRecommendation {
  type: 'breakfast' | 'lunch' | 'dinner';
  name: string;
  cuisine: string;
  cost: string;
  recommendation: string;
}

export interface RecommendParams {
  location: string;
  preferences: string[];
  timeAvailable: string;
  budget: 'budget' | 'moderate' | 'luxury';
  language?: string;
}

export interface Recommendation {
  name: string;
  type: string;
  reason: string;
  duration: string;
  cost: string;
  highlight: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  location?: string;
  language?: string;
  preferences?: string[];
}

export interface TravelExperience {
  destination: string;
  date: string;
  companions: string;
  highlights: string[];
  foodExperience: string;
  culturalExperience: string;
}

export interface TravelStory {
  title: string;
  story: string;
  highlights: string[];
  photos: string[];
}

export default aiService;
