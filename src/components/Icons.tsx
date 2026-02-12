/**
 * FOREIGNER_APP 图标组件
 * 
 * 使用SVG图标，保持年轻、简洁的风格
 */

import React from 'react';
import Svg, { Path, Circle, G, Rect } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';
import theme from '../utils/theme';

// ============ Home 图标 ============
export const HomeIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill={color}>
    {focused ? (
      <Path d="M12 3L4 9V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H9V16H15V22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L12 3Z" fill={color} />
    ) : (
      <Path d="M12 5.69L5 11.19V20C5 20.55 5.45 21 6 21H18C18.55 21 19 20.55 19 20V11.19L12 5.69ZM12 4L20 9.5V19H15V14H9V19H4V9.5L12 4Z" fill={color} />
    )}
  </Svg>
);

// ============ 盲盒 图标 ============
export const MysteryIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill={color}>
    <Path d="M4 8C4 6.89543 4.89543 6 6 6H8V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6H18C19.1046 6 20 6.89543 20 8V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V8ZM6 8V18H18V8H6ZM10 4V6H14V4H10Z" fill={color} />
    {focused && (
      <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.3">
        <animate attributeName="r" from="6" to="10" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="1s" repeatCount="indefinite" />
      </Circle>
    )}
  </Svg>
);

// ============ 聊天 图标 ============
export const ChatIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill={color}>
    {focused ? (
      <Path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2.0423 13.7025 2.0423 12.0423C2.0423 7.13318 6.13318 3.0423 11.0423 3.0423C15.9514 3.0423 20.0423 7.13318 20.0423 12.0423C20.0423 16.9514 15.9514 21.0423 11.0423 21.0423C9.62252 21.0423 8.26309 20.8225 7.04819 20.4102L7.29117 20.8242Z" fill={color} />
    ) : (
      <Path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2.0423 13.7025 2.0423 12.0423C2.0423 7.13318 6.13318 3.0423 11.0423 3.0423C15.9514 3.0423 20.0423 7.13318 20.0423 12.0423C20.0423 16.9514 15.9514 21.0423 11.0423 21.0423C9.62252 21.0423 8.26309 20.8225 7.04819 20.4102L7.29117 20.8242ZM11.0423 18.0423C14.4915 18.0423 17.2923 15.2405 17.2923 11.7923C17.2923 8.34413 14.4915 5.54232 11.0423 5.54232C7.59314 5.54232 4.79232 8.34413 4.79232 11.7923C4.79232 15.2405 7.59314 18.0423 11.0423 18.0423Z" fill={color} />
    )}
  </Svg>
);

// ============ 地图 图标 ============
export const MapIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill={color}>
    {focused ? (
      <Path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill={color} />
    ) : (
      <Path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill={color} />
    )}
  </Svg>
);

// ============ 个人 图标 ============
export const ProfileIcon = ({ focused, color }: { focused: boolean; color: string }) => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill={color}>
    {focused ? (
      <Path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill={color} />
    ) : (
      <Path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill={color} />
    )}
  </Svg>
);

// ============ 更多图标 ============

// 搜索图标
export const SearchIcon = ({ size = 24, color = theme.colors.text.secondary }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
    <Path d="M21 21L16.5 16.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// 关闭图标
export const CloseIcon = ({ size = 24, color = theme.colors.text.secondary }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// 心形图标
export const HeartIcon = ({ filled = false, size = 24, color = theme.colors.text.secondary }: { filled?: boolean; size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke={color} strokeWidth="2" />
  </Svg>
);

// 分享图标
export const ShareIcon = ({ size = 24, color = theme.colors.text.secondary }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 13V19C18 20.1046 17.1046 21 16 21H6C4.89543 21 4 20.1046 4 19V8C4 6.89543 4.89543 6 6 6H12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 3L20 8L12 13L4 8L12 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// 相机图标
export const CameraIcon = ({ size = 24, color = theme.colors.text.secondary }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 15.2C14.0783 15.2 15.6911 13.5873 15.6911 11.5091C15.6911 9.43086 14.0783 7.81818 12 7.81818C9.92172 7.81818 8.30903 9.43086 8.30903 11.5091C8.30903 13.5873 9.92172 15.2 12 15.2Z" stroke={color} strokeWidth="2" />
    <Path d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9Z" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// 箭头图标
export const ArrowRightIcon = ({ size = 24, color = theme.colors.text.secondary }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12H19M19 12L12 5M19 12L12 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// 震动/通知图标
export const NotificationIcon = ({ size = 24, color = theme.colors.text.secondary }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 22C13.1046 22 14 21.1046 14 20H10C10 21.1046 10.8954 22 12 22Z" stroke={color} strokeWidth="2" />
    <Path d="M18 16V11C18 7.13 15.45 4 12 4V4C8.55 4 6 7.13 6 11V16L4 18V19H20V18L18 16Z" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export default {
  HomeIcon,
  MysteryIcon,
  ChatIcon,
  MapIcon,
  ProfileIcon,
  SearchIcon,
  CloseIcon,
  HeartIcon,
  ShareIcon,
  CameraIcon,
  ArrowRightIcon,
  NotificationIcon,
};
