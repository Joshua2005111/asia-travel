import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import * as Localization from 'expo-localization';

import { translationLoader } from './src/utils/i18n';
import { useTranslation } from './src/hooks/useTranslation';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import TranslateScreen from './src/screens/TranslateScreen';
import MapsScreen from './src/screens/MapsScreen';
import BookingScreen from './src/screens/BookingScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Keep the splash screen visible while we load resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const { t, locale, setLocale } = useTranslation();

  useEffect(() => {
    async function prepare() {
      try {
        // Load translations
        await translationLoader.loadLocale(locale);
        
        // Set device locale
        const deviceLocale = Localization.getLocales()[0]?.languageCode || 'en';
        setLocale(deviceLocale);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Translate':
                  iconName = focused ? 'language' : 'language-outline';
                  break;
                case 'Maps':
                  iconName = focused ? 'map' : 'map-outline';
                  break;
                case 'Booking':
                  iconName = focused ? 'ticket' : 'ticket-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
                default:
                  iconName = 'help';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#1E3A8A',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            },
            headerStyle: {
              backgroundColor: '#1E3A8A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: t('nav.home') }}
          />
          <Tab.Screen 
            name="Translate" 
            component={TranslateScreen}
            options={{ title: t('nav.translate') }}
          />
          <Tab.Screen 
            name="Maps" 
            component={MapsScreen}
            options={{ title: t('nav.maps') }}
          />
          <Tab.Screen 
            name="Booking" 
            component={BookingScreen}
            options={{ title: t('nav.booking') }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ title: t('nav.profile') }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
