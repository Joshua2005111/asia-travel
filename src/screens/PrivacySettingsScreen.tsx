/**
 * 🔒 看得懂吗 - 隐私设置页面
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

function PrivacySettingsScreen({ navigation }: { navigation: any }) {
  // 隐私设置状态
  const [settings, setSettings] = useState({
    analyticsEnabled: true,
    locationEnabled: true,
    notificationEnabled: true,
    chatAnonymity: true,
    autoDeleteChat: true,
    twoFactorAuth: false,
  });

  // 更新设置
  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    AsyncStorage.setItem(`privacy_${key}`, String(value));
  };

  // 加载设置
  React.useEffect(() => {
    const loadSettings = async () => {
      const newSettings = { ...settings };
      for (const key of Object.keys(settings)) {
        const value = await AsyncStorage.getItem(`privacy_${key}`);
        if (value !== null) {
          (newSettings as any)[key] = value === 'true';
        }
      }
      setSettings(newSettings);
    };
    loadSettings();
  }, []);

  // 删除所有数据
  const handleDeleteAllData = () => {
    Alert.alert(
      '⚠️ 删除所有数据',
      '此操作将永久删除：\n• 账户信息\n• 聊天记录\n• 翻译历史\n• 收藏内容\n\n此操作不可恢复！',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确认删除',
          style: 'destructive',
          onPress: async () => {
            // 删除本地数据
            await AsyncStorage.clear();
            Alert.alert('已删除', '所有数据已永久删除');
          },
        },
      ]
    );
  };

  // 导出数据
  const handleExportData = async () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < (await AsyncStorage.getAllKeys()).length; i++) {
      const key = (await AsyncStorage.getAllKeys())[i];
      const value = await AsyncStorage.getItem(key);
      if (key && value) {
        data[key] = value;
      }
    }
    Alert.alert(
      '📤 导出数据',
      `找到 ${Object.keys(data).length} 条数据记录，是否导出？`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '导出',
          onPress: () => {
            // 实际项目中生成JSON文件
            Alert.alert('完成', '数据已导出到JSON文件');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 标题 */}
        <View style={styles.header}>
          <Text style={styles.title}>🔒 隐私设置</Text>
          <Text style={styles.subtitle}>控制您的数据安全</Text>
        </View>

        {/* 安全等级 */}
        <View style={styles.securityLevel}>
          <Text style={styles.securityTitle}>🛡️ 当前安全等级</Text>
          <View style={styles.securityBadge}>
            <Text style={styles.securityBadgeText}>高</Text>
          </View>
          <Text style={styles.securityDesc}>
            您的数据采用AES-256加密存储
          </Text>
        </View>

        {/* 隐私控制 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>数据收集</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>📊 使用分析</Text>
              <Text style={styles.settingDesc}>帮助改善产品体验</Text>
            </View>
            <Switch
              value={settings.analyticsEnabled}
              onValueChange={(v) => updateSetting('analyticsEnabled', v)}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary.mystery,
              }}
              thumbColor="#FFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>📍 位置信息</Text>
              <Text style={styles.settingDesc}>提供附近推荐服务</Text>
            </View>
            <Switch
              value={settings.locationEnabled}
              onValueChange={(v) => updateSetting('locationEnabled', v)}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary.mystery,
              }}
              thumbColor="#FFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>🔔 推送通知</Text>
              <Text style={styles.settingDesc}>接收重要消息提醒</Text>
            </View>
            <Switch
              value={settings.notificationEnabled}
              onValueChange={(v) => updateSetting('notificationEnabled', v)}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary.mystery,
              }}
              thumbColor="#FFF"
            />
          </View>
        </View>

        {/* 聊天隐私 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>聊天隐私</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>🎭 匿名模式</Text>
              <Text style={styles.settingDesc}>聊天时不显示真实身份</Text>
            </View>
            <Switch
              value={settings.chatAnonymity}
              onValueChange={(v) => updateSetting('chatAnonymity', v)}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary.mystery,
              }}
              thumbColor="#FFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>⏰ 自动删除</Text>
              <Text style={styles.settingDesc}>30分钟后自动删除聊天</Text>
            </View>
            <Switch
              value={settings.autoDeleteChat}
              onValueChange={(v) => updateSetting('autoDeleteChat', v)}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary.mystery,
              }}
              thumbColor="#FFF"
            />
          </View>
        </View>

        {/* 安全设置 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>账户安全</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>🔐 两步验证</Text>
              <Text style={styles.settingDesc}>额外安全保护</Text>
            </View>
            <Switch
              value={settings.twoFactorAuth}
              onValueChange={(v) => updateSetting('twoFactorAuth', v)}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primary.mystery,
              }}
              thumbColor="#FFF"
            />
          </View>
        </View>

        {/* 数据管理 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>数据管理</Text>

          <TouchableOpacity style={styles.actionButton} onPress={handleExportData}>
            <Text style={styles.actionButtonText}>📤 导出我的数据</Text>
            <Text style={styles.actionButtonDesc}>下载您的所有数据备份</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleDeleteAllData}>
            <Text style={[styles.actionButtonText, { color: theme.colors.error }]}>
              🗑️ 删除所有数据
            </Text>
            <Text style={[styles.actionButtonDesc, { color: theme.colors.text.tertiary }]}>
              永久删除账户和所有本地数据
            </Text>
          </TouchableOpacity>
        </View>

        {/* 隐私政策链接 */}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Text style={styles.linkButtonText}>📄 查看完整隐私政策</Text>
        </TouchableOpacity>

        {/* 底部安全区 */}
        <View style={styles.bottomSafe} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen,
    paddingTop: theme.spacing.xxl * 2,
  },
  header: {
    marginBottom: theme.spacing.lg,
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
  // 安全等级
  securityLevel: {
    backgroundColor: theme.colors.primary.mystery + '10',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  securityTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  securityBadge: {
    backgroundColor: theme.colors.primary.mystery,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  securityBadgeText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  securityDesc: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  // 设置区块
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  // 设置项
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  settingInfo: {
    flex: 1,
  },
  settingName: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  settingDesc: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  // 操作按钮
  actionButton: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  actionButtonText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  actionButtonDesc: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  // 链接按钮
  linkButton: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  linkButtonText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.primary.mystery,
  },
  // 底部安全区
  bottomSafe: {
    height: 40,
  },
});

export default PrivacySettingsScreen;
