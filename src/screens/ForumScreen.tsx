import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ForumScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💬 论坛</Text>
      </View>

      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <Text style={styles.postAvatar}>👤</Text>
          <View>
            <Text style={styles.postAuthor}>用户123</Text>
            <Text style={styles.postTime}>2小时前</Text>
          </View>
        </View>
        <Text style={styles.postContent}>
          分享一个在北京超棒的咖啡馆！环境很好，适合工作📚
        </Text>
        <View style={styles.postActions}>
          <Text style={styles.action}>❤️ 赞</Text>
          <Text style={styles.action}>💬 评论</Text>
          <Text style={styles.action}>🔗 分享</Text>
        </View>
      </View>
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
    backgroundColor: '#4ECDC4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
  },
  postTime: {
    fontSize: 12,
    color: '#636E72',
  },
  postContent: {
    fontSize: 16,
    color: '#2D3436',
    lineHeight: 22,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
  },
  action: {
    marginRight: 20,
    fontSize: 14,
    color: '#636E72',
  },
});
