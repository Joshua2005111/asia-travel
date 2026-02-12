/**
 * 🇨🇳🇰🇷 看得懂吗 - 中韩文化交流页面
 * 
 * 功能：
 * - 中韩年轻人匹配
 * - 语言伙伴配对
 * - 实时翻译聊天
 * - 文化交流社区
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../utils/theme';
import { crossBorderService, CultureContent, TrendingTopic } from '../services/CrossBorderService';

// 模拟数据
const RECOMMENDED_USERS = [
  {
    id: '1',
    username: '首尔欧巴',
    country: 'KR',
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: '学习中文3年，喜欢旅游和美食 🇰🇷',
    tags: ['中文学习', '旅游', '美食'],
    isFollowing: false,
  },
  {
    id: '2',
    username: '北京小姐姐',
    country: 'CN',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: '韩语学习中，喜欢K-pop和韩剧 🇨🇳',
    tags: ['韩语学习', 'K-pop', '韩剧'],
    isFollowing: true,
  },
  {
    id: '3',
    username: '釜山欧尼',
    country: 'KR',
    avatar: 'https://i.pravatar.cc/150?img=9',
    bio: '想来中国留学，喜欢中国文化 🇰🇷',
    tags: ['留学', '中国文化', '学习'],
    isFollowing: false,
  },
];

const CULTURE_FEED = [
  {
    id: '1',
    type: 'food',
    title: '韩国美食介绍',
    description: '泡菜、石锅拌饭、参鸡汤...你最想吃哪个？',
    image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400',
    author: '首尔小哥',
    authorCountry: 'KR',
    likes: 234,
  },
  {
    id: '2',
    type: 'trend',
    title: '中国Z世代流行语',
    description: 'yyds、绝绝子、破防了...你懂几个？',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    author: '北京妞妞',
    authorCountry: 'CN',
    likes: 567,
  },
  {
    id: '3',
    type: 'food',
    title: '中国火锅文化',
    description: '麻辣火锅、清汤锅、潮汕牛肉...',
    image: 'https://images.unsplash.com/photo-1572856173107-0a4608e8c4e8?w=400',
    author: '成都小伙伴',
    authorCountry: 'CN',
    likes: 890,
  },
];

const TRENDING_TOPICS = [
  { id: '1', title: 'K-pop vs C-pop', icon: '🎵', posts: 1234 },
  { id: '2', title: '韩剧 vs 国产剧', icon: '📺', posts: 2345 },
  { id: '3', title: '中韩美食大PK', icon: '🍜', posts: 3456 },
  { id: '4', title: '留学体验', icon: '✈️', posts: 1567 },
];

// 推荐用户卡片
function UserCard({ item, onFollow }: { item: typeof RECOMMENDED_USERS[0]; onFollow: () => void }) {
  return (
    <View style={styles.userCard}>
      <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
      <View style={styles.userInfo}>
        <View style={styles.userHeader}>
          <Text style={styles.username}>{item.username}</Text>
          <Text style={styles.countryFlag}>{item.country === 'KR' ? '🇰🇷' : '🇨🇳'}</Text>
        </View>
        <Text style={styles.bio} numberOfLines={2}>{item.bio}</Text>
        <View style={styles.tags}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.followButton} onPress={onFollow}>
        <Text style={styles.followButtonText}>
          {item.isFollowing ? '已关注' : '+ 关注'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// 文化内容卡片
function CultureCard({ item }: { item: typeof CULTURE_FEED[0] }) {
  return (
    <View style={styles.cultureCard}>
      <Image source={{ uri: item.image }} style={styles.cultureImage} />
      <View style={styles.cultureOverlay}>
        <View style={styles.cultureBadge}>
          <Text style={styles.cultureBadgeText}>
            {item.type === 'food' ? '🍜 美食' : '🔥 流行'}
          </Text>
        </View>
        <Text style={styles.cultureTitle}>{item.title}</Text>
        <Text style={styles.cultureDesc} numberOfLines={2}>{item.description}</Text>
        <View style={styles.cultureFooter}>
          <Text style={styles.cultureAuthor}>
            {item.author} {item.authorCountry === 'KR' ? '🇰🇷' : '🇨🇳'}
          </Text>
          <Text style={styles.cultureLikes}>❤️ {item.likes}</Text>
        </View>
      </View>
    </View>
  );
}

// 话题卡片
function TopicCard({ item }: { item: typeof TRENDING_TOPICS[0] }) {
  return (
    <TouchableOpacity style={styles.topicCard}>
      <Text style={styles.topicIcon}>{item.icon}</Text>
      <Text style={styles.topicTitle}>{item.title}</Text>
      <Text style={styles.topicPosts}>{item.posts} 讨论</Text>
    </TouchableOpacity>
  );
}

function CrossBorderScreen({ navigation }: { navigation: any }) {
  const [activeTab, setActiveTab] = useState<'discover' | 'match' | 'culture'>('discover');

  // 开始匹配
  const handleStartMatching = async () => {
    // 调用匹配服务
    const result = await crossBorderService.matchUser('current_user', {
      preferChina: true,
      preferKorea: true,
    });
    if (result.success) {
      // 跳转到聊天页面
      navigation.navigate('Chat');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 标题区域 */}
        <View style={styles.header}>
          <Text style={styles.title}>🌏 中韩交友</Text>
          <Text style={styles.subtitle}>结交韩国朋友，学习语言文化</Text>
        </View>

        {/* Tab切换 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'discover' && styles.tabActive]}
            onPress={() => setActiveTab('discover')}
          >
            <Text style={[styles.tabText, activeTab === 'discover' && styles.tabTextActive]}>
              🔍 发现朋友
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'match' && styles.tabActive]}
            onPress={() => setActiveTab('match')}
          >
            <Text style={[styles.tabText, activeTab === 'match' && styles.tabTextActive]}>
              💕 立即匹配
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'culture' && styles.tabActive]}
            onPress={() => setActiveTab('culture')}
          >
            <Text style={[styles.tabText, activeTab === 'culture' && styles.tabTextActive]}>
              📚 文化交流
            </Text>
          </TouchableOpacity>
        </View>

        {/* 发现朋友 */}
        {activeTab === 'discover' && (
          <View style={styles.section}>
            {/* 推荐用户 */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>👥 推荐朋友</Text>
              <Text style={styles.sectionMore}>查看更多 →</Text>
            </View>

            {RECOMMENDED_USERS.map((user) => (
              <UserCard
                key={user.id}
                item={user}
                onFollow={() => {}}
              />
            ))}

            {/* 热门话题 */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🔥 热门话题</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topicList}
            >
              {TRENDING_TOPICS.map((topic) => (
                <TopicCard key={topic.id} item={topic} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* 立即匹配 */}
        {activeTab === 'match' && (
          <View style={styles.matchSection}>
            <View style={styles.matchCard}>
              <Text style={styles.matchEmoji}>🌏</Text>
              <Text style={styles.matchTitle}>中韩年轻人交友</Text>
              <Text style={styles.matchDesc}>
                匹配来自中国和韩国{'\n'}
                的年轻朋友
              </Text>

              {/* 功能特点 */}
              <View style={styles.features}>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🔄</Text>
                  <Text style={styles.featureText}>实时翻译</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🎓</Text>
                  <Text style={styles.featureText}>语言学习</Text>
                </View>
                <View style={styles.feature}>
                  <Text style={styles.featureIcon}>🎮</Text>
                  <Text style={styles.featureText}>共同兴趣</Text>
                </View>
              </View>

              {/* 匹配按钮 */}
              <TouchableOpacity
                style={styles.matchButton}
                onPress={handleStartMatching}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={theme.colors.gradients.mystery}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.matchButtonGradient}
                >
                  <Text style={styles.matchButtonText}>开始匹配 →</Text>
                </LinearGradient>
              </TouchableOpacity>

              <Text style={styles.matchHint}>
                💡 支持中、英、韩三语实时翻译
              </Text>
            </View>

            {/* 语言伙伴 */}
            <View style={styles.partnerSection}>
              <Text style={styles.partnerTitle}>🎓 语言伙伴</Text>
              <Text style={styles.partnerDesc}>
                找到母语为韩语的朋友，互相学习语言
              </Text>

              <View style={styles.partnerCard}>
                <Text style={styles.partnerEmoji}>🇰🇷 ⇄ 🇨🇳</Text>
                <Text style={styles.partnerText}>
                  中文 ↔ 韩语{'\n'}
                  互相学习，共同进步
                </Text>
              </View>

              <TouchableOpacity style={styles.partnerButton}>
                <Text style={styles.partnerButtonText}>寻找语言伙伴</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* 文化交流 */}
        {activeTab === 'culture' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>📖 热门内容</Text>
            </View>

            {CULTURE_FEED.map((item) => (
              <CultureCard key={item.id} item={item} />
            ))}

            {/* 发布按钮 */}
            <TouchableOpacity style={styles.postButton}>
              <LinearGradient
                colors={theme.colors.gradients.mystery}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.postButtonGradient}
              >
                <Text style={styles.postButtonText}>+ 发布内容</Text>
              </LinearGradient>
            </TouchableOpacity>
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
    fontSize: 16,
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
  // Section
  section: {
    paddingHorizontal: theme.spacing.screen,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  sectionMore: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.primary.mystery,
  },
  // 用户卡片
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  countryFlag: {
    fontSize: 16,
    marginLeft: 6,
  },
  bio: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    marginBottom: 6,
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    backgroundColor: theme.colors.primary.mystery + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  tagText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 10,
    color: theme.colors.primary.mystery,
  },
  followButton: {
    backgroundColor: theme.colors.primary.mystery,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.md,
  },
  followButtonText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  // 话题列表
  topicList: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  topicCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    width: 120,
  },
  topicIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  topicTitle: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  topicPosts: {
    fontFamily: theme.fonts.en.body,
    fontSize: 11,
    color: theme.colors.text.tertiary,
    marginTop: 4,
  },
  // 匹配页面
  matchSection: {
    paddingHorizontal: theme.spacing.screen,
  },
  matchCard: {
    backgroundColor: theme.colors.primary.mystery + '15',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  matchEmoji: {
    fontSize: 60,
    marginBottom: theme.spacing.md,
  },
  matchTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  matchDesc: {
    fontFamily: theme.fonts.en.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  features: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  featureText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  matchButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    ...theme.shadows.mystery,
  },
  matchButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  matchHint: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  // 语言伙伴
  partnerSection: {
    marginBottom: theme.spacing.xxl,
  },
  partnerTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  partnerDesc: {
    fontFamily: theme.fonts.en.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.md,
  },
  partnerCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  partnerEmoji: {
    fontSize: 40,
    marginRight: theme.spacing.md,
  },
  partnerText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 15,
    color: theme.colors.text.primary,
    lineHeight: 24,
  },
  partnerButton: {
    backgroundColor: theme.colors.primary.mystery,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  partnerButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  // 文化卡片
  cultureCard: {
    height: 200,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  cultureImage: {
    width: '100%',
    height: '100%',
  },
  cultureOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: theme.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cultureBadge: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  cultureBadgeText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary.mystery,
  },
  cultureTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
  },
  cultureDesc: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 6,
  },
  cultureFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cultureAuthor: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  cultureLikes: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  // 发布按钮
  postButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: theme.spacing.md,
    ...theme.shadows.mystery,
  },
  postButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  // 底部安全区
  bottomSafe: {
    height: 40,
  },
});

export default CrossBorderScreen;
