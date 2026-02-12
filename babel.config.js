module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // Reanimated plugin (for animations)
    'react-native-reanimated/plugin',
    
    // Remove console logs in production
    process.env.NODE_ENV === 'production' && {
      visitor: {
        CallExpression(path) {
          if (
            path.get('callee').matchesPattern('console', true)
          ) {
            path.parentPath.remove();
          }
        },
      },
    },
  ].filter(Boolean),
  
  // Module resolution
  resolvers: [
    'babel-preset-expo/node-modules-as-babel-resolver',
  ],
  
  // Source maps
  sourceMaps: true,
  sourceType: 'module',
  
  // Transform ignore
  exclude: [
    /node_modules\/react-native/,
    /node_modules\/react/,
  ],
};
