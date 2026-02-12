/**
 * FOREIGNER_APP 引导页面 (Onboarding)
 * 
 * 首次打开App时展示的引导页
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../utils/theme';

const { width, height } = Dimensions.get('window');

// 引导页数据
const ONBOARDING_DATA = [
  {
    id: '1',
    emoji: '🎲',
    title: '发现惊喜',
    subtitle: '打开盲盒，发现中国本地人私藏的宝藏地点',
    description: '每一次打开都有新发现',
  },
  {
    id: '2',
    emoji: '💬',
    title: '无压社交',
    subtitle: '匿名聊天，30分钟后自动消散',
    description: '认识其他旅行者，但没有任何压力',
  },
  {
    id: '3',
    emoji: '🤖',
    title: 'AI翻译官',
    subtitle: '打破语言壁垒，随心所欲沟通',
    description: '文本、语音、拍照翻译样样精通',
  },
  {
    id: '4',
    emoji: '📸',
    title: '打卡分享',
    subtitle: '晒出你的中国瞬间',
    description: '参与全球排行榜，结识更多朋友',
  },
];

// 分页指示器组件
const Pagination = ({
  data,
  scrollX,
}: {
  data: typeof ONBOARDING_DATA;
  scrollX: Animated.Value;
}) => {
  return (
    <View style={styles.pagination}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[styles.paginationDot, { width: dotWidth, opacity }]}
          />
        );
      })}
    </View>
  );
};

// 引导页组件
const OnboardingItem = ({
  item,
  index,
}: {
  item: typeof ONBOARDING_DATA[0];
  index: number;
}) => {
  return (
    <View style={styles.page}>
      {/* 顶部装饰 */}
      <View style={styles.topDecorations}>
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.decorationCircle,
              {
                left: `${Math.random() * 60 + 10}%`,
                top: `${Math.random() * 30 + 5}%`,
                width: 40 + Math.random() * 60,
                height: 40 + Math.random() * 60,
              },
            ]}
          />
        ))}
      </View>

      {/* 主要内容 */}
      <View style={styles.content}>
        {/* Emoji大图标 */}
        <Animated.View
          style={[
            styles.emojiContainer,
            {
              transform: [
                {
                  scale: scrollX.interpolate({
                    inputRange: [
                      (index - 1) * width,
                      index * width,
                      (index + 1) * width,
                    ],
                    outputRange: [0.8, 1, 0.8],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.emoji}>{item.emoji}</Text>
        </Animated.View>

        {/* 标题 */}
        <Text style={styles.title}>{item.title}</Text>
        
        {/* 副标题 */}
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        
        {/* 描述 */}
        <Text style={styles.description}>{item.description}</Text>
      </View>

      {/* 底部装饰 */}
      <View style={styles.bottomDecoration}>
        <View style={styles.bottomCircle1} />
        <View style={styles.bottomCircle2} />
      </View>
    </View>
  );
};

function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  // 滑动监听
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } }],
    { useNativeDriver: false }
  );

  // 切换页面
  const scrollTo = (index: number) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  // 下一页
  const goToNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      scrollTo(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  // 完成引导
  const handleComplete = () => {
    // 保存完成状态
    AsyncStorage.setItem('onboardingCompleted', 'true');
    onComplete();
  };

  // 跳过
  const handleSkip = () => {
    handleComplete();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* 跳过按钮 */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>跳过</Text>
      </TouchableOpacity>

      {/* 引导页列表 */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={({ item, index }) => (
          <OnboardingItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={true}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />

      {/* 分页指示器 */}
      <Pagination data={ONBOARDING_DATA} scrollX={scrollX} />

      {/* 底部按钮 */}
      <View style={styles.bottomContainer}>
        {/* 底部文字 */}
        <Text style={styles.stepText}>
          {currentIndex + 1} / {ONBOARDING_DATA.length}
        </Text>

        {/* 继续按钮 */}
        <TouchableOpacity style={styles.nextButton} onPress={goToNext}>
          <LinearGradient
            colors={theme.colors.gradients.mystery}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {currentIndex === ONBOARDING_DATA.length - 1 ? '开始探索 →' : '继续'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* 底部安全区 */}
      <View style={styles.bottomSafeArea} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  // 跳过按钮
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 100,
    padding: 10,
  },
  skipButtonText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
  },
  // 分页指示器
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary.mystery,
    marginHorizontal: 4,
  },
  // 引导页
  page: {
    width,
    flex: 1,
    position: 'relative',
  },
  // 顶部装饰
  topDecorations: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  decorationCircle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: theme.colors.primary.mystery + '20',
  },
  // 主要内容
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl * 2,
  },
  emojiContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.primary.mystery + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  emoji: {
    fontSize: 100,
  },
  title: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 36,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 18,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  description: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
  // 底部装饰
  bottomDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  bottomCircle1: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.primary.pink + '15',
  },
  bottomCircle2: {
    position: 'absolute',
    bottom: 0,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: theme.colors.primary.blue + '15',
  },
  // 底部按钮
  bottomContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screen,
    paddingBottom: theme.spacing.md,
  },
  stepText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.md,
  },
  nextButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    ...theme.shadows.mystery,
  },
  nextButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  // 底部安全区
  bottomSafeArea: {
    height: 40,
  },
});

// 导出
export default OnboardingScreen;
