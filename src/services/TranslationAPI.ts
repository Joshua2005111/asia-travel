/**
 * FOREIGNER_APP 翻译API服务 (MiniMax版)
 * 
 * 支持：
 * - 文本翻译 (MiniMax-M2.1)
 * - 语音识别 (ASR)
 * - 语音合成 (TTS)
 * - 拍照翻译 (OCR)
 */

import axios from 'axios';

// API配置
const API_CONFIG = {
  // MiniMax API
  baseURL: 'https://api.minimax.chat/v1',
  timeout: 30000,
};

// MiniMax API Key (从环境变量获取)
const getMiniMaxHeaders = () => ({
  'Authorization': `Bearer ${process.env.MINIMAX_API_KEY}`,
  'Content-Type': 'application/json',
});

// 翻译API
export const translationAPI = {
  /**
   * 文本翻译 (使用 MiniMax-M2.1)
   */
  async translateText(text: string, targetLang: string): Promise<string> {
    try {
      const langNames: Record<string, string> = {
        'zh': 'Chinese',
        'kr': 'Korean', 
        'ja': 'Japanese',
        'en': 'English',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
      };

      const targetLangName = langNames[targetLang] || 'Chinese';

      // 使用 MiniMax 文本生成模型
      const response = await axios.post(
        `${API_CONFIG.baseURL}/text/chatcompletion_v2`,
        {
          model: 'MiniMax-M2.1',
          messages: [
            {
              role: 'system',
              content: `You are a professional translator. Translate the following text to ${targetLangName}. Keep it natural, conversational, and concise.`
            },
            {
              role: 'user',
              content: text
            }
          ],
          temperature: 0.3,
          tokens_to_generate: 1000,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: API_CONFIG.timeout,
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('MiniMax translation error:', error?.response?.data || error.message);
      // 回退到简单的翻译逻辑
      return `[${targetLang.toUpperCase()}] ${text}`;
    }
  },

  /**
   * 批量翻译
   */
  async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    try {
      const langNames: Record<string, string> = {
        'zh': 'Chinese',
        'kr': 'Korean', 
        'ja': 'Japanese',
        'en': 'English',
      };

      const targetLangName = langNames[targetLang] || 'Chinese';

      const response = await axios.post(
        `${API_CONFIG.baseURL}/text/chatcompletion_v2`,
        {
          model: 'MiniMax-M2.1',
          messages: [
            {
              role: 'system',
              content: `You are a professional translator. Translate the following array of texts to ${targetLangName}. Return as a JSON array of strings. Keep them natural and conversational.`
            },
            {
              role: 'user',
              content: JSON.stringify(texts)
            }
          ],
          temperature: 0.3,
          tokens_to_generate: 2000,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: API_CONFIG.timeout,
        }
      );

      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
      const jsonContent = jsonMatch ? jsonMatch[1] : content;

      return JSON.parse(jsonContent);
    } catch (error: any) {
      console.error('MiniMax batch translation error:', error?.response?.data || error.message);
      // 回退
      return texts.map(t => `[${targetLang.toUpperCase()}] ${t}`);
    }
  },

  /**
   * 对话翻译 (支持多轮对话)
   */
  async translateConversation(
    conversation: { role: string; content: string }[],
    targetLang: string
  ): Promise<string> {
    try {
      const langNames: Record<string, string> = {
        'zh': 'Chinese',
        'kr': 'Korean', 
        'ja': 'Japanese',
        'en': 'English',
      };

      const targetLangName = langNames[targetLang] || 'Chinese';

      const response = await axios.post(
        `${API_CONFIG.baseURL}/text/chatcompletion_v2`,
        {
          model: 'MiniMax-M2.1',
          messages: [
            {
              role: 'system',
              content: `You are a professional translator for travel conversations. Translate the following conversation to ${targetLangName}. Keep it natural and conversational.`
            },
            ...conversation.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ],
          temperature: 0.3,
          tokens_to_generate: 1500,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: API_CONFIG.timeout,
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('MiniMax conversation translation error:', error?.response?.data || error.message);
      throw error;
    }
  },
};

// 语音识别 (ASR)
export const asrAPI = {
  /**
   * 语音转文字 (使用 MiniMax ASR)
   */
  async recognizeSpeech(audioUrl: string, language: string = 'zh'): Promise<string> {
    try {
      const response = await axios.post(
        `${API_CONFIG.baseURL}/audio/asr`,
        {
          model: 'speech-1',
          audio_url: audioUrl,
          language,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: 60000,
        }
      );

      return response.data.text;
    } catch (error: any) {
      console.error('MiniMax ASR error:', error?.response?.data || error.message);
      throw error;
    }
  },
};

// 文本转语音 (TTS)
export const ttsAPI = {
  /**
   * 文字转语音 (使用 MiniMax TTS)
   */
  async synthesizeSpeech(
    text: string,
    voice: string = 'female-1',
    speed: number = 1.0
  ): Promise<string> {
    try {
      const voiceIds: Record<string, string> = {
        'zh-female-1': 'coco-female-1',
        'zh-male-1': 'henry-male-1',
        'kr-female-1': 'yuna-female-1',
        'ja-female-1': 'akari-female-1',
        'en-female-1': 'ava-female-1',
      };

      const selectedVoice = voiceIds[voice] || 'coco-female-1';

      const response = await axios.post(
        `${API_CONFIG.baseURL}/audio/tts`,
        {
          model: 'speech-1',
          text,
          voice_id: selectedVoice,
          speed,
          volume: 1.0,
        },
        {
          headers: getMiniMaxHeaders(),
          timeout: 30000,
        }
      );

      return response.data.audio_url;
    } catch (error: any) {
      console.error('MiniMax TTS error:', error?.response?.data || error.message);
      throw error;
    }
  },
};

// 预设对话库
export const PRESET_PHRASES = {
  // 韩语 → 中文
  kr: [
    { id: 'food_1', emoji: '🧋', original: '이 메뉴가 뭐예요?', translated: '这个菜单是什么？', scenario: '美食' },
    { id: 'food_2', emoji: '🥡', original: '매운 거 좋아해요?', translated: '你喜欢吃辣的吗？', scenario: '美食' },
    { id: 'food_3', emoji: '🍚', original: '이거是一个人份이예요?', translated: '这是一人份吗？', scenario: '美食' },
    { id: 'food_4', emoji: '💳', original: '결제 어떻게 해요?', translated: '怎么付款？', scenario: '美食' },
    { id: 'transport_1', emoji: '🚖', original: '여기에서 외滩까지 얼마예요?', translated: '从这里去外滩多少钱？', scenario: '交通' },
    { id: 'transport_2', emoji: '🚇', original: '지하철 타는 법 좀 알려주세요', translated: '教我怎么看地铁', scenario: '交通' },
    { id: 'transport_3', emoji: '🚕', original: '택시 불러줄 수 있어요?', translated: '能帮我叫出租车吗？', scenario: '交通' },
    { id: 'shopping_1', emoji: '💰', original: '이거 얼마예요?', translated: '这个多少钱？', scenario: '购物' },
    { id: 'shopping_2', emoji: '🏷️', original: '할인 돼요?', translated: '能打折吗？', scenario: '购物' },
    { id: 'shopping_3', emoji: '💳', original: '카드로 결제해도 돼요?', translated: '能刷卡吗？', scenario: '购物' },
    { id: 'social_1', emoji: '📸', original: '사진 좀 찍어주세요', translated: '能帮我拍张照吗？', scenario: '社交' },
    { id: 'social_2', emoji: '👍', original: '이거 맛있어요?', translated: '这个好吃吗？', scenario: '社交' },
    { id: 'social_3', emoji: '🗺️', original: '여기 뭐하는 곳이에요?', translated: '这里是做什么的？', scenario: '社交' },
    { id: 'social_4', emoji: '👋', original: '中国人呀？你好！', translated: '中国人呀？你好！', scenario: '社交' },
  ],
  // 日语 → 中文
  ja: [
    { id: 'food_1', emoji: '🧋', original: 'このメニューは何ですか？', translated: '这个菜单是什么？', scenario: '美食' },
    { id: 'food_2', emoji: '🌶️', original: '辛いものは好きですか？', translated: '你喜欢吃辣的吗？', scenario: '美食' },
    { id: 'transport_1', emoji: '🚖', original: '外滩までいくらですか？', translated: '去外滩多少钱？', scenario: '交通' },
    { id: 'shopping_1', emoji: '💰', original: 'これはいくらですか？', translated: '这个多少钱？', scenario: '购物' },
    { id: 'social_1', emoji: '📸', original: '写真を帮我一枚撮ってくれますか？', translated: '能帮我拍张照吗？', scenario: '社交' },
  ],
  // 英语 → 中文
  en: [
    { id: 'food_1', emoji: '🧋', original: "What's this on the menu?", translated: '这个菜单是什么？', scenario: 'Food' },
    { id: 'food_2', emoji: '🌶️', original: 'Do you have anything spicy?', translated: '有辣的吗？', scenario: 'Food' },
    { id: 'transport_1', emoji: '🚖', original: 'How much to the Bund?', translated: '去外滩多少钱？', scenario: 'Transport' },
    { id: 'shopping_1', emoji: '💰', original: 'How much is this?', translated: '这个多少钱？', scenario: 'Shopping' },
    { id: 'social_1', emoji: '📸', original: 'Can you take a photo for me?', translated: '能帮我拍张照吗？', scenario: 'Social' },
  ],
};

// 语音识别配置
export const SPEECH_CONFIG = {
  providers: {
    minimax: {
      model: 'speech-1',
      language: 'auto-detect',
    },
  },
  languages: {
    'kr': 'ko-KR',
    'ja': 'ja-JP',
    'en': 'en-US',
    'zh': 'zh-CN',
  },
};

// 语音合成配置
export const TTS_CONFIG = {
  providers: {
    minimax: {
      model: 'speech-1',
      voices: {
        'zh-female-1': 'coco-female-1',
        'zh-male-1': 'henry-male-1',
        'kr-female-1': 'yuna-female-1',
        'ja-female-1': 'akari-female-1',
        'en-female-1': 'ava-female-1',
      },
    },
  },
  defaultVoice: 'zh-female-1',
  defaultSpeed: 1.0,
};

// 语言代码映射
export const LANGUAGE_CODES = {
  'kr': { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  'ja': { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  'en': { code: 'en', name: 'English', flag: '🇺🇸' },
  'zh': { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
};

export default {
  translationAPI,
  asrAPI,
  ttsAPI,
  PRESET_PHRASES,
  SPEECH_CONFIG,
  TTS_CONFIG,
  LANGUAGE_CODES,
};
