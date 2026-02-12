import * as Localization from 'expo-localization';

export const i18n = {
  locale: 'en',
  translations: {} as Record<string, Record<string, string>>,
};

// Translation files
const translationFiles: Record<string, () => Promise<any>> = {
  en: () => import('../locales/en.json'),
  zh: () => import('../locales/zh.json'),
};

export const translationLoader = {
  loadLocale: async (locale: string) => {
    // Normalize locale (e.g., 'zh-CN' -> 'zh')
    const normalizedLocale = locale.split('-')[0];
    
    try {
      if (translationFiles[normalizedLocale]) {
        const translations = await translationFiles[normalizedLocale]();
        i18n.translations = translations.default || translations;
        i18n.locale = normalizedLocale;
      } else {
        // Default to English
        const translations = await translationFiles.en();
        i18n.translations = translations.default || translations;
        i18n.locale = 'en';
      }
    } catch (e) {
      console.warn(`Failed to load translations for ${locale}, using English`);
      try {
        const translations = await translationFiles.en();
        i18n.translations = translations.default || translations;
      } catch (e2) {
        console.warn('Failed to load English translations');
      }
    }
  },
};

export function t(key: string): string {
  // Try to get translation from current locale
  if (i18n.translations[key]) {
    return i18n.translations[key];
  }
  
  // Fallback to English if available
  if (i18n.translations['en'] && i18n.translations['en'][key]) {
    return i18n.translations['en'][key];
  }
  
  // Return the key itself as fallback
  return key;
}
