import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TranslationScreen() {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('zh');

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    // Simulate translation API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTranslatedText(`[Chinese] ${inputText}`);
    setLoading(false);
  };

  const handleSpeak = (text: string) => {
    Speech.speak(text, { language: targetLang === 'zh' ? 'zh-CN' : 'en-US' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('translate.title')}</Text>
      </View>

      <View style={styles.languageSelector}>
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => {}}
        >
          <Text style={styles.langButtonText}>
            {sourceLang.toUpperCase()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.swapButton}
          onPress={() => {
            const temp = sourceLang;
            setSourceLang(targetLang);
            setTargetLang(temp);
          }}
        >
          <Icon name="swap-horizontal" size={24} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.langButton}
          onPress={() => {}}
        >
          <Text style={styles.langButtonText}>
            {targetLang.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder={t('translate.inputPlaceholder')}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={styles.speakButton}
          onPress={() => handleSpeak(inputText)}
        >
          <Icon name="volume-high" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.translateButton}
        onPress={handleTranslate}
        disabled={loading || !inputText.trim()}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.translateButtonText}>
            {t('translate.button')}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.outputSection}>
        <Text style={styles.outputLabel}>{t('translate.result')}</Text>
        <View style={styles.output}>
          <Text style={styles.outputText}>
            {translatedText || t('translate.placeholder')}
          </Text>
          {translatedText ? (
            <TouchableOpacity
              style={styles.speakButton}
              onPress={() => handleSpeak(translatedText)}
            >
              <Icon name="volume-high" size={24} color="#007AFF" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.phrasebook}>
        <Text style={styles.sectionTitle}>{t('translate.phrasebook')}</Text>
        {['Hello', 'Thank you', 'Where is...?', 'How much?', 'Help'].map((phrase) => (
          <TouchableOpacity
            key={phrase}
            style={styles.phraseItem}
            onPress={() => setInputText(phrase)}
          >
            <Text style={styles.phraseText}>{phrase}</Text>
            <Icon name="chevron-right" size={20} color="#8E8E93" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  langButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  langButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  swapButton: {
    marginHorizontal: 16,
    padding: 8,
  },
  inputSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 80,
  },
  speakButton: {
    justifyContent: 'center',
    padding: 8,
  },
  translateButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  translateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  outputSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  outputLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  output: {
    minHeight: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outputText: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
  },
  phrasebook: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  phraseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  phraseText: {
    fontSize: 16,
    color: '#1C1C1E',
  },
});
