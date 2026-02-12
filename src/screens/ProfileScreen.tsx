/**
 * FOREIGNER_APP 个人中心页面
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../utils/theme';
import { SettingsIcon, GlobeIcon, ChevronRightIcon } from '../components/Icons';

const { width } = Dimensions.get('window');

function ProfileScreen({ navigation }: { navigation: any }) {
  // 模拟用户数据
  const USER_DATA = {
    avatar: '🇰🇷',
    name: '김민수 (金敏秀)',
    location: '首尔',
    stats: {
      visited: 12,
      mysteryBoxes: 8,
      chats: 5,
      saved: 23,
    },
  };

  const MENU_ITEMS = [
    { id: 'crossBorder', icon: '🌏', label: '中韩交友', color: '#10B981' },
    { id: 'itinerary', icon: '📅', label: '我的行程', color: '#4F46E5' },
    { id: 'saved', icon: '❤️', label: '已收藏', color: '#EC4899' },
    { id: 'checkins', icon: '📸', label: '我的打卡', color: '#F59E0B' },
    { id: 'history', icon: '🕐', label: '浏览历史', color: '#3B82F6' },
  ];

  const SETTINGS_ITEMS = [
    { id: 'language', icon: '🌐', label: '语言 / Language', hasChevron: true },
    { id: 'notifications', icon: '🔔', label: '通知设置', hasChevron: true },
    { id: 'privacy', icon: '🔒', label: '隐私设置', hasChevron: true },
    { id: 'help', icon: '❓', label: '帮助中心', hasChevron: true },
    { id: 'about', icon: 'ℹ️', label: '关于 FOREIGNER', hasChevron: true },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 头部 */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{USER_DATA.avatar}</Text>
            <View style={styles.avatarBadge}>
              <Text style={styles.avatarBadgeText}>Lv.3</Text>
            </View>
          </View>
          
          <Text style={styles.name}>{USER_DATA.name}</Text>
          <Text style={styles.location}>📍 {USER_DATA.location}</Text>
        </View>

        {/* 统计卡片 */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{USER_DATA.stats.visited}</Text>
            <Text style={styles.statLabel}>已探索</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{USER_DATA.stats.mysteryBoxes}</Text>
            <Text style={styles.statLabel}>盲盒</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{USER_DATA.stats.chats}</Text>
            <Text style={styles.statLabel}>聊天</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{USER_DATA.stats.saved}</Text>
            <Text style={styles.statLabel}>收藏</Text>
          </View>
        </View>

        {/* 功能列表 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>我的功能</Text>
          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index !== MENU_ITEMS.length - 1 && styles.menuItemBorder,
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  if (item.id === 'crossBorder') {
                    navigation.navigate('CrossBorder');
                  }
                }}
              >
                <View style={styles.menuItemLeft}>
                  <View
                    style={[
                      styles.menuItemIcon,
                      { backgroundColor: item.color + '20' },
                    ]}
                  >
                    <Text style={styles.menuItemEmoji}>{item.icon}</Text>
                  </View>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 设置列表 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>设置</Text>
          <View style={styles.settingsCard}>
            {SETTINGS_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.settingsItem,
                  index !== SETTINGS_ITEMS.length - 1 && styles.settingsItemBorder,
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.settingsItemLeft}>
                  <Text style={styles.settingsItemEmoji}>{item.icon}</Text>
                  <Text style={styles.settingsItemLabel}>{item.label}</Text>
                </View>
                {item.hasChevron && <Text style={styles.chevron}>›</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 退出登录 */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>

        {/* 版本信息 */}
        <Text style={styles.version}>Version 1.0.0</Text>

        {/* 底部安全区 */}
        <View style={styles.bottomSafeArea} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  // 头部
  header: {
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    fontSize: 80,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary.blue,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  avatarBadgeText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  name: {
    fontFamily: theme.fonts.kr.headline,
    fontSize: theme.fonts.kr.size.h2,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  location: {
    fontFamily: theme.fonts.kr.body,
    fontSize: theme.fonts.kr.size.body,
    color: theme.colors.text.secondary,
  },
  // 统计卡片
  statsCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.screen,
    marginBottom: theme.spacing.xl,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: theme.colors.overlay.light,
  },
  statNumber: {
    fontFamily: theme.fonts.kr.headline,
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  statLabel: {
    fontFamily: theme.fonts.kr.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    marginTop: 4,
  },
  // 区块
  section: {
    paddingHorizontal: theme.spacing.screen,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: theme.fonts.kr.headline,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  // 功能菜单
  menuCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.overlay.light,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  menuItemEmoji: {
    fontSize: 20,
  },
  menuItemLabel: {
    fontFamily: theme.fonts.kr.body,
    fontSize: theme.fonts.kr.size.body,
    color: theme.colors.text.primary,
  },
  chevron: {
    fontSize: 20,
    color: theme.colors.text.tertiary,
  },
  // 设置菜单
  settingsCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  settingsItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.overlay.light,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemEmoji: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
  },
  settingsItemLabel: {
    fontFamily: theme.fonts.kr.body,
    fontSize: theme.fonts.kr.size.body,
    color: theme.colors.text.primary,
  },
  // 退出登录
  logoutButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  logoutText: {
    fontFamily: theme.fonts.kr.body,
    fontSize: theme.fonts.kr.size.body,
    color: theme.colors.text.tertiary,
  },
  // 版本
  version: {
    fontFamily: theme.fonts.kr.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  // 底部安全区
  bottomSafeArea: {
    height: 100,
  },
});

export default ProfileScreen;
