import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function BeRealScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📸 BeReal 打卡</Text>
        <Text style={styles.subtitle}>晒出你的中国瞬间</Text>
      </View>

      <View style={styles.cameraPlaceholder}>
        <Text style={styles.cameraEmoji}>📷</Text>
        <Text style={styles.cameraText}>拍照打卡</Text>
        <Text style={styles.cameraSubtitle}>记录你在中国的每一个精彩瞬间</Text>
      </View>

      <View style={styles.rankingCard}>
        <Text style={styles.rankingTitle}>🏆 我的排名</Text>
        <Text style={styles.rankingSubtitle}>本周排名第 23 位</Text>
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
    backgroundColor: '#FF6B6B',
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
  cameraPlaceholder: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 60,
    alignItems: 'center',
    margin: 20,
  },
  cameraEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  cameraText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  cameraSubtitle: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 8,
  },
  rankingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
  },
  rankingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
  },
  rankingSubtitle: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 4,
  },
});
