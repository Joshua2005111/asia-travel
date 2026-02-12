/**
 * 📸 看得懂吗 - BeReal打卡页面
 * 
 * 功能：
 * - 一键拍照打卡
 * - 全球排行榜
 * - 实时排名
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
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../utils/theme';
import { analytics } from '../services/AnalyticsService';

const { width, height } = Dimensions.get('window');

// 排行榜数据
const RANKING_DATA = [
  {
    id: '1',
    username: 'TravelPro',
    avatar: 'https://i.pravatar.cc/150?img=1',
    location: '北京故宫',
    likes: 234,
    isTop: true,
  },
  {
    id: '2',
    username: 'AdventureKate',
    avatar: 'https://i.pravatar.cc/150?img=5',
    location: '上海外滩',
    likes: 198,
    isTop: false,
  },
  {
    id: '3',
    username: 'ChinaExplorer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    location: '成都熊猫基地',
    likes: 156,
    isTop: false,
  },
  {
    id: '4',
    username: 'FoodieMike',
    avatar: 'https://i.pravatar.cc/150?img=8',
    location: '西安兵马俑',
    likes: 134,
    isTop: false,
  },
  {
    id: '5',
    username: 'Wanderlust',
    avatar: 'https://i.pravatar.cc/150?img=9',
    location: '杭州西湖',
    likes: 112,
    isTop: false,
  },
];

// 我的打卡数据
const MY_CHECKINS = [
  {
    id: '1',
    location: '北京胡同',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=300',
    date: '2026-02-08',
    likes: 45,
  },
  {
    id: '2',
    location: '上海外滩',
    image: 'https://images.unsplash.com/photo-1548567117-8278942325a5?w=300',
    date: '2026-02-05',
    likes: 89,
  },
  {
    id: '3',
    location: '成都火锅',
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=300',
    date: '2026-02-01',
    likes: 67,
  },
];

// 排行榜项组件
function RankingItem({
  item,
  index,
}: {
  item: typeof RANKING_DATA[0];
  index: number;
}) {
  const isTop3 = index < 3;

  return (
    <View style={[styles.rankingItem, item.isTop && styles.rankingItemTop]}>
      {/* 排名 */}
      <View style={styles.rankingIndex}>
        {isTop3 ? (
          <Text style={[styles.rankingIndexText, { fontSize: 28 }]}>
            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
          </Text>
        ) : (
          <Text style={styles.rankingIndexNumber}>{index + 1}</Text>
        )}
      </View>

      {/* 头像 */}
      <Image source={{ uri: item.avatar }} style={styles.rankingAvatar} />

      {/* 信息 */}
      <View style={styles.rankingInfo}>
        <Text style={styles.rankingUsername}>{item.username}</Text>
        <Text style={styles.rankingLocation}>📍 {item.location}</Text>
      </View>

      {/* 点赞 */}
      <View style={styles.rankingLikes}>
        <Text style={styles.rankingLikesText}>❤️ {item.likes}</Text>
      </View>
    </View>
  );
}

// 我的打卡组件
function MyCheckinItem({ item }: { item: typeof MY_CHECKINS[0] }) {
  return (
    <View style={styles.myCheckinItem}>
      <Image source={{ uri: item.image }} style={styles.myCheckinImage} />
      <View style={styles.myCheckinInfo}>
        <Text style={styles.myCheckinLocation}>{item.location}</Text>
        <Text style={styles.myCheckinDate}>{item.date}</Text>
        <Text style={styles.myCheckinLikes}>❤️ {item.likes}</Text>
      </View>
    </View>
  );
}

