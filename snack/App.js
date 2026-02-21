/**
 * 🎲 ChinaMate / 볼懂? / 看得懂吗 - Expo Snack 预览版
 * 
 * Expo Snack 地址: https://snack.expo.dev/
 */

import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from 'react-native';

// 模拟数据
const MOCK_SPOTS = [
  { id: 1, name: '老城区咖啡馆', category: '咖啡馆', rating: 4.8, image: '☕' },
  { id: 2, name: '隐藏胡同', category: '景点', rating: 4.9, image: '�胡同' },
  { id: 3, name: '本地人推荐餐厅', category: '餐厅', rating: 4.7, image: '🍜' },
  { id: 4, name: '艺术区', category: '艺术', rating: 4.6, image: '🎨' },
];

const MOCK_MESSAGES = [
  { id: 1, text: '你好！最近有什么好玩的地方吗？', sender: 'other' },
  { id: 2, text: '推荐你去老城区，那里有很棒的咖啡馆！', sender: 'me' },
];

// 主题颜色
const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  background: '#F7F7F7',
  card: '#FFFFFF',
  text: '#2D3436',
  textSecondary: '#636E72',
  border: '#E0E0E0',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // home, mystery, chat, translation
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [translationText, setTranslationText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  // 发送消息
  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: Date.now(), text: inputText, sender: 'me' }]);
      setInputText('');
    }
  };

  // 模拟翻译
  const doTranslate = () => {
    if (translationText.trim()) {
      setTranslatedText(`[翻译结果] ${translationText} - 已转换为中文`);
    }
  };

  // Tab Bar
  const TabBar = () => (
    <View style={styles.tabBar}>
      {[
        { id: 'home', icon: '🏠', label: '首页' },
        { id: 'mystery', icon: '🎲', label: '盲盒' },
        { id: 'chat', icon: '💬', label: '聊天' },
        { id: 'translation', icon: '🤖', label: '翻译' },
      ].map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tabItem}
          onPress={() => setCurrentScreen(tab.id)}
        >
          <Text style={[styles.tabIcon, currentScreen === tab.id && styles.tabIconActive]}>
            {tab.icon}
          </Text>
          <Text style={[styles.tabLabel, currentScreen === tab.id && styles.tabLabelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Home Screen
  const HomeScreen = () => (
    <ScrollView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎲 ChinaMate</Text>
        <Text style={styles.headerSubtitle}>发现中国的隐藏宝藏</Text>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>🇨🇳 欢迎来到中国</Text>
        <Text style={styles.bannerSubtitle}>开启你的奇妙旅程</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>快速开始</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={() => setCurrentScreen('mystery')}>
            <Text style={styles.quickActionIcon}>🎁</Text>
            <Text style={styles.quickActionText}>盲盒推荐</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => setCurrentScreen('translation')}>
            <Text style={styles.quickActionIcon}>🤖</Text>
            <Text style={styles.quickActionText}>AI 翻译</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => setCurrentScreen('chat')}>
            <Text style={styles.quickActionIcon}>💬</Text>
            <Text style={styles.quickActionText}>交友聊天</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popular Spots */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 热门推荐</Text>
        {MOCK_SPOTS.map((spot) => (
          <TouchableOpacity key={spot.id} style={styles.spotCard}>
            <Text style={styles.spotImage}>{spot.image}</Text>
            <View style={styles.spotInfo}>
              <Text style={styles.spotName}>{spot.name}</Text>
              <Text style={styles.spotCategory}>{spot.category}</Text>
            </View>
            <View style={styles.spotRating}>
              <Text>⭐ {spot.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <SafeAreaView />
    </ScrollView>
  );

  // Mystery Box Screen
  const MysteryScreen = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎲 盲盒推荐</Text>
        <Text style={styles.headerSubtitle}>发现本地人私藏的宝藏地点</Text>
      </View>

      <View style={styles.mysteryBox}>
        <Text style={styles.mysteryEmoji}>🎁</Text>
        <Text style={styles.mysteryTitle}>开启你的盲盒</Text>
        <Text style={styles.mysteryDesc}>随机发现一个隐藏的好地方</Text>
        <TouchableOpacity style={styles.mysteryButton}>
          <Text style={styles.mysteryButtonText}>🎰 立即抽取</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>今日推荐</Text>
        {MOCK_SPOTS.slice(0, 2).map((spot) => (
          <TouchableOpacity key={spot.id} style={styles.spotCard}>
            <Text style={styles.spotImage}>{spot.image}</Text>
            <View style={styles.spotInfo}>
              <Text style={styles.spotName}>{spot.name}</Text>
              <Text style={styles.spotCategory}>{spot.category}</Text>
            </View>
            <View style={styles.spotRating}>
              <Text>⭐ {spot.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <SafeAreaView />
    </ScrollView>
  );

  // Chat Screen
  const ChatScreen = () => (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💬 盲盒聊天</Text>
        <Text style={styles.headerSubtitle}>30分钟后自动解散</Text>
      </View>

      <View style={styles.chatContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'me' ? styles.messageMe : styles.messageOther
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="输入消息..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Translation Screen
  const TranslationScreen = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤖 AI 翻译官</Text>
        <Text style={styles.headerSubtitle}>打破语言壁垒</Text>
      </View>

      <View style={styles.translationBox}>
        <Text style={styles.translationLabel}>输入要翻译的文字</Text>
        <TextInput
          style={styles.translationInput}
          placeholder="在这里输入文字..."
          value={translationText}
          onChangeText={setTranslationText}
          multiline
        />
        
        <View style={styles.languageSelector}>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageButtonText}>🇺🇸 English</Text>
          </TouchableOpacity>
          <Text style={styles.arrow}>→</Text>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageButtonText}>🇨🇳 中文</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.translateButton} onPress={doTranslate}>
          <Text style={styles.translateButtonText}>🌐 翻译</Text>
        </TouchableOpacity>
      </View>

      {translatedText ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>翻译结果</Text>
          <Text style={styles.resultText}>{translatedText}</Text>
        </View>
      ) : null}

      <SafeAreaView />
    </ScrollView>
  );

  // Main Render
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'mystery' && <MysteryScreen />}
      {currentScreen === 'chat' && <ChatScreen />}
      {currentScreen === 'translation' && <TranslationScreen />}
      <TabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  banner: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
  },
  spotCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  spotImage: {
    fontSize: 36,
    marginRight: 12,
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  spotCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  spotRating: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mysteryBox: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  mysteryEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  mysteryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  mysteryDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  mysteryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  mysteryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  messageMe: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageOther: {
    backgroundColor: COLORS.card,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#333',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  translationBox: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  translationLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  translationInput: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  languageButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  arrow: {
    marginHorizontal: 16,
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  translateButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  translateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
  },
  resultLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: COLORS.text,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
