/**
 * 🎲 ChinaMate / 볼懂? / 看得懂吗 - 外国人在中国的趣味旅行App
 * 
 * 支持语言：🇺🇸 English / 🇨🇳 中文 / 🇰🇷 한국어
 * 
 * 功能：
 * - 🎲 盲盒推荐：发现本地人私藏的宝藏地点
 * - 💬 盲盒聊天：30分钟自动解散的匿名社交
 * - 🤖 AI翻译官：打破语言壁垒
 * - 📸 BeReal打卡：晒出你的中国瞬间
 * - 🗺️ 发现地图：探索城市每一个角落
 * - 🌏 中韩交友：结交韩国朋友，学习语言文化
 */

import React, { useEffect, useState } from 'react';
import { StatusBar, Platform, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './utils/theme';
import i18n from './i18n';
import { useUserStore } from './stores/userStore';
import { authService } from './services/AuthService';

// 页面组件
import HomeScreen from './screens/HomeScreen';
import MysteryBoxScreen from './screens/MysteryBoxScreen';
import ChatScreen from './screens/ChatScreen';
import BeRealScreen from './screens/BeRealScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import TranslationScreen from './screens/TranslationScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LanguageScreen from './screens/LanguageScreen';
import PaymentScreen from './screens/PaymentScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import PrivacySettingsScreen from './screens/PrivacySettingsScreen';
import CrossBorderScreen from './screens/CrossBorderScreen';
import ForumScreen from './screens/ForumScreen';

// Tab Navigator
const Tab = createBottomTabNavigator();

// Stack Navigator
const Stack = createNativeStackNavigator();

// Tab图标组件
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, string> = {
    Home: '🏠',
    Mystery: '🎲',
    Chat: '💬',
    BeReal: '📸',
    Map: '🗺️',
    Profile: '👤',
    Forum: '💬',
  };

  return (
    <Text
      style={{
        fontSize: 24,
        opacity: focused ? 1 : 0.5,
        textAlign: 'center',
      }}
    >
      {icons[name] || '📌'}
    </Text>
  );
};

// 底部Tab栏
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.secondary,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: theme.colors.primary.mystery,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarLabelStyle: {
          fontFamily: theme.fonts.cn.body,
          fontSize: 10,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: i18n.t('nav.home'),
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Mystery"
        component={MysteryBoxScreen}
        options={{
          title: i18n.t('nav.mystery'),
          tabBarIcon: ({ focused }) => <TabIcon name="Mystery" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: i18n.t('nav.chat'),
          tabBarIcon: ({ focused }) => <TabIcon name="Chat" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Forum"
        component={ForumScreen}
        options={{
          title: '论坛',
          tabBarIcon: ({ focused }) => <TabIcon name="Forum" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="BeReal"
        component={BeRealScreen}
        options={{
          title: i18n.t('bereal.title').replace('📸 ', ''),
          tabBarIcon: ({ focused }) => <TabIcon name="BeReal" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: i18n.t('nav.map'),
          tabBarIcon: ({ focused }) => <TabIcon name="Map" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

// 根组件
function App(): JSX.Element {
  const { setUser, setToken, logout } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarding, setIsOnboarding] = useState(true);

  // 检查登录状态
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // 检查引导页
        const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        setIsOnboarding(!onboardingCompleted);

        // 检查登录状态
        const isLoggedIn = await authService.isLoggedIn();
        if (isLoggedIn) {
          const user = await authService.getUser();
          const token = await authService.getToken();
          if (user && token) {
            setUser(user);
            setToken(token);
          }
        }
      } catch (e) {
        console.log('Bootstrap error:', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // 处理登录
  const handleLogin = async (email: string, password: string) => {
    const result = await authService.login(email, password);
    if (result.success && result.user && result.token) {
      setUser(result.user);
      setToken(result.token);
    } else {
      Alert.alert('登录失败', result.error || '请检查邮箱和密码');
    }
  };

  // 处理注册
  const handleRegister = async (username: string, email: string, password: string) => {
    const result = await authService.register(username, email, password);
    if (result.success && result.user && result.token) {
      setUser(result.user);
      setToken(result.token);
    } else {
      Alert.alert('注册失败', result.error || '请稍后重试');
    }
  };

  if (isLoading) {
    return null; // 或者显示启动画面
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.primary} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* 引导页 */}
          {isOnboarding && (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
          
          {/* 语言选择 */}
          <Stack.Screen name="Language" component={LanguageScreen} />

          {/* 登录/注册 */}
          <Stack.Screen name="Login" options={{ gestureEnabled: false }}>
            {(props) => (
              <LoginScreen
                {...props}
                onLogin={handleLogin}
                onSwitchToRegister={() => props.navigation.navigate('Register')}
              />
            )}
          </Stack.Screen>
          
          <Stack.Screen name="Register">
            {(props) => (
              <RegisterScreen
                {...props}
                onRegister={handleRegister}
                onSwitchToLogin={() => props.navigation.navigate('Login')}
              />
            )}
          </Stack.Screen>

          {/* 主功能 */}
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Translation" component={TranslationScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
          <Stack.Screen name="CrossBorder" component={CrossBorderScreen} />
          <Stack.Screen name="Forum" component={ForumScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
