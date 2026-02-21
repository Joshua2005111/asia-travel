import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MysteryBoxScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎲 今日盲盒</Text>
        <Text style={styles.subtitle}>3个惊喜等你发现</Text>
      </View>

      <View style={styles.boxContainer}>
        <Text style={styles.boxEmoji}>🎁</Text>
        <Text style={styles.boxTitle}>开启你的盲盒</Text>
        <Text style={styles.boxSubtitle}>随机发现一个隐藏的好地方</Text>
        
        <TouchableOpacity style={styles.openButton}>
          <Text style={styles.openButtonText}>🎰 立即抽取</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>为你推荐</Text>
      
      <View style={styles.spotCard}>
        <Text style={styles.spotEmoji}>☕</Text>
        <View style={styles.spotInfo}>
          <Text style={styles.spotName}>老城区咖啡馆</Text>
          <Text style={styles.spotMeta}>咖啡馆 • 2.5km • 4.8⭐</Text>
        </View>
        <TouchableOpacity style={styles.goButton}>
          <Text style={styles.goButtonText}>去这里</Text>
        </TouchableOpacity>
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
  boxContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    margin: 20,
    borderWidth: 2,
    borderColor: '#9B59B6',
    borderStyle: 'dashed',
  },
  boxEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 8,
  },
  boxSubtitle: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 24,
  },
  openButton: {
    backgroundColor: '#9B59B6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  spotCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  spotEmoji: {
    fontSize: 36,
    marginRight: 12,
  },
  spotInfo: {
    flex: 1,
  },
  spotName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
  },
  spotMeta: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 2,
  },
  goButton: {
    backgroundColor: '#9B59B6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  goButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
