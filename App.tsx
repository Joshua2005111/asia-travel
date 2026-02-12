import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import TranslationScreen from './src/screens/TranslationScreen';
import MapsScreen from './src/screens/MapsScreen';
import BookingScreen from './src/screens/BookingScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Components
import TabBarIcon from './src/components/TabBarIcon';

// Navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon routeName={route.name} focused={focused} color={color} />
        ),
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: t('nav.home') }}
      />
      <Tab.Screen 
        name="Translate" 
        component={TranslationScreen}
        options={{ title: t('nav.translate') }}
      />
      <Tab.Screen 
        name="Maps" 
        component={MapsScreen}
        options={{ title: t('nav.maps') }}
      />
      <Tab.Screen 
        name="Bookings" 
        component={BookingScreen}
        options={{ title: t('nav.booking') }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: t('nav.profile') }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { i18n } = useTranslation();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen}
          options={{ 
            headerShown: true,
            title: '支付',
            headerBackTitle: '返回',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
