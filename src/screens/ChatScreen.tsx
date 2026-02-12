/**
 * 💬 看得懂吗 - 匿名聊天页面
 * 
 * 功能：
 * - 30分钟自动解散的匿名社交
 * - 随机匹配世界各地的旅行者
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../utils/theme';
import { analytics } from '../services/AnalyticsService';

const { width, height } = Dimensions.get('window');

// 消息类型
interface Message {
  id: string;
  content: string;
  isSelf: boolean;
  timestamp: Date;
}

// 匹配用户类型
interface MatchUser {
  id: string;
  username: string;
  country: string;
  avatar?: string;
}

function ChatScreen({ navigation }: { navigation: any }) {
  const [isMatching, setIsMatching] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [matchUser, setMatchUser] = useState<MatchUser | null>(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30分钟倒计时

  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // 脉冲动画
  useEffect(() => {
    if (isMatching) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isMatching]);

  // 倒计时
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isChatting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleEndChat();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isChatting, timeLeft]);

  // 开始匹配
  const handleStartMatching = async () => {
    setIsMatching(true);

    // 模拟匹配过程
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 模拟匹配成功
    const mockUser: MatchUser = {
      id: 'user_' + Date.now(),
      username: 'TravelLover',
      country: 'Japan',
    };
    setMatchUser(mockUser);
    setIsMatching(false);
    setIsChatting(true);
    await analytics.presets.chatStarted('Japan');
  };

  // 结束聊天
  const handleEndChat = () => {
    setIsChatting(false);
    setMatchUser(null);
    setMessages([]);
    setTimeLeft(30 * 60);
  };

  // 发送消息
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      isSelf: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // 滚动到底部
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // 模拟回复
    setTimeout(() => {
      const replies = [
        'That sounds amazing! 🎉',
        'I really want to go there too!',
        'Thanks for the recommendation!',
        'China is so fascinating!',
        'Where else do you recommend?',
      ];
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        content: replies[Math.floor(Math.random() * replies.length)],
        isSelf: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <View style={styles.header}>
        <Text style={styles.title}>💬 盲盒聊天</Text>
        <Text style={styles.subtitle}>匿名匹配，随机聊天</Text>
      </View>

      {!isMatching && !isChatting && (
        /* 未匹配状态 */
        <View style={styles.matchingState}>
          <View style={styles.matchingContent}>
            <Text style={styles.matchingEmoji}>🌍</Text>
            <Text style={styles.matchingTitle}>遇见世界各地的旅行者</Text>
            <Text style={styles.matchingDesc}>
              30分钟后自动解散{'\n'}
              无压力，自由聊天
            </Text>
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartMatching}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={theme.colors.gradients.chat}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startButtonGradient}
            >
              <Text style={styles.startButtonText}>开始匹配 →</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.tips}>💡 点击上方按钮开始寻找旅伴</Text>
        </View>
      )}

      {isMatching && (
        /* 匹配中状态 */
        <View style={styles.matchingState}>
          <Animated.View
            style={[
              styles.matchingAnimation,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <View style={styles.matchingCircle}>
              <Text style={styles.matchingCircleText}>🔍</Text>
            </View>
          </Animated.View>

          <Text style={styles.matchingTitle}>正在寻找旅伴...</Text>
          <Text style={styles.matchingDesc}>匹配中</Text>

          <View style={styles.matchingDots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotActive]} />
          </View>
        </View>
      )}

      {isChatting && matchUser && (
        /* 聊天中状态 */
        <View style={styles.chattingState}>
          {/* 顶部信息 */}
          <View style={styles.chatHeader}>
            <View style={styles.partnerInfo}>
              <View style={styles.partnerAvatar}>
                <Text style={styles.partnerAvatarText}>
                  {matchUser.username[0]}
                </Text>
              </View>
              <View>
                <Text style={styles.partnerName}>{matchUser.username}</Text>
                <Text style={styles.partnerCountry}>
                  {matchUser.country} 🇯🇵
                </Text>
              </View>
            </View>

            <View style={styles.timer}>
              <Text style={styles.timerText}>⏱️ {formatTime(timeLeft)}</Text>
            </View>
          </View>

          {/* 聊天记录 */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messageList}
            contentContainerStyle={styles.messageListContent}
            showsVerticalScrollIndicator={false}
          >
            {/* 系统提示 */}
            <View style={styles.systemTip}>
              <Text style={styles.systemTipText}>
                🎉 匹配成功！30分钟后自动解散
              </Text>
            </View>

            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.isSelf ? styles.messageSelf : styles.messagePartner,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.isSelf ? styles.messageTextSelf : styles.messageTextPartner,
                  ]}
                >
                  {msg.content}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* 输入框 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="输入消息..."
              placeholderTextColor={theme.colors.text.tertiary}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendMessage}
              multiline
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={theme.colors.gradients.chat}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sendButtonGradient}
              >
                <Text style={styles.sendButtonText}>发送</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
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
  // 匹配状态
  matchingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screen,
  },
  matchingContent: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl * 2,
  },
  matchingEmoji: {
    fontSize: 100,
    marginBottom: theme.spacing.lg,
  },
  matchingTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  matchingDesc: {
    fontFamily: theme.fonts.en.body,
    fontSize: 16,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 24,
  },
  matchingAnimation: {
    marginBottom: theme.spacing.xxl,
  },
  matchingCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary.chat + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchingCircleText: {
    fontSize: 50,
  },
  matchingDots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: theme.spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.text.tertiary,
  },
  dotActive: {
    backgroundColor: theme.colors.primary.chat,
  },
  startButton: {
    width: '80%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    ...theme.shadows.chat,
  },
  startButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  tips: {
    fontFamily: theme.fonts.en.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.lg,
  },
  // 聊天状态
  chattingState: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screen,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
  },
  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary.chat,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  partnerAvatarText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  partnerName: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  partnerCountry: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  timer: {
    backgroundColor: theme.colors.primary.chat + '20',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.md,
  },
  timerText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary.chat,
  },
  // 消息列表
  messageList: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen,
  },
  messageListContent: {
    paddingVertical: theme.spacing.md,
  },
  systemTip: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  systemTipText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.sm,
  },
  messageSelf: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary.chat,
  },
  messagePartner: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.background.secondary,
  },
  messageText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 16,
  },
  messageTextSelf: {
    color: '#FFF',
  },
  messageTextPartner: {
    color: theme.colors.text.primary,
  },
  // 输入框
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.screen,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    fontFamily: theme.fonts.cn.body,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 80,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
});

export default ChatScreen;
