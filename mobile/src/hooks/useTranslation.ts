import React from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';
import * as Localization from 'expo-localization';

export type Locale = 'en' | 'zh' | 'kk' | 'uz' | 'tr' | 'ar';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.translate': 'Translate',
    'nav.maps': 'Maps',
    'nav.booking': 'Booking',
    'nav.profile': 'Profile',
    'home.welcome': 'Welcome to China',
    'home.subtitle': 'Your guide to exploring China',
    'home.emergency': 'Emergency',
    'home.quick_actions': 'Quick Actions',
    'translate.title': 'AI Translator',
    'translate.input_hint': 'Enter text or speak...',
    'translate.result': 'Translation',
    'translate.speak': 'Speak',
    'maps.title': 'Navigation',
    'maps.search': 'Search places...',
    'maps.nearby': 'Nearby',
    'maps.directions': 'Directions',
    'booking.title': 'Book Tickets',
    'booking.train': 'Train',
    'booking.flight': 'Flight',
    'booking.car': 'Car Rental',
    'profile.title': 'Profile',
    'profile.settings': 'Settings',
    'profile.language': 'Language',
    'profile.currency': 'Currency',
    'profile.help': 'Help',
  },
  zh: {
    'nav.home': '首页',
    'nav.translate': '翻译',
    'nav.maps': '地图',
    'nav.booking': '预订',
    'nav.profile': '我的',
    'home.welcome': '欢迎来到中国',
    'home.subtitle': '您的中国旅游指南',
    'home.emergency': '紧急求助',
    'home.quick_actions': '快捷功能',
    'translate.title': 'AI翻译',
    'translate.input_hint': '输入文字或语音输入...',
    'translate.result': '翻译结果',
    'translate.speak': '说话',
    'maps.title': '导航',
    'maps.search': '搜索地点...',
    'maps.nearby': '附近',
    'maps.directions': '路线',
    'booking.title': '预订票务',
    'booking.train': '火车',
    'booking.flight': '飞机',
    'booking.car': '租车',
    'profile.title': '个人中心',
    'profile.settings': '设置',
    'profile.language': '语言',
    'profile.currency': '货币',
    'profile.help': '帮助',
  },
  kk: {
    'nav.home': 'Басты бет',
    'nav.translate': 'Аударма',
    'nav.maps': 'Карта',
    'nav.booking': 'Брондау',
    'nav.profile': 'Профиль',
    'home.welcome': 'Қытайға қош келдіңіз',
    'home.subtitle': 'Қытайды зерттеу нұсқаулығы',
  },
  uz: {
    'nav.home': 'Bosh sahifa',
    'nav.translate': 'Tarjima',
    'nav.maps': 'Xarita',
    'nav.booking': 'Buyurtma',
    'nav.profile': 'Profil',
    'home.welcome': 'Xitoyga xush kelibsiz',
    'home.subtitle': 'Xitoyni o\'rganish qo\'llanmasi',
  },
  tr: {
    'nav.home': 'Ana Sayfa',
    'nav.translate': 'Çeviri',
    'nav.maps': 'Harita',
    'nav.booking': 'Rezervasyon',
    'nav.profile': 'Profil',
    'home.welcome': 'Çin\'e hoş geldiniz',
    'home.subtitle': 'Çin\'i keşfetme rehberiniz',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.translate': 'الترجمة',
    'nav.maps': 'الخريطة',
    'nav.booking': 'الحجز',
    'nav.profile': 'الملف الشخصي',
    'home.welcome': 'مرحباً بكم في الصين',
    'home.subtitle': 'دليلك لاستكشاف الصين',
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  const t = (key: string): string => {
    return translations[locale][key] || translations.en[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
