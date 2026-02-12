import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import api from '../services/api';

export default function TranslateScreen() {
  const { t, locale, setLocale } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('auto');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: 'Chinese' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'tr', name: 'Turkish' },
    { code: 'ar', name: 'Arabic' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
  ];

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      Alert.alert(t('auth.error'), t('translate.enter_text'));
      return;
    }

    setLoading(true);
    try {
      const data = await api.translateText(inputText, sourceLang, locale);
      setTranslatedText(data.translation);
    } catch (error: any) {
      Alert.alert(
        t('auth.error'),
        error.response?.data?.error || 'Translation failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const speak = () => {
    if (translatedText) {
      setIsSpeaking(true);
      Speech.speak(translatedText, {
        language: locale === 'zh' ? 'zh-CN' : locale,
        onFinished: () => setIsSpeaking(false),
      });
    }
  };

  const copyToClipboard = () => {
    if (translatedText) {
      // Use Clipboard API in production
      Alert.alert('', t('translate.copied'));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('translate.title')}</Text>

        {/* Source Language */}
        <View style={styles.row}>
          <Text style={styles.label}>From:</Text>
          <View style={styles.languageSelector}>
            {['auto', 'en', 'zh', 'kk', 'uz'].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.langButton,
                  sourceLang === lang && styles.langButtonActive,
                ]}
                onPress={() => setSourceLang(lang)}
              >
                <Text
                  style={[
                    styles.langText,
                    sourceLang === lang && styles.langTextActive,
                  ]}
                >
                  {lang === 'auto' ? 'Auto' : lang.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Target Language */}
        <View style={styles.row}>
          <Text style={styles.label}>To:</Text>
          <View style={styles.languageSelector}>
            {languages.slice(0, 5).map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langButton,
                  locale === lang.code && styles.langButtonActive,
                ]}
                onPress={() => setLocale(lang.code as any)}
              >
                <Text
                  style={[
                    styles.langText,
                    locale === lang.code && styles.langTextActive,
                  ]}
                >
                  {lang.code.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder={t('translate.input_hint')}
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.speakButton}>
            <Ionicons name="mic" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Translate Button */}
        <TouchableOpacity
          style={[styles.translateButton, loading && styles.buttonDisabled]}
          onPress={handleTranslate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <View style={styles.translateButtonContent}>
              <Ionicons name="language" size={20} color="white" />
              <Text style={styles.translateButtonText}>Translate</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Output Section */}
        <View style={styles.outputSection}>
          <View style={styles.outputHeader}>
            <Text style={styles.outputLabel}>{t('translate.result')}</Text>
            {translatedText ? (
              <View style={styles.outputActions}>
                <TouchableOpacity style={styles.actionButton} onPress={copyToClipboard}>
                  <Ionicons name="copy-outline" size={20} color="#1E3A8A" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={speak} disabled={isSpeaking}>
                  <Ionicons
                    name={isSpeaking ? 'volume-high' : 'volume-medium-outline'}
                    size={20}
                    color="#1E3A8A"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                  <Ionicons name="swap-vertical" size={20} color="#1E3A8A" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={styles.outputBox}>
            <Text style={styles.outputText}>
              {translatedText || 'Translation will appear here...'}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={() => setInputText('')}>
            <Ionicons name="trash-outline" size={16} color="#6B7280" />
            <Text style={styles.quickActionText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => {}}>
            <Ionicons name="document-text-outline" size={16} color="#6B7280" />
            <Text style={styles.quickActionText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => {}}>
            <Ionicons name="star-outline" size={16} color="#6B7280" />
            <Text style={styles.quickActionText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  languageSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },
  langButtonActive: {
    backgroundColor: '#1E3A8A',
  },
  langText: {
    fontSize: 12,
    color: '#6B7280',
  },
  langTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  inputSection: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
  },
  speakButton: {
    backgroundColor: '#1E3A8A',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    alignSelf: 'flex-end',
  },
  translateButton: {
    backgroundColor: '#1E3A8A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  translateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  translateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  outputSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  outputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  outputActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  outputBox: {
    minHeight: 80,
  },
  outputText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickActionText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
