export const theme = {
  colors: {
    primary: {
      main: '#FF6B6B',
      light: '#FF8E8E',
      dark: '#EE5A5A',
      mystery: '#9B59B6',
    },
    secondary: {
      main: '#4ECDC4',
      light: '#7EDDD6',
      dark: '#45B7AA',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      dark: '#1A1A2E',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
      tertiary: '#B2BEC3',
      inverse: '#FFFFFF',
    },
    status: {
      success: '#00B894',
      warning: '#FDCB6E',
      error: '#D63031',
      info: '#0984E3',
    },
    border: {
      light: '#E0E0E0',
      main: '#DFE6E9',
      dark: '#B2BEC3',
    },
  },
  fonts: {
    cn: {
      heading: 'System',
      body: 'System',
      caption: 'System',
    },
    en: {
      heading: 'System',
      body: 'System',
      caption: 'System',
    },
    kr: {
      heading: 'System',
      body: 'System',
      caption: 'System',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
  },
};

export type Theme = typeof theme;
