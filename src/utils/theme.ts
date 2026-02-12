/**
 * FOREIGNER_APP 主题系统
 * 
 * 设计理念：
 * - 深色主题为主，年轻、科技感
 * - 渐变强调色，活力四射
 * - 大圆角，柔和现代
 */

// 调色板
export const colors = {
  // 主色调 - 品牌渐变
  primary: {
    blue: '#4F46E5',      // 主要按钮、重要强调
    pink: '#EC4899',      // 趣味、活力
    gradient: ['#4F46E5', '#EC4899'],  // 品牌渐变
  },

  // 辅助色
  secondary: {
    success: '#10B981',   // 成功状态
    warning: '#F59E0B',    // 警告、提醒
    error: '#EF4444',      // 错误、失败
    info: '#3B82F6',       // 信息提示
    mystery: '#8B5CF6',   // 紫色盲盒
    surprise: '#F97316',   // 橙色惊喜
  },

  // 背景色系 - 深色主题
  background: {
    primary: '#0F172A',    // 深空蓝
    secondary: '#1E293B',  // 深灰 - 卡片背景
    tertiary: '#334155',    // 次级卡片
    surface: '#0F172A',    // 表面
  },

  // 文字色
  text: {
    primary: '#F8FAFC',    // 主文字（白色）
    secondary: '#94A3B8',  // 次要文字
    tertiary: '#64748B',    // 辅助说明
    inverse: '#0F172A',    // 深色文字（浅色背景用）
  },

  // 渐变色集合
  gradients: {
    mystery: ['#8B5CF6', '#EC4899'],  // 盲盒渐变
    sunset: ['#F97316', '#EF4444'],   // 日落渐变
    ocean: ['#3B82F6', '#06B6D4'],    // 海洋渐变
    forest: ['#10B981', '#059669'],   // 森林渐变
  },

  // 覆盖层
  overlay: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(0, 0, 0, 0.5)',
  },
};

// 字体系统
export const fonts = {
  // 韩文
  kr: {
    headline: 'Pretendard-Bold',
    body: 'Pretendard-Regular',
    size: {
      h1: 32,
      h2: 24,
      h3: 20,
      body: 16,
      caption: 12,
    },
  },
  // 日文
  jp: {
    headline: 'NotoSansJP-Bold',
    body: 'NotoSansJP-Regular',
    size: {
      h1: 32,
      h2: 24,
      h3: 20,
      body: 16,
      caption: 12,
    },
  },
  // 中文
  cn: {
    headline: 'NotoSansSC-Bold',
    body: 'NotoSansSC-Regular',
    size: {
      h1: 32,
      h2: 24,
      h3: 20,
      body: 16,
      caption: 12,
    },
  },
  // 英文
  en: {
    headline: 'Inter-Bold',
    body: 'Inter-Regular',
    display: 'SpaceGrotesk-Bold',
    size: {
      h1: 32,
      h2: 24,
      h3: 20,
      body: 16,
      caption: 12,
    },
  },
};

// 间距系统
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  screen: 20,
  card: 20,
  cardGap: 16,
};

// 圆角系统
export const borderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  full: 9999,  // 全圆角
};

// 阴影系统
export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.2)',
  md: '0 4px 16px rgba(0, 0, 0, 0.3)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
  glow: '0 0 40px rgba(79, 70, 229, 0.4)',
  mystery: '0 0 60px rgba(236, 72, 153, 0.5)',
};

// 动画时长
export const animation = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// 常用样式集合
export const theme = {
  colors,
  fonts,
  spacing,
  borderRadius,
  shadows,
  animation,
  
  styles: {
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    card: {
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.lg,
      padding: spacing.card,
    },
    cardMystery: {
      backgroundColor: colors.secondary.mystery,
      borderRadius: borderRadius.xxl,
      padding: spacing.lg,
    },
    buttonPrimary: {
      height: 56,
      borderRadius: borderRadius.xl,
      backgroundColor: colors.primary.blue,
      justifyContent: 'center',
      alignItems: 'center',
      ...shadows.md,
    },
    buttonMystery: {
      height: 64,
      borderRadius: borderRadius.xxl,
      backgroundColor: '#F8FAFC',
      justifyContent: 'center',
      alignItems: 'center',
      ...shadows.mystery,
    },
    input: {
      height: 56,
      backgroundColor: colors.background.tertiary,
      borderRadius: borderRadius.xl,
      paddingHorizontal: spacing.md,
      color: colors.text.primary,
      fontSize: fonts.en.size.body,
    },
  },
};

export default theme;
