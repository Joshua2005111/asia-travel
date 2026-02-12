/**
 * FOREIGNER_APP 翻译状态管理
 */

import { create } from 'zustand';

// 翻译状态类型
export interface TranslationState {
  // 输入/输出
  inputText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  
  // UI状态
  isLoading: boolean;
  isSpeaking: boolean;
  showLanguageSelector: boolean;
  
  // 历史记录
  translationHistory: TranslationHistoryItem[];
  
  // 收藏短语
  savedPhrases: SavedPhrase[];
  
  // Actions
  setInputText: (text: string) => void;
  setTranslatedText: (text: string) => void;
  setSourceLang: (lang: string) => void;
  setTargetLang: (lang: string) => void;
  swapLanguages: () => void;
  
  setLoading: (loading: boolean) => void;
  setSpeaking: (speaking: boolean) => void;
  toggleLanguageSelector: () => void;
  
  // 历史记录
  addToHistory: (item: TranslationHistoryItem) => void;
  clearHistory: () => void;
  
  // 收藏短语
  addPhrase: (phrase: SavedPhrase) => void;
  removePhrase: (phraseId: string) => void;
  
  // 重置
  reset: () => void;
}

// 翻译历史项
export interface TranslationHistoryItem {
  id: string;
  original: string;
  translated: string;
  sourceLang: string;
  targetLang: string;
  timestamp: Date;
}

// 收藏短语
export interface SavedPhrase {
  id: string;
  emoji: string;
  original: string;
  translated: string;
  scenario: string;
  createdAt: Date;
}

// 初始状态
const INITIAL_STATE = {
  inputText: '',
  translatedText: '',
  sourceLang: 'en',
  targetLang: 'zh',
  isLoading: false,
  isSpeaking: false,
  showLanguageSelector: false,
  translationHistory: [],
  savedPhrases: [],
};

// 创建状态管理
export const useTranslationStore = create<TranslationState>((set, get) => ({
  ...INITIAL_STATE,
  
  // Actions
  setInputText: (text: string) => {
    set({ inputText: text });
  },
  
  setTranslatedText: (text: string) => {
    set({ translatedText: text });
  },
  
  setSourceLang: (lang: string) => {
    set({ sourceLang: lang });
  },
  
  setTargetLang: (lang: string) => {
    set({ targetLang: lang });
  },
  
  swapLanguages: () => {
    const { sourceLang, targetLang, inputText, translatedText } = get();
    set({
      sourceLang: targetLang,
      targetLang: sourceLang,
      inputText: translatedText,
      translatedText: inputText,
    });
  },
  
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  
  setSpeaking: (speaking: boolean) => {
    set({ isSpeaking: speaking });
  },
  
  toggleLanguageSelector: () => {
    set({ showLanguageSelector: !get().showLanguageSelector });
  },
  
  // 历史记录
  addToHistory: (item: TranslationHistoryItem) => {
    const history = get().translationHistory;
    // 只保留最近50条
    const newHistory = [item, ...history].slice(0, 50);
    set({ translationHistory: newHistory });
  },
  
  clearHistory: () => {
    set({ translationHistory: [] });
  },
  
  // 收藏短语
  addPhrase: (phrase: SavedPhrase) => {
    const phrases = get().savedPhrases;
    // 避免重复
    if (!phrases.find((p) => p.original === phrase.original)) {
      set({ savedPhrases: [phrase, ...phrases] });
    }
  },
  
  removePhrase: (phraseId: string) => {
    const phrases = get().savedPhrases.filter((p) => p.id !== phraseId);
    set({ savedPhrases: phrases });
  },
  
  // 重置
  reset: () => {
    set(INITIAL_STATE);
  },
}));

// 语言选项
export const LANGUAGE_OPTIONS = [
  { id: 'en', name: 'English', flag: '🇺🇸', code: 'en' },
  { id: 'kr', name: '한국어', flag: '🇰🇷', code: 'ko' },
  { id: 'ja', name: '日本語', flag: '🇯🇵', code: 'ja' },
  { id: 'zh', name: '中文', flag: '🇨🇳', code: 'zh-CN' },
  { id: 'es', name: 'Español', flag: '🇪🇸', code: 'es' },
  { id: 'fr', name: 'Français', flag: '🇫🇷', code: 'fr' },
  { id: 'de', name: 'Deutsch', flag: '🇩🇪', code: 'de' },
];

export default useTranslationStore;
