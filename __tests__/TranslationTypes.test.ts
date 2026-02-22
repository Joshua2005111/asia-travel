/**
 * Test for Translation Types
 */

import { 
  TranslationHistoryItem, 
  LanguageOption, 
  TranslationState 
} from '../src/types/TranslationTypes';

describe('Translation Types', () => {
  describe('TranslationHistoryItem', () => {
    it('should have required properties', () => {
      const item: TranslationHistoryItem = {
        id: '1',
        originalText: 'Hello',
        translatedText: '你好',
        sourceLang: 'en',
        targetLang: 'zh',
        timestamp: '2026-02-22T00:00:00Z',
      };

      expect(item.id).toBeDefined();
      expect(item.originalText).toBeDefined();
      expect(item.translatedText).toBeDefined();
      expect(item.sourceLang).toBeDefined();
      expect(item.targetLang).toBeDefined();
      expect(item.timestamp).toBeDefined();
    });
  });

  describe('LanguageOption', () => {
    it('should have required properties', () => {
      const lang: LanguageOption = {
        code: 'en',
        name: 'English',
        nativeName: 'English',
      };

      expect(lang.code).toBeDefined();
      expect(lang.name).toBeDefined();
    });

    it('should allow optional nativeName', () => {
      const lang: LanguageOption = {
        code: 'zh',
        name: 'Chinese',
      };

      expect(lang.code).toBe('zh');
      expect(lang.name).toBe('Chinese');
      expect(lang.nativeName).toBeUndefined();
    });
  });

  describe('TranslationState', () => {
    it('should have all required state properties', () => {
      const state: Partial<TranslationState> = {
        inputText: '',
        translatedText: '',
        sourceLang: 'en',
        targetLang: 'zh',
        isLoading: false,
        error: null,
        translationHistory: [],
        savedPhrases: [],
        recentLanguages: [],
      };

      expect(state.inputText).toBeDefined();
      expect(state.translatedText).toBeDefined();
      expect(state.sourceLang).toBeDefined();
      expect(state.targetLang).toBeDefined();
      expect(state.isLoading).toBeDefined();
      expect(state.error).toBeDefined();
      expect(state.translationHistory).toBeDefined();
      expect(state.savedPhrases).toBeDefined();
      expect(state.recentLanguages).toBeDefined();
    });

    it('should have all required action methods', () => {
      const actions: TranslationState = {
        inputText: '',
        translatedText: '',
        sourceLang: 'en',
        targetLang: 'zh',
        isLoading: false,
        error: null,
        translationHistory: [],
        savedPhrases: [],
        recentLanguages: [],
        setInputText: jest.fn(),
        setTranslatedText: jest.fn(),
        setSourceLang: jest.fn(),
        setTargetLang: jest.fn(),
        swapLanguages: jest.fn(),
        setLoading: jest.fn(),
        setError: jest.fn(),
        addToHistory: jest.fn(),
        clearHistory: jest.fn(),
        savePhrase: jest.fn(),
        removeSavedPhrase: jest.fn(),
        clearTranslation: jest.fn(),
        translate: jest.fn(),
      };

      expect(typeof actions.setInputText).toBe('function');
      expect(typeof actions.setTranslatedText).toBe('function');
      expect(typeof actions.setSourceLang).toBe('function');
      expect(typeof actions.setTargetLang).toBe('function');
      expect(typeof actions.swapLanguages).toBe('function');
      expect(typeof actions.setLoading).toBe('function');
      expect(typeof actions.setError).toBe('function');
      expect(typeof actions.addToHistory).toBe('function');
      expect(typeof actions.clearHistory).toBe('function');
      expect(typeof actions.savePhrase).toBe('function');
      expect(typeof actions.removeSavedPhrase).toBe('function');
      expect(typeof actions.clearTranslation).toBe('function');
      expect(typeof actions.translate).toBe('function');
    });
  });
});
