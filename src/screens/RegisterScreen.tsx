/**
 * 看得懂吗 - 注册页面
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../utils/theme';

function RegisterScreen({ onRegister, onSwitchToLogin }: {
  onRegister: (username: string, email: string, password: string) => Promise<void>;
  onSwitchToLogin: () => void;
}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 处理注册
  const handleRegister = async () => {
    // 验证
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('提示', '请填写所有信息');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('提示', '两次密码输入不一致');
      return;
    }

    if (password.length < 6) {
      Alert.alert('提示', '密码至少6位字符');
      return;
    }

    if (username.length < 2) {
      Alert.alert('提示', '用户名至少2个字符');
      return;
    }

    setIsLoading(true);
    await onRegister(username, email, password);
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 标题 */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>创建账号</Text>
            <Text style={styles.subtitle}>开启你的中国之旅</Text>
          </View>

          {/* 表单 */}
          <View style={styles.form}>
            {/* 用户名 */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>用户名</Text>
              <TextInput
                style={styles.input}
                placeholder="设置用户名"
                placeholderTextColor={theme.colors.text.tertiary}
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
              <Text style={styles.inputHint}>至少2个字符</Text>
            </View>

            {/* 邮箱 */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>邮箱</Text>
              <TextInput
                style={styles.input}
                placeholder="请输入邮箱"
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* 密码 */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>密码</Text>
              <TextInput
                style={styles.input}
                placeholder="设置密码"
                placeholderTextColor={theme.colors.text.tertiary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Text style={styles.inputHint}>至少6位字符，建议包含字母和数字</Text>
            </View>

            {/* 确认密码 */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>确认密码</Text>
              <TextInput
                style={styles.input}
                placeholder="再次输入密码"
                placeholderTextColor={theme.colors.text.tertiary}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            {/* 注册按钮 */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={theme.colors.gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerButtonGradient}
              >
                <Text style={styles.registerButtonText}>
                  {isLoading ? '注册中...' : '注册'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* 条款 */}
          <Text style={styles.termsText}>
            注册即表示同意《用户协议》和《隐私政策》
          </Text>

          {/* 登录链接 */}
          <View style={styles.loginSection}>
            <Text style={styles.loginText}>已有账号？</Text>
            <TouchableOpacity onPress={onSwitchToLogin}>
              <Text style={styles.loginLink}>立即登录</Text>
            </TouchableOpacity>
          </View>

          {/* 底部装饰 */}
          <View style={styles.bottomDecor}>
            <Text style={styles.bottomEmoji}>🎲</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.screen,
    paddingTop: theme.spacing.xxl * 2,
    paddingBottom: theme.spacing.xxl,
  },
  // 标题
  titleSection: {
    marginBottom: theme.spacing.xxl,
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
  // 表单
  form: {
    marginBottom: theme.spacing.xl,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontFamily: theme.fonts.cn.body,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  inputHint: {
    fontFamily: theme.fonts.en.body,
    fontSize: 11,
    color: theme.colors.text.tertiary,
    marginTop: 4,
  },
  registerButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: theme.spacing.lg,
    ...theme.shadows.primary,
  },
  registerButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  // 条款
  termsText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 11,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  // 登录
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  loginText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
  },
  loginLink: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary.mystery,
    marginLeft: 4,
  },
  // 底部装饰
  bottomDecor: {
    alignItems: 'center',
    opacity: 0.5,
  },
  bottomEmoji: {
    fontSize: 60,
  },
});

export default RegisterScreen;
