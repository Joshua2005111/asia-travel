import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>隐私政策</Text>
      
      <Text style={styles.text}>
        欢迎使用 ChinaMate！我们重视您的隐私保护。
        
        本应用收集的数据包括：
        - 账户信息（邮箱、用户名）
        - 使用数据（功能使用频率）
        - 位置数据（用于地图功能）
        
        我们不会出售您的个人信息。
        
        使用本应用即表示您同意我们的隐私政策。
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24,
  },
});
