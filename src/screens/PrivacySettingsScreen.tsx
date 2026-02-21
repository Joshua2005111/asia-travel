import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function PrivacySettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔒 隐私设置</Text>
      
      {[
        { title: '位置信息', desc: '允许应用访问位置' },
        { title: '通知', desc: '接收推送通知' },
        { title: '数据使用', desc: '匿名使用数据' },
        { title: '删除账户', desc: '永久删除账户数据' },
      ].map((item, index) => (
        <TouchableOpacity key={index} style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>{item.title}</Text>
            <Text style={styles.settingDesc}>{item.desc}</Text>
          </View>
          <Text style={styles.toggle}>◉</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingTitle: {
    fontSize: 16,
    color: '#2D3436',
  },
  settingDesc: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 2,
  },
  toggle: {
    fontSize: 24,
    color: '#4ECDC4',
  },
});
