export interface TranslationHistoryItem {
  id: string;
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  timestamp: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName?: string;
}

export interface TranslationState {
  // State
  inputText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  isLoading: boolean;
  error: string | null;
  translationHistory: TranslationHistoryItem[];
  savedPhrases: TranslationHistoryItem[];
  recentLanguages: LanguageOption[];

  // Actions
  setInputText: (text: string) => void;
  setTranslatedText: (text: string) => void;
  setSourceLang: (lang: string) => void;
  setTargetLang: (lang: string) => void;
  swapLanguages: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addToHistory: (item: TranslationHistoryItem) => void;
  clearHistory: () => void;
  savePhrase: (phrase: TranslationHistoryItem) => void;
  removeSavedPhrase: (id: string) => void;
  clearTranslation: () => void;
  translate: (text: string, sourceLang: string, targetLang: string) => Promise<void>;
}
