/**
 * 🔒 看得懂吗 - 隐私政策页面
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../utils/theme';

function PrivacyPolicyScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 标题 */}
        <View style={styles.header}>
          <Text style={styles.title}>🔒 隐私政策</Text>
          <Text style={styles.subtitle}>保护您的个人信息安全</Text>
        </View>

        {/* 概要 */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            我们高度重视您的隐私安全。本应用采用端到端加密，
            您的聊天记录将在30分钟后自动删除，绝不保留任何个人数据。
          </Text>
        </View>

        {/* 政策内容 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 数据收集</Text>
          <Text style={styles.sectionContent}>
            我们仅收集必要的数据以提供服务：
            {'\n\n'}• 账户信息（邮箱、用户名）
            {'\n'}• 使用数据（功能使用频率）
            {'\n'}• 设备信息（设备类型、系统版本）
            {'\n'}• 位置信息（使用时获取）
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 数据使用</Text>
          <Text style={styles.sectionContent}>
            您的数据仅用于：
            {'\n\n'}• 提供和改善服务
            {'\n'}• 账户安全验证
            {'\n'}• 匿名统计分析
            {'\n'}• 技术问题排查
            {'\n\n'}❌ 绝不出售给第三方
            {'\n'}❌ 绝不做商业用途
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 聊天隐私</Text>
          <Text style={styles.sectionContent}>
            🎉 我们的聊天功能特点：
            {'\n\n'}• 匿名匹配，不显示真实身份
            {'\n'}• 30分钟后自动删除所有记录
            {'\n'}• 本地不留任何缓存
            {'\n'}• 端到端加密传输
            {'\n'}• 不存储聊天内容
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. 数据安全</Text>
          <Text style={styles.sectionContent}>
            我们采用多重安全措施：
            {'\n\n'}• HTTPS/TLS 加密传输
            {'\n'}• AES-256 数据加密
            {'\n'}• 定期安全审计
            {'\n'}• 漏洞奖励计划
            {'\n'}• 数据最小化原则
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. 您的权利</Text>
          <Text style={styles.sectionContent}>
            您有权：
            {'\n\n'}• 访问您的个人数据
            {'\n'}• 更正错误信息
            {'\n'}• 删除所有数据
            {'\n'}• 导出数据备份
            {'\n'}• 撤回同意
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. 联系方式</Text>
          <Text style={styles.sectionContent}>
            如有任何隐私问题，请联系我们：
            {'\n\n'}📧 privacy@kandedongma.com
            {'\n'}我们会在24小时内回复。
          </Text>
        </View>

        {/* 生效日期 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            本隐私政策最后更新：2026年2月10日
          </Text>
        </View>

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
  summary: {
    backgroundColor: theme.colors.primary.mystery + '10',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary.mystery,
  },
  summaryText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 15,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  sectionContent: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  footer: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  footerText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
  bottomSafe: {
    height: 40,
  },
});

export default PrivacyPolicyScreen;
