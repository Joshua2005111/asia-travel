/**
 * FOREIGNER_APP Metro配置
 * 
 * Metro bundler configuration for React Native
 */

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts, sourceExts },
    transformer,
  } = await getDefaultConfig();

  return {
    transformer: {
      ...transformer,
      // Babel配置
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      
      // Asset extensions
      assetExts: [...assetExts, 'db', 'mp3', 'ttf', 'otf', 'lottie', 'zip'],
      
      // Source extensions  
      sourceExts: [...sourceExts, 'svg', 'mjs'],
      
      // Enable SVGR
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: true,
          inlineRequires: true,
        },
      }),
    },
    
    // Resolver
    resolver: {
      // Node modules resolution
      nodeModulesPaths: [
        __dirname,
        __dirname + '/node_modules',
        __dirname + '/../node_modules',
      ],
      
      // Asset resolver
      assetExts: [...assetExts, 'db', 'mp3', 'ttf', 'otf', 'lottie', 'zip'],
      
      // Source resolver
      sourceExts: [...sourceExts, 'svg', 'mjs'],
    },
    
    // Server
    server: {
      port: 8081,
    },
    
    // Watch folder
    watchFolders: [
      __dirname,
      __dirname + '/node_modules',
    ],
  };
})();
