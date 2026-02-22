/**
 * Test for Theme Utils
 */

import { theme } from '../src/utils/theme';

describe('Theme Utils', () => {
  it('should have required color definitions', () => {
    expect(theme.colors).toBeDefined();
    expect(theme.colors.primary).toBeDefined();
    expect(theme.colors.secondary).toBeDefined();
    expect(theme.colors.background).toBeDefined();
    expect(theme.colors.text).toBeDefined();
  });

  it('should have valid primary color hex values', () => {
    const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    
    expect(theme.colors.primary.main).toMatch(colorRegex);
    expect(theme.colors.primary.light).toMatch(colorRegex);
    expect(theme.colors.primary.dark).toMatch(colorRegex);
  });

  it('should have valid secondary color hex values', () => {
    const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    
    expect(theme.colors.secondary.main).toMatch(colorRegex);
    expect(theme.colors.secondary.light).toMatch(colorRegex);
    expect(theme.colors.secondary.dark).toMatch(colorRegex);
  });

  it('should have valid background color hex values', () => {
    const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    
    expect(theme.colors.background.primary).toMatch(colorRegex);
    expect(theme.colors.background.secondary).toMatch(colorRegex);
    expect(theme.colors.background.dark).toMatch(colorRegex);
  });

  it('should have valid text color hex values', () => {
    const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    
    expect(theme.colors.text.primary).toMatch(colorRegex);
    expect(theme.colors.text.secondary).toMatch(colorRegex);
    expect(theme.colors.text.inverse).toMatch(colorRegex);
  });

  it('should have valid status color hex values', () => {
    const colorRegex = /^#([0-9A-F]{3}){1,2}$/i;
    
    expect(theme.colors.status.success).toMatch(colorRegex);
    expect(theme.colors.status.warning).toMatch(colorRegex);
    expect(theme.colors.status.error).toMatch(colorRegex);
    expect(theme.colors.status.info).toMatch(colorRegex);
  });

  it('should have spacing values', () => {
    expect(theme.spacing).toBeDefined();
    expect(typeof theme.spacing.sm).toBe('number');
    expect(typeof theme.spacing.md).toBe('number');
    expect(typeof theme.spacing.lg).toBe('number');
    expect(theme.spacing.sm).toBe(8);
    expect(theme.spacing.md).toBe(16);
    expect(theme.spacing.lg).toBe(24);
  });

  it('should have borderRadius', () => {
    expect(theme.borderRadius).toBeDefined();
    expect(typeof theme.borderRadius.sm).toBe('number');
    expect(typeof theme.borderRadius.md).toBe('number');
    expect(typeof theme.borderRadius.lg).toBe('number');
    expect(theme.borderRadius.sm).toBe(4);
    expect(theme.borderRadius.md).toBe(8);
    expect(theme.borderRadius.lg).toBe(12);
  });

  it('should have shadows defined', () => {
    expect(theme.shadows).toBeDefined();
    expect(theme.shadows.small).toBeDefined();
    expect(theme.shadows.medium).toBeDefined();
    expect(theme.shadows.large).toBeDefined();
  });

  it('should have fonts defined', () => {
    expect(theme.fonts).toBeDefined();
    expect(theme.fonts.cn).toBeDefined();
    expect(theme.fonts.en).toBeDefined();
    expect(theme.fonts.kr).toBeDefined();
  });
});
