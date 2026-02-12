/**
 * 💬 ChinaMate - 论坛/榜单页面
 * 
 * 功能：
 * - 话题分类
 * - 帖子列表（热门/精华/最新）
 * - 地点榜单（美食、景点等）
 * - 打卡评分
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../utils/theme';
import { forumService, ForumTopic, ForumPost } from '../services/ForumService';
import { rankingService, RankingCategory, RankingItem } from '../services/RankingService';

// 模拟数据
const RANKING_CATEGORIES: RankingCategory[] = [
  { id: 'food', name: '美食', nameEn: 'Food', nameKr: '음식', icon: '🍜', description: '上海最受欢迎', color: '#FF6B6B' },
  { id: 'view', name: '景点', nameEn: 'Attractions', nameKr: '관광지', icon: '🏛️', description: '必打卡网红点', color: '#4ECDC4' },
  { id: 'coffee', name: '咖啡', nameEn: 'Coffee', nameKr: '카페', icon: '☕', description: '精品咖啡馆', color: '#A67B5B' },
  { id: 'nightlife', name: '夜生活', nameEn: 'Nightlife', nameKr: '야경', icon: '🌙', description: '酒吧夜市', color: '#9B59B6' },
];

const TOP3_WINNERS = [
  { 
    rank: 1, 
    name: '裕兴记', 
    score: 98.5, 
    checkins: 5678, 
    badge: '🏆',
    color: '#FFD700',
    reward: '☕ 咖啡券 x3',
    cities: '上海/北京/成都/杭州',
  },
  { 
    rank: 2, 
    name: '外滩', 
    score: 99.2, 
    checkins: 12345, 
    badge: '🥈',
    color: '#C0C0C0',
    reward: '🎬 电影券 x3',
    cities: '全国通用',
  },
  { 
    rank: 3, 
    name: 'M Stand', 
    score: 96.8, 
    checkins: 4567, 
    badge: '🥉',
    color: '#CD7F32',
    reward: '☕ 咖啡券 x2',
    cities: '上海/北京/成都/杭州',
  },
];

// 月榜Top1奖励
const MONTHLY_TOP1 = {
  name: '外滩',
  checkins: 45678,
  score: 98.8,
  reward: '🎁 中国任选城市深度游 x1',
  cities: '北京/杭州/成都/西安/重庆/广州/厦门/青岛/云南/哈尔滨',
  includes: '专车+导游+午餐+景点+旅拍',
};

// 话题分类项
function TopicItem({ item, onPress }: { item: ForumTopic; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.topicItem} onPress={onPress}>
      <View style={[styles.topicIcon, { backgroundColor: theme.colors.primary.mystery + '20' }]}>
        <Text style={styles.topicEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.topicName}>{item.name}</Text>
      <Text style={styles.topicCount}>{item.todayCount}新帖</Text>
    </TouchableOpacity>
  );
}

// 帖子卡片
function PostCard({ item }: { item: ForumPost }) {
  return (
    <TouchableOpacity style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
        <View style={styles.postInfo}>
          <Text style={styles.postUsername}>{item.username}</Text>
          <Text style={styles.postMeta}>
            {item.topicName} · {item.createdAt}
          </Text>
        </View>
        {item.isEssence && (
          <View style={styles.essenceBadge}>
            <Text style={styles.essenceText}>精华</Text>
          </View>
        )}
      </View>

      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={2}>
        {item.content}
      </Text>

      {item.images && item.images.length > 0 && (
        <Image source={{ uri: item.images[0] }} style={styles.postImage} />
      )}

      <View style={styles.postTags}>
        {item.tags.slice(0, 3).map((tag, index) => (
          <Text key={index} style={styles.postTag}>#{tag}</Text>
        ))}
      </View>

      <View style={styles.postFooter}>
        <View style={styles.postStat}>
          <Text style={styles.postStatText}>❤️ {item.likes}</Text>
        </View>
        <View style={styles.postStat}>
          <Text style={styles.postStatText}>💬 {item.comments}</Text>
        </View>
        <View style={styles.postStat}>
          <Text style={styles.postStatText}>👁️ {item.views}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// 榜单卡片
function RankingCard({ item, index }: { item: RankingItem; index: number }) {
  const medals = ['🥇', '🥈', '🥉'];
  
  return (
    <TouchableOpacity style={styles.rankingCard}>
      <View style={styles.rankingLeft}>
        {index < 3 ? (
          <Text style={styles.rankingMedal}>{medals[index]}</Text>
        ) : (
          <Text style={styles.rankingNumber}>{index + 1}</Text>
        )}
        <Image source={{ uri: item.image }} style={styles.rankingImage} />
      </View>
      
      <View style={styles.rankingContent}>
        <Text style={styles.rankingName}>{item.name}</Text>
        <Text style={styles.rankingTags}>{item.tags.join(' · ')}</Text>
        <View style={styles.rankingStats}>
          <Text style={styles.rankingRating}>⭐ {item.rating}</Text>
          <Text style={styles.rankingCheckins}>📍 {item.checkinCount}人打卡</Text>
        </View>
      </View>

      <View style={styles.rankingScore}>
        <Text style={styles.scoreText}>{item.score}</Text>
        <Text style={styles.scoreLabel}>分</Text>
      </View>
    </TouchableOpacity>
  );
}

function ForumScreen({ navigation }: { navigation: any }) {
  const [activeTab, setActiveTab] = useState<'forum' | 'ranking'>('forum');
  const [forumTab, setForumTab] = useState<'hot' | 'essence' | 'latest'>('latest');
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // 加载话题
  useEffect(() => {
    loadTopics();
    loadPosts();
  }, []);

  const loadTopics = async () => {
    const data = await forumService.getTopics();
    setTopics(data);
  };

  const loadPosts = async () => {
    const data = await forumService.getPosts(undefined, forumTab);
    setPosts(data.posts);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTopics();
    await loadPosts();
    setRefreshing(false);
  };

  // 渲染话题分类
  const renderTopics = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.topicList}
    >
      {topics.map((topic) => (
        <TopicItem key={topic.id} item={topic} onPress={() => {}} />
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* 标题 */}
        <View style={styles.header}>
          <Text style={styles.title}>💬 论坛</Text>
          <Text style={styles.subtitle}>分享旅行，发现精彩</Text>
        </View>

        {/* Tab切换 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'forum' && styles.tabActive]}
            onPress={() => setActiveTab('forum')}
          >
            <Text style={[styles.tabText, activeTab === 'forum' && styles.tabTextActive]}>
              讨论区
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'ranking' && styles.tabActive]}
            onPress={() => setActiveTab('ranking')}
          >
            <Text style={[styles.tabText, activeTab === 'ranking' && styles.tabTextActive]}>
              📊 榜单
            </Text>
          </TouchableOpacity>
        </View>

        {/* 讨论区 */}
        {activeTab === 'forum' && (
          <View style={styles.forumSection}>
            {/* 话题分类 */}
            {renderTopics()}

            {/* 论坛子Tab */}
            <View style={styles.forumTabContainer}>
              {(['latest', 'hot', 'essence'] as const).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.forumTab, forumTab === tab && styles.forumTabActive]}
                  onPress={() => {
                    setForumTab(tab);
                    loadPosts();
                  }}
                >
                  <Text
                    style={[
                      styles.forumTabText,
                      forumTab === tab && styles.forumTabTextActive,
                    ]}
                  >
                    {tab === 'latest' ? '最新' : tab === 'hot' ? '🔥 热门' : '✨ 精华'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 帖子列表 */}
            <View style={styles.postList}>
              {posts.map((post) => (
                <PostCard key={post.id} item={post} />
              ))}
            </View>

            {/* 发帖按钮 */}
            <TouchableOpacity style={styles.postButton}>
              <LinearGradient
                colors={theme.colors.gradients.mystery}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.postButtonGradient}
              >
                <Text style={styles.postButtonText}>+ 发布帖子</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* 榜单区 */}
        {activeTab === 'ranking' && (
          <View style={styles.rankingSection}>
            {/* 本周Top3 */}
            <View style={styles.top3Section}>
              <Text style={styles.sectionTitle}>🏆 本周Top3</Text>
              <Text style={styles.sectionSubtitle}>打卡最多的地点，赢取奖励</Text>
              
              <View style={styles.top3List}>
                {TOP3_WINNERS.map((item, index) => (
                  <View key={item.rank} style={[styles.top3Card, { borderColor: item.color }]}>
                    <Text style={styles.top3Badge}>{item.badge}</Text>
                    <Text style={[styles.top3Name, { color: item.color }]}>{item.name}</Text>
                    <Text style={styles.top3Stats}>
                      {item.checkins.toLocaleString()}打卡 · {item.score}分
                    </Text>
                    <View style={styles.top3Reward}>
                      <Text style={styles.top3RewardText}>
                        🎁 {item.reward}
                      </Text>
                    </View>
                    <Text style={styles.top3Cities}>
                      可用城市: {item.cities}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 榜单分类 */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            >
              {RANKING_CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.id} style={styles.categoryItem}>
                  <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                    <Text style={styles.categoryEmoji}>{cat.icon}</Text>
                  </View>
                  <Text style={styles.categoryName}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* 榜单列表 */}
            <View style={styles.rankingList}>
              <Text style={styles.sectionTitle}>📍 上海美食榜单</Text>
              {[1, 2, 3, 4, 5].map((i) => (
                <RankingCard
                  key={i}
                  item={{
                    id: `rank_${i}`,
                    placeId: `place_${i}`,
                    name: ['裕兴记', '外滩', 'M Stand', '哈灵面馆', '光明邨'][i - 1],
                    category: 'food',
                    city: '上海',
                    address: '地址',
                    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200',
                    rating: 4.8 - i * 0.1,
                    reviewCount: 2341 - i * 200,
                    checkinCount: 5678 - i * 500,
                    score: 98.5 - i * 2,
                    trend: i % 2 === 0 ? 'up' : 'same',
                    tags: ['本帮菜', '面馆', '网红'],
                    isTop3: i <= 3,
                  }}
                  index={i - 1}
                />
              ))}
            </View>

            {/* 打榜按钮 */}
            <TouchableOpacity style={styles.checkinButton}>
              <LinearGradient
                colors={theme.colors.gradients.mystery}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.checkinButtonGradient}
              >
                <Text style={styles.checkinButtonText}>📸 去打卡</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* 🏆 月榜Top1 */}
            <View style={styles.monthlySection}>
              <View style={styles.monthlyHeader}>
                <Text style={styles.monthlyIcon}>👑</Text>
                <View style={styles.monthlyTitleSection}>
                  <Text style={styles.monthlyTitle}>月榜冠军</Text>
                  <Text style={styles.monthlySubtitle}>本月打卡最多，赢超级大奖！</Text>
                </View>
              </View>

              <View style={styles.monthlyCard}>
                <View style={styles.monthlyRank}>
                  <Text style={styles.monthlyRankText}>🥇</Text>
                </View>
                
                <View style={styles.monthlyInfo}>
                  <Text style={styles.monthlyName}>{MONTHLY_TOP1.name}</Text>
                  <Text style={styles.monthlyStats}>
                    {MONTHLY_TOP1.checkins.toLocaleString()}打卡 · {MONTHLY_TOP1.score}分
                  </Text>
                  
                  <View style={styles.monthlyReward}>
                    <Text style={styles.monthlyRewardText}>{MONTHLY_TOP1.reward}</Text>
                  </View>
                  
                  <Text style={styles.monthlyCities}>
                    可选城市: {MONTHLY_TOP1.cities}
                  </Text>
                  
                  <Text style={styles.monthlyIncludes}>
                    包含: {MONTHLY_TOP1.includes}
                  </Text>
                </View>
              </View>

              <Text style={styles.monthlyHint}>
                💡 月榜根据整月累计打卡量计算，每月重置
              </Text>
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
  // 标题
  header: {
    paddingHorizontal: theme.spacing.screen,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.lg,
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
    fontSize: 14,
    color: theme.colors.text.tertiary,
  },
  // Tab
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: 4,
    marginHorizontal: theme.spacing.screen,
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
  // 话题分类
  topicList: {
    paddingHorizontal: theme.spacing.screen,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  topicItem: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    width: 80,
  },
  topicIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  topicEmoji: {
    fontSize: 28,
  },
  topicName: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  topicCount: {
    fontFamily: theme.fonts.en.body,
    fontSize: 10,
    color: theme.colors.text.tertiary,
  },
  // 论坛子Tab
  forumTabContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.screen,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  forumTab: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.secondary,
  },
  forumTabActive: {
    backgroundColor: theme.colors.primary.mystery,
  },
  forumTabText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 13,
    color: theme.colors.text.tertiary,
  },
  forumTabTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  // 帖子列表
  postList: {
    paddingHorizontal: theme.spacing.screen,
    gap: theme.spacing.md,
  },
  postCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  },
  postInfo: {
    flex: 1,
  },
  postUsername: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  postMeta: {
    fontFamily: theme.fonts.en.body,
    fontSize: 11,
    color: theme.colors.text.tertiary,
  },
  essenceBadge: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  essenceText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  postTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  postContent: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    marginBottom: theme.spacing.sm,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  postTags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: theme.spacing.sm,
  },
  postTag: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.primary.mystery,
  },
  postFooter: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  // 发帖按钮
  postButton: {
    marginHorizontal: theme.spacing.screen,
    marginTop: theme.spacing.lg,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    ...theme.shadows.mystery,
  },
  postButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  // 榜单区
  rankingSection: {
    paddingBottom: theme.spacing.xxl,
  },
  top3Section: {
    paddingHorizontal: theme.spacing.screen,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.md,
  },
  top3List: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  top3Card: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  top3Badge: {
    fontSize: 28,
    marginBottom: 4,
  },
  top3Name: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  top3Stats: {
    fontFamily: theme.fonts.en.body,
    fontSize: 10,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
  top3Reward: {
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: '#4CAF50',
  },
  top3RewardText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
    textAlign: 'center',
  },
  top3Cities: {
    fontFamily: theme.fonts.en.body,
    fontSize: 10,
    color: theme.colors.text.tertiary,
    marginTop: 4,
    textAlign: 'center',
  },
  // 榜单分类
  categoryList: {
    paddingHorizontal: theme.spacing.screen,
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryName: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  // 榜单列表
  rankingList: {
    paddingHorizontal: theme.spacing.screen,
    gap: theme.spacing.sm,
  },
  rankingCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  rankingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankingMedal: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  rankingNumber: {
    fontFamily: theme.fonts.en.headline,
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text.tertiary,
    marginRight: theme.spacing.sm,
    width: 24,
    textAlign: 'center',
  },
  rankingImage: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.md,
  },
  rankingContent: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  rankingName: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  rankingTags: {
    fontFamily: theme.fonts.en.body,
    fontSize: 11,
    color: theme.colors.text.tertiary,
    marginTop: 2,
  },
  rankingStats: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: 4,
  },
  rankingRating: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.warning,
  },
  rankingCheckins: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  rankingScore: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary.mystery + '20',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.md,
  },
  scoreText: {
    fontFamily: theme.fonts.en.headline,
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.primary.mystery,
  },
  scoreLabel: {
    fontFamily: theme.fonts.en.body,
    fontSize: 10,
    color: theme.colors.primary.mystery,
  },
  // 打卡按钮
  checkinButton: {
    marginHorizontal: theme.spacing.screen,
    marginTop: theme.spacing.xl,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    ...theme.shadows.mystery,
  },
  checkinButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkinButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  // 月榜冠军
  monthlySection: {
    marginTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.screen,
  },
  monthlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  monthlyIcon: {
    fontSize: 40,
    marginRight: theme.spacing.sm,
  },
  monthlyTitleSection: {
    flex: 1,
  },
  monthlyTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 20,
    fontWeight: '800',
    color: '#FFD700',
  },
  monthlySubtitle: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  monthlyCard: {
    backgroundColor: '#FFD700' + '15',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 2,
    borderColor: '#FFD700',
    flexDirection: 'row',
  },
  monthlyRank: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  monthlyRankText: {
    fontSize: 32,
  },
  monthlyInfo: {
    flex: 1,
  },
  monthlyName: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  monthlyStats: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.sm,
  },
  monthlyReward: {
    backgroundColor: '#FFD700',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  monthlyRewardText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  monthlyCities: {
    fontFamily: theme.fonts.en.body,
    fontSize: 11,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  monthlyIncludes: {
    fontFamily: theme.fonts.en.body,
    fontSize: 11,
    color: theme.colors.text.tertiary,
  },
  monthlyHint: {
    fontFamily: theme.fonts.en.body,
    fontSize: 11,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  // 底部安全区
  bottomSafe: {
    height: 40,
  },
});

export default ForumScreen;
