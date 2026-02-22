/**
 * Test for App Config
 */

// Mock __DEV__ 
global.__DEV__ = true;

const config = require('../src/config').config;

describe('App Config', () => {
  it('should have API configuration', () => {
    expect(config.api).toBeDefined();
    expect(config.api.baseURL).toBeDefined();
    expect(config.api.timeout).toBeGreaterThan(0);
  });

  it('should have MiniMax configuration', () => {
    expect(config.minimax).toBeDefined();
    expect(config.minimax.model).toBeDefined();
  });

  it('should have Amap configuration', () => {
    expect(config.amap).toBeDefined();
  });

  it('should have app information', () => {
    expect(config.app).toBeDefined();
    expect(config.app.name).toBe('FOREIGNER');
    expect(config.app.version).toBeDefined();
  });

  it('should have feature flags', () => {
    expect(config.features).toBeDefined();
    expect(typeof config.features.enableTranslation).toBe('boolean');
    expect(typeof config.features.enableMaps).toBe('boolean');
    expect(typeof config.features.enablePayment).toBe('boolean');
  });

  it('should have analytics config', () => {
    expect(config.analytics).toBeDefined();
  });

  it('should have push config', () => {
    expect(config.push).toBeDefined();
    expect(typeof config.push.enabled).toBe('boolean');
  });
});
