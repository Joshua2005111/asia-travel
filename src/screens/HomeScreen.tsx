import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>你好，旅行者 👋</Text>
        <Text style={styles.subtitle}>今天想去哪里冒险？</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>快速开始</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => console.log('Mystery Box pressed')}
          >
            <Text style={styles.quickActionIcon}>🎁</Text>
            <Text style={styles.quickActionText}>盲盒推荐</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => console.log('Translation pressed')}
          >
            <Text style={styles.quickActionIcon}>🤖</Text>
            <Text style={styles.quickActionText}>AI 翻译</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => console.log('Chat pressed')}
          >
            <Text style={styles.quickActionIcon}>💬</Text>
            <Text style={styles.quickActionText}>交友聊天</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Today's Mystery Box */}
      <View style={styles.section}>
        <View style={styles.mysteryBanner}>
          <Text style={styles.mysteryEmoji}>🎲</Text>
          <View style={styles.mysteryText}>
            <Text style={styles.mysteryTitle}>今日盲盒</Text>
            <Text style={styles.mysterySubtitle}>3个惊喜目的地等你发现</Text>
          </View>
        </View>
      </View>

      {/* Recommended */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>为你推荐</Text>
        <View style={styles.recommendationCard}>
          <Text style={styles.cardEmoji}>☕</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>老城区咖啡馆</Text>
            <Text style={styles.cardCategory}>咖啡馆 • 4.8 ⭐</Text>
          </View>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>去这里</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recommendationCard}>
          <Text style={styles.cardEmoji}>🏯</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>隐藏胡同</Text>
            <Text style={styles.cardCategory}>景点 • 4.9 ⭐</Text>
          </View>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>去这里</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recommendationCard}>
          <Text style={styles.cardEmoji}>🍜</Text>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>本地人推荐餐厅</Text>
            <Text style={styles.cardCategory}>餐厅 • 4.7 ⭐</Text>
          </View>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.cardButtonText}>去这里</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FF6B6B',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
    fontWeight: '600',
    color: '#2D3436',
  },
  mysteryBanner: {
    backgroundColor: '#9B59B6',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mysteryEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  mysteryText: {
    flex: 1,
  },
  mysteryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mysterySubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardEmoji: {
    fontSize: 36,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
  },
  cardCategory: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 2,
  },
  cardButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cardButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 100,
  },
});
