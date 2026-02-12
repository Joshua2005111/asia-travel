import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TabBarIconProps {
  routeName: string;
  focused: boolean;
  color: string;
}

const ICONS: Record<string, string> = {
  Home: 'home',
  Translate: 'translate',
  Maps: 'map',
  Booking: 'ticket',
  Profile: 'account',
};

export default function TabBarIcon({ routeName, focused, color }: TabBarIconProps) {
  const iconName = ICONS[routeName] || 'circle';

  return (
    <Icon
      name={iconName}
      size={26}
      color={color}
      style={focused ? { opacity: 1 } : { opacity: 0.6 }}
    />
  );
}
