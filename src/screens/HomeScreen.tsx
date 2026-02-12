/**
 * FOREIGNER_APP 首页
 * 
 * 设计重点：
 * - 大胆的欢迎语
 * - 搜索框简洁明了
 * - 快捷入口卡片式设计
 * - 推荐内容瀑布流
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

// 导入组件
import { SearchIcon, CameraIcon } from '../components/Icons';

// 主题颜色（内联避免导入问题）
const colors = {
  primary: { blue: '#4F46E5', pink: '#EC4899' },
  secondary: { mystery: '#8B5CF6', info: '#3B82F6', warning: '#F59E0B' },
  background: { primary: '#0F172A', secondary: '#1E293B', tertiary: '#334155' },
  text: { primary: '#F8FAFC', secondary: '#94A3B8', tertiary: '#64748B' },
};

const theme = {
  colors,
  fonts: {
    cn: { body: 'NotoSansSC-Regular' },
    en: { body: 'Inter-Regular', size: { body: 16 } },
  },
  borderRadius: { lg: 24, xl: 32, xxl: 48 },
  spacing: { sm: 8, md: 16, lg: 24, xl: 32 },
  shadows: { md: '0 4px 16px rgba(0, 0, 0, 0.3)', glow: '0 0 40px rgba(79, 70, 229, 0.4)' },
};

// 屏幕尺寸
const { width } = Dimensions.get('window');

// 快捷入口数据
const QUICK_ACTIONS = [
  { id: '1', icon: '🎲', label: '盲盒旅行', color: colors.secondary.mystery, action: 'mysteryBox' },
  { id: '2', icon: '💬', label: '找人聊', color: colors.primary.pink, action: 'chat' },
  { id: '3', icon: '🗺️', label: '周边探索', color: colors.secondary.info, action: 'map' },
  { id: '4', icon: '📸', label: '今日打卡', color: colors.secondary.warning, action: 'bereal' },
];

// 推荐内容数据
const RECOMMENDATIONS = [
  {
    id: '1',
    title: '上海最神秘的爵士酒吧',
    subtitle: '藏在法租界的地下爵士乐现场',
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=400',
    likes: '2.3K',
    location: '上海·徐汇区',
  },
  {
    id: '2',
    title: '凌晨3点的北京路边摊',
    subtitle: '老北京人才知道的深夜食堂',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
    likes: '1.8K',
    location: '北京·朝阳区',
  },
  {
    id: '3',
    title: '成都太古里的隐藏咖啡馆',
    subtitle: '只有本地人带路才能找到',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    likes: '3.1K',
    location: '成都·锦江区',
  },
];

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 头部欢迎语 */}
        <Animated.View entering={FadeInDown.duration(600).springify()} style={styles.header}>
          <Text style={styles.greeting}>你好，旅行者 👋</Text>
          <Text style={styles.subtitle}>今天想去哪里冒险？</Text>
        </Animated.View>

        {/* 搜索框 */}
        <Animated.View entering={FadeInDown.duration(600).delay(100).springify()}>
          <TouchableOpacity style={styles.searchContainer} activeOpacity={0.8}>
            <SearchIcon size={20} color={colors.text.tertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder="搜索目的地、美食、体验..."
              placeholderTextColor={colors.text.tertiary}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* 快捷入口 */}
        <Animated.View entering={FadeInDown.duration(600).delay(200).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>快速开始</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
            {QUICK_ACTIONS.map((item) => (
              <TouchableOpacity
                key={String(item.id)}
                style={[styles.quickActionCard, { backgroundColor: String(item.color) }]}
                activeOpacity={0.85}
              >
                <Text style={styles.quickActionIcon}>{String(item.icon)}</Text>
                <Text style={styles.quickActionLabel}>{String(item.label)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* 为你推荐 */}
        <Animated.View entering={FadeInDown.duration(600).delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>为你推荐</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>查看全部 →</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendations}>
            {RECOMMENDATIONS.map((item) => (
              <TouchableOpacity key={String(item.id)} style={styles.recommendationCard} activeOpacity={0.9}>
                <View style={styles.recommendationImage}>
                  <LinearGradient
                    colors={['transparent', 'rgba(15, 23, 42, 0.8)']}
                    style={styles.imageOverlay}
                  >
                    <Text style={styles.recommendationLocation}>📍 {String(item.location)}</Text>
                  </LinearGradient>
                </View>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>{String(item.title)}</Text>
                  <Text style={styles.recommendationSubtitle} numberOfLines={1}>
                    {String(item.subtitle)}
                  </Text>
                  <View style={styles.recommendationFooter}>
                    <Text style={styles.likes}>❤️ {String(item.likes)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* 今日盲盒入口 */}
        <Animated.View entering={FadeInDown.duration(600).delay(400).springify()}>
          <TouchableOpacity style={styles.mysteryBanner} activeOpacity={0.9}>
            <LinearGradient
              colors={[colors.secondary.mystery, colors.primary.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mysteryGradient}
            >
              <Text style={styles.mysteryTitle}>🎲 今日盲盒</Text>
              <Text style={styles.mysterySubtitle}>发现隐藏的惊喜体验</Text>
              <View style={styles.mysteryButton}>
                <Text style={styles.mysteryButtonText}>立即开启</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* 功能入口 */}
        <Animated.View entering={FadeInDown.duration(600).delay(500).springify()} style={styles.featureGrid}>
          <TouchableOpacity style={styles.featureCard} activeOpacity={0.9}>
            <LinearGradient
              colors={['rgba(79, 70, 229, 0.15)', 'rgba(79, 70, 229, 0.05)']}
              style={styles.featureGradient}
            >
              <Text style={styles.featureIcon}>🔤</Text>
              <Text style={styles.featureTitle}>即时翻译</Text>
              <Text style={styles.featureSubtitle}>打破语言壁垒</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard} activeOpacity={0.9}>
            <LinearGradient
              colors={['rgba(16, 185, 129, 0.15)', 'rgba(16, 185, 129, 0.05)']}
              style={styles.featureGradient}
            >
              <Text style={styles.featureIcon}>🤖</Text>
              <Text style={styles.featureTitle}>AI 助手</Text>
              <Text style={styles.featureSubtitle}>智能行程规划</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard} activeOpacity={0.9}>
            <LinearGradient
              colors={['rgba(245, 158, 11, 0.15)', 'rgba(245, 158, 11, 0.05)']}
              style={styles.featureGradient}
            >
              <Text style={styles.featureIcon}>📸</Text>
              <Text style={styles.featureTitle}>拍照翻译</Text>
              <Text style={styles.featureSubtitle}>路牌菜单一扫即懂</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard} activeOpacity={0.9}>
            <LinearGradient
              colors={['rgba(236, 72, 153, 0.15)', 'rgba(236, 72, 153, 0.05)']}
              style={styles.featureGradient}
            >
              <Text style={styles.featureIcon}>💬</Text>
              <Text style={styles.featureTitle}>紧急对话</Text>
              <Text style={styles.featureSubtitle}>常用短语一键播放</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    padding: theme.spacing.screen,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: 16,
    color: colors.text.primary,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  seeAll: {
    fontSize: 14,
    color: colors.secondary.info,
  },
  quickActions: {
    marginHorizontal: -theme.spacing.screen,
    paddingHorizontal: theme.spacing.screen,
  },
  quickActionCard: {
    width: 72,
    height: 88,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    ...theme.shadows.md,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: theme.spacing.xs,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  recommendations: {
    marginHorizontal: -theme.spacing.screen,
    paddingHorizontal: theme.spacing.screen,
  },
  recommendationCard: {
    width: 200,
    backgroundColor: colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    marginRight: theme.spacing.md,
    overflow: 'hidden',
  },
  recommendationImage: {
    height: 120,
    backgroundColor: colors.background.tertiary,
  },
  imageOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: theme.spacing.sm,
  },
  recommendationLocation: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  recommendationContent: {
    padding: theme.spacing.md,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginBottom: theme.spacing.sm,
  },
  recommendationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  mysteryBanner: {
    borderRadius: theme.borderRadius.xxl,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.glow,
  },
  mysteryGradient: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  mysteryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  mysterySubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: theme.spacing.md,
  },
  mysteryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
  },
  mysteryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - theme.spacing.screen * 2 - theme.spacing.md) / 2,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
  },
  featureGradient: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 12,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
});

export default HomeScreen;
