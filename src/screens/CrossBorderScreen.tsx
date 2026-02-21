import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CrossBorderScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌏 中韩交友</Text>
        <Text style={styles.subtitle}>结交韩国朋友，学习语言文化</Text>
      </View>

      <View style={styles.matchButton}>
        <Text style={styles.matchEmoji}>💕</Text>
        <Text style={styles.matchText}>立即匹配</Text>
      </View>

      <Text style={styles.sectionTitle}>🔥 热门话题</Text>
      
      <View style={styles.topicCard}>
        <Text style={styles.topicEmoji}>🇨🇳🇰🇷</Text>
        <Text style={styles.topicTitle}>中韩文化差异</Text>
        <Text style={styles.topicPosts}>120 篇帖子</Text>
      </View>
    </View>
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
    backgroundColor: '#9B59B6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  matchButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    margin: 20,
    borderWidth: 2,
    borderColor: '#9B59B6',
    borderStyle: 'dashed',
  },
  matchEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  matchText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  topicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  topicEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
  },
  topicPosts: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
  },
});
