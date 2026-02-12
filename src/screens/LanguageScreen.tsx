/**
 * FOREIGNER_APP 语言选择页面
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../utils/theme';

const { width, height } = Dimensions.get('window');

// 语言选项
const LANGUAGE_OPTIONS = [
  { id: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { id: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
  { id: 'kr', name: '한국어', flag: '🇰🇷', nativeName: '한국어' },
  { id: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
  { id: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { id: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
];

function LanguageScreen({ onSelect }: { onSelect: (languageId: string) => void }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 标题 */}
        <View style={styles.header}>
          <Text style={styles.title}>🌍</Text>
          <Text style={styles.mainTitle}>选择语言</Text>
          <Text style={styles.subTitle}>Select your language</Text>
        </View>

        {/* 语言列表 */}
        <View style={styles.languageList}>
          {LANGUAGE_OPTIONS.map((lang, index) => (
            <TouchableOpacity
              key={lang.id}
              style={styles.languageItem}
              onPress={() => onSelect(lang.id)}
              activeOpacity={0.8}
            >
              <View style={styles.languageLeft}>
                <Text style={styles.flag}>{lang.flag}</Text>
                <View>
                  <Text style={styles.languageName}>{lang.name}</Text>
                  <Text style={styles.languageNative}>{lang.nativeName}</Text>
                </View>
              </View>

              <View style={styles.languageRight}>
                <Text style={styles.arrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 底部说明 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            选择语言后，你可以随时在「我的」页面中更改
          </Text>
        </View>

        {/* 底部装饰 */}
        <View style={styles.bottomDecorations}>
          <View style={styles.decoration1} />
          <View style={styles.decoration2} />
        </View>
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
  // 标题
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  title: {
    fontSize: 80,
    marginBottom: theme.spacing.md,
  },
  mainTitle: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: theme.fonts.cn.size.h1,
    fontWeight: '800',
    color: theme.colors.text.primary,
  },
  subTitle: {
    fontFamily: theme.fonts.en.body,
    fontSize: 16,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.xs,
  },
  // 语言列表
  languageList: {
    marginBottom: theme.spacing.xxl,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  languageName: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: theme.fonts.cn.size.h3,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  languageNative: {
    fontFamily: theme.fonts.en.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    marginTop: 2,
  },
  languageRight: {
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 24,
    color: theme.colors.text.tertiary,
  },
  // 底部说明
  footer: {
    alignItems: 'center',
    paddingBottom: theme.spacing.xxl,
  },
  footerText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 12,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
  // 底部装饰
  bottomDecorations: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  decoration1: {
    position: 'absolute',
    bottom: 20,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: theme.colors.primary.pink + '15',
  },
  decoration2: {
    position: 'absolute',
    bottom: 80,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: theme.colors.primary.mystery + '15',
  },
});

export default LanguageScreen;
