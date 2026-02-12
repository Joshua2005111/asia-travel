/**
 * 看得懂吗 - 登录页面
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

function LoginScreen({ onLogin, onSwitchToRegister }: {
  onLogin: (email: string, password: string) => Promise<void>;
  onSwitchToRegister: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 处理登录
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('提示', '请输入邮箱和密码');
      return;
    }

    setIsLoading(true);
    await onLogin(email, password);
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
          {/* Logo区域 */}
          <View style={styles.logoSection}>
            <Text style={styles.logoEmoji}>🎲</Text>
            <Text style={styles.logoText}>看得懂吗</Text>
            <Text style={styles.logoSubtext}>
              外国人在中国的趣味旅行App
            </Text>
          </View>

          {/* 标题 */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>欢迎回来</Text>
            <Text style={styles.subtitle}>登录你的账号</Text>
          </View>

          {/* 表单 */}
          <View style={styles.form}>
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
                placeholder="请输入密码"
                placeholderTextColor={theme.colors.text.tertiary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* 忘记密码 */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>忘记密码？</Text>
            </TouchableOpacity>

            {/* 登录按钮 */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={theme.colors.gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButtonGradient}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? '登录中...' : '登录'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* 第三方登录 */}
          <View style={styles.socialSection}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>其他方式登录</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* 第三方登录按钮 */}
            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>🍎</Text>
                <Text style={styles.socialText}>Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>🔵</Text>
                <Text style={styles.socialText}>Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>💬</Text>
                <Text style={styles.socialText}>微信</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 注册链接 */}
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>还没有账号？</Text>
            <TouchableOpacity onPress={onSwitchToRegister}>
              <Text style={styles.registerLink}>立即注册</Text>
            </TouchableOpacity>
          </View>

          {/* 底部说明 */}
          <Text style={styles.termsText}>
            登录即表示同意《用户协议》和《隐私政策》
          </Text>
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
  // Logo
  logoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  logoText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  logoSubtext: {
    fontFamily: theme.fonts.en.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  forgotPasswordText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.primary.mystery,
  },
  loginButton: {
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    ...theme.shadows.primary,
  },
  loginButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  // 第三方登录
  socialSection: {
    marginBottom: theme.spacing.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    marginHorizontal: theme.spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  socialButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.card,
  },
  socialIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  socialText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 10,
    color: theme.colors.text.tertiary,
  },
  // 注册
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  registerText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    color: theme.colors.text.tertiary,
  },
  registerLink: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary.mystery,
    marginLeft: 4,
  },
  termsText: {
    fontFamily: theme.fonts.en.body,
    fontSize: 11,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
});

export default LoginScreen;