function BeRealScreen({ navigation }: { navigation: any }) {
  const [activeTab, setActiveTab] = useState<'ranking' | 'my'>('ranking');
  const [flashAnim] = useState(new Animated.Value(0));

  // 拍照闪光动画
  const triggerFlash = () => {
    Animated.sequence([
      Animated.timing(flashAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(flashAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // 拍照
  const handleTakePhoto = async () => {
    triggerFlash();
    await analytics.presets.berealPosted();
    // 模拟拍照
    setTimeout(() => {
      // 跳转选择位置页面
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      {/* 闪光层 */}
      <Animated.View
        style={[
          styles.flashOverlay,
          {
            opacity: flashAnim,
          },
        ]}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 标题 */}
        <View style={styles.header}>
          <Text style={styles.title}>📸 BeReal打卡</Text>
          <Text style={styles.subtitle}>晒出你的中国瞬间</Text>
        </View>

        {/* 拍照按钮 */}
        <View style={styles.cameraSection}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handleTakePhoto}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={theme.colors.gradients.bereal}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cameraButtonGradient}
            >
              <View style={styles.cameraCircle}>
                <Text style={styles.cameraIcon}>📷</Text>
              </View>
              <Text style={styles.cameraText}>拍照打卡</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.cameraHint}>
            记录每一个精彩瞬间
          </Text>
        </View>

        {/* Tab切换 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'ranking' && styles.tabActive]}
            onPress={() => setActiveTab('ranking')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'ranking' && styles.tabTextActive,
              ]}
            >
              🌍 今日中国排行榜
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'my' && styles.tabActive]}
            onPress={() => setActiveTab('my')}
          >
            <Text
              style={[styles.tabText, activeTab === 'my' && styles.tabTextActive]}
            >
              🏆 我的排名
            </Text>
          </TouchableOpacity>
        </View>

        {/* 排行榜 */}
        {activeTab === 'ranking' && (
          <View style={styles.rankingSection}>
            {/* 冠军卡片 */}
            <View style={styles.topCard}>
              <Image
                source={{ uri: RANKING_DATA[0].avatar }}
                style={styles.topAvatar}
              />
              <Text style={styles.topUsername}>{RANKING_DATA[0].username}</Text>
              <Text style={styles.topLocation}>📍 {RANKING_DATA[0].location}</Text>
              <View style={styles.topBadge}>
                <Text style={styles.topBadgeText}>🥇 今日冠军</Text>
              </View>
            </View>

            {/* 排行榜列表 */}
            <View style={styles.rankingList}>
              {RANKING_DATA.slice(1).map((item, index) => (
                <RankingItem key={item.id} item={item} index={index + 1} />
              ))}
            </View>
          </View>
        )}

        {/* 我的打卡 */}
        {activeTab === 'my' && (
          <View style={styles.mySection}>
            {/* 我的排名 */}
            <View style={styles.myRankCard}>
              <View style={styles.myRankInfo}>
                <Text style={styles.myRankTitle}>我的排名</Text>
                <Text style={styles.myRankNumber}>#42</Text>
              </View>
              <View style={styles.myRankStats}>
                <View style={styles.myStat}>
                  <Text style={styles.myStatValue}>12</Text>
                  <Text style={styles.myStatLabel}>打卡</Text>
                </View>
                <View style={styles.myStat}>
                  <Text style={styles.myStatValue}>89</Text>
                  <Text style={styles.myStatLabel}>获赞</Text>
                </View>
                <View style={styles.myStat}>
                  <Text style={styles.myStatValue}>256</Text>
                  <Text style={styles.myStatLabel}>粉丝</Text>
                </View>
              </View>
            </View>

            {/* 我的打卡列表 */}
            <Text style={styles.myCheckinTitle}>📒 我的打卡</Text>
            <View style={styles.myCheckinList}>
              {MY_CHECKINS.map((item) => (
                <MyCheckinItem key={item.id} item={item} />
              ))}
            </View>
          </View>
        )}

        {/* 底部安全区 */}
        <View style={styles.bottomSafe} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFF',
    zIndex: 100,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen,
    paddingTop: theme.spacing.xxl,
  },
  // 标题
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: theme.fonts.cn.size.h1,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontFamily: theme.fonts.en.body,
    fontSize: 16,
    color: theme.colors.text.tertiary,
  },
  // 拍照区域
  cameraSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  cameraButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    ...theme.shadows.bereal,
  },
  cameraButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  cameraIcon: {
    fontSize: 36,
  },
  cameraText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  cameraHint: {
    fontFamily: theme.fonts.en.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.md,
  },
  // Tab
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: 4,
    marginBottom: theme.spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
  },
  tabActive: {
    backgroundColor: theme.colors.background.primary,
    ...theme.shadows.sm,
  },
  tabText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.tertiary,
  },
  tabTextActive: {
    color: theme.colors.text.primary,
  },
  // 排行榜
  rankingSection: {
    marginBottom: theme.spacing.xxl,
  },
  topCard: {
    backgroundColor: theme.colors.primary.bereal + '20',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.bereal,
  },
  topAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: theme.spacing.sm,
  },
  topUsername: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  topLocation: {
    fontFamily: theme.fonts.en.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
    marginTop: 4,
  },
  topBadge: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.warning,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  topBadgeText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  rankingList: {
    gap: theme.spacing.sm,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
  },
  rankingItemTop: {
    backgroundColor: theme.colors.primary.bereal + '10',
    borderWidth: 1,
    borderColor: theme.colors.primary.bereal + '30',
  },
  rankingIndex: {
    width: 40,
    alignItems: 'center',
  },
  rankingIndexText: {
    fontSize: 24,
  },
  rankingIndexNumber: {
    fontFamily: theme.fonts.en.headline,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.tertiary,
  },
  rankingAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: theme.spacing.sm,
  },
  rankingInfo: {
    flex: 1,
  },
  rankingUsername: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  rankingLocation: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  rankingLikes: {
    backgroundColor: theme.colors.primary.bereal + '20',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  rankingLikesText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary.bereal,
  },
  // 我的打卡
  mySection: {
    marginBottom: theme.spacing.xxl,
  },
  myRankCard: {
    backgroundColor: theme.colors.primary.bereal + '20',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  myRankInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  myRankTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  myRankNumber: {
    fontFamily: theme.fonts.en.headline,
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.primary.bereal,
  },
  myRankStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  myStat: {
    alignItems: 'center',
  },
  myStatValue: {
    fontFamily: theme.fonts.en.headline,
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  myStatLabel: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  myCheckinTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  myCheckinList: {
    gap: theme.spacing.sm,
  },
  myCheckinItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  myCheckinImage: {
    width: 80,
    height: 80,
  },
  myCheckinInfo: {
    flex: 1,
    padding: theme.spacing.sm,
    justifyContent: 'center',
  },
  myCheckinLocation: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  myCheckinDate: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    marginTop: 2,
  },
  myCheckinLikes: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.primary.bereal,
    marginTop: 4,
  },
  // 底部安全区
  bottomSafe: {
    height: 40,
  },
});

export default BeRealScreen;
