module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      // Reanimated plugin (for animations)
      'react-native-reanimated/plugin',
    ],
  };
};
