import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function OnboardingScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎲</Text>
        <Text style={styles.title}>欢迎使用 ChinaMate</Text>
        <Text style={styles.subtitle}>发现中国的隐藏宝藏</Text>
      </View>

      <View style={styles.features}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🎁</Text>
          <Text style={styles.featureText}>盲盒推荐</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>💬</Text>
          <Text style={styles.featureText}>匿名聊天</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🤖</Text>
          <Text style={styles.featureText}>AI 翻译</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.replace('Language')}
      >
        <Text style={styles.buttonText}>开始探索 →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
  },
  features: {
    flexDirection: 'row',
    marginBottom: 60,
  },
  feature: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  featureIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
  },
});
