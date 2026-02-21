module.exports = {
  expo: {
    name: "Asia Travel",
    slug: "asia-travel",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#FF6B35"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.asiatravel.app",
      icon: "./assets/icon1024.png"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#FF6B35",
        resizeMode: "contain"
      },
      package: "com.asiatravel.app",
      versionCode: 1
    },
    web: {
      favicon: "./assets/icon.png"
    }
  }
};
