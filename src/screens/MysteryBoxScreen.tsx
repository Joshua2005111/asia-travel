/**
 * 🎲 看得懂吗 - 盲盒推荐页面
 * 
 * 功能：
 * - 每日3个惊喜地点推荐
 * - 卡片翻转动画
 * - 一键导航
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// 主题颜色（内联避免问题）
const colors = {
  primary: { blue: '#4F46E5', pink: '#EC4899' },
  secondary: { mystery: '#8B5CF6', success: '#10B981', warning: '#F59E0B' },
  background: { primary: '#0F172A', secondary: '#1E293B', tertiary: '#334155' },
  text: { primary: '#F8FAFC', secondary: '#94A3B8', tertiary: '#64748B' },
};

const theme = {
  colors,
  fonts: {
    cn: { body: 'NotoSansSC-Regular' },
    en: { body: 'Inter-Regular' },
  },
  borderRadius: { lg: 24, xl: 32, xxl: 48 },
  spacing: { sm: 8, md: 16, lg: 24, xl: 32, screen: 20 },
  shadows: { md: '0 4px 16px rgba(0, 0, 0, 0.3)' },
};

const { width, height } = Dimensions.get('window');

// 模拟盲盒数据（确保所有值都是字符串）
const MYSTERY_BOX_DATA = [
  {
    id: '1',
    name: '南锣鼓巷',
    type: '景点',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600',
    rating: '4.8',
    reviews: '1234',
    distance: '1.2km',
    description: '北京最古老的街区之一，藏着无数小店和美食',
    tips: '建议下午去，人少且光线好',
    price: '免费',
    openTime: '全天开放',
  },
  {
    id: '2',
    name: '茶话会',
    type: '咖啡',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
    rating: '4.9',
    reviews: '567',
    distance: '800m',
    description: '藏在胡同里的文艺咖啡馆，老北京风格',
    tips: '必点桂花拿铁和驴打滚',
    price: '人均45元',
    openTime: '10:00-22:00',
  },
  {
    id: '3',
    name: '故宫角楼咖啡',
    type: '美食',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
    rating: '4.7',
    reviews: '2345',
    distance: '2.3km',
    description: '在故宫脚下喝咖啡，感受历史与现代的交融',
    tips: '推荐"朕的咖啡"和故宫雪糕',
    price: '人均58元',
    openTime: '09:00-19:00',
  },
];

function MysteryBoxScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const currentItem = MYSTERY_BOX_DATA[currentIndex];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎲 今日盲盒</Text>
        <Text style={styles.headerSubtitle}>发现隐藏的惊喜</Text>
      </View>

      {/* 盲盒卡片 */}
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.card, { transform: [{ translateY: slideAnim }] }]}>
          <Image source={{ uri: currentItem.image }} style={styles.cardImage} />
          <LinearGradient
            colors={['transparent', 'rgba(15, 23, 42, 0.9)']}
            style={styles.cardOverlay}
          >
            <View style={styles.cardBadge}>
              <Text style={styles.cardBadgeText}>{String(currentItem.type)}</Text>
            </View>
            <Text style={styles.cardTitle}>{String(currentItem.name)}</Text>
            <View style={styles.cardMeta}>
              <Text style={styles.cardRating}>⭐ {String(currentItem.rating)}</Text>
              <Text style={styles.cardReviews}>({String(currentItem.reviews)}条评价)</Text>
              <Text style={styles.cardDistance}>📍 {String(currentItem.distance)}</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>

      {/* 卡片指示器 */}
      <View style={styles.indicators}>
        {MYSTERY_BOX_DATA.map((_, index) => (
          <View
            key={String(index)}
            style={[
              styles.indicator,
              index === currentIndex && styles.indicatorActive,
            ]}
          />
        ))}
      </View>

      {/* 详情信息 */}
      <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>💡 推荐理由</Text>
          <Text style={styles.detailText}>{String(currentItem.description)}</Text>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>✨ 小贴士</Text>
          <View style={styles.tipBox}>
            <Text style={styles.tipText}>{String(currentItem.tips)}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💰</Text>
            <Text style={styles.infoLabel}>消费</Text>
            <Text style={styles.infoValue}>{String(currentItem.price)}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🕐</Text>
            <Text style={styles.infoLabel}>时间</Text>
            <Text style={styles.infoValue}>{String(currentItem.openTime)}</Text>
          </View>
        </View>

        {/* 按钮组 */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
            <LinearGradient
              colors={[colors.secondary.mystery, colors.primary.pink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>📍 一键导航</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
            <Text style={styles.secondaryButtonText}>🔄 换一个</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>🎁 每天3次机会，发现城市隐藏的惊喜</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: theme.spacing.screen,
    paddingBottom: theme.spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  cardContainer: {
    paddingHorizontal: theme.spacing.screen,
    marginBottom: theme.spacing.md,
  },
  card: {
    width: '100%',
    height: 280,
    borderRadius: theme.borderRadius.xxl,
    overflow: 'hidden',
    backgroundColor: colors.background.secondary,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: theme.spacing.lg,
  },
  cardBadge: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.xl,
  },
  cardBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary.mystery,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRating: {
    fontSize: 14,
    color: '#FFD700',
    marginRight: 4,
  },
  cardReviews: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginRight: theme.spacing.md,
  },
  cardDistance: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.tertiary,
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: colors.secondary.mystery,
    width: 20,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen,
  },
  detailSection: {
    marginBottom: theme.spacing.lg,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  tipBox: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.secondary.mystery,
  },
  tipText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 22,
  },
  infoGrid: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xl,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  infoIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    textAlign: 'center',
  },
  buttonGroup: {
    marginBottom: theme.spacing.xl,
  },
  primaryButton: {
    borderRadius: theme.borderRadius.xxl,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: theme.borderRadius.xxl,
    backgroundColor: colors.background.secondary,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,
  },
  footerText: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
});

export default MysteryBoxScreen;
