import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function TranslationScreen() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translate = () => {
    if (inputText.trim()) {
      setTranslatedText(`[翻译] ${inputText}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🤖 AI 翻译官</Text>
        <Text style={styles.subtitle}>打破语言壁垒</Text>
      </View>

      <View style={styles.translationBox}>
        <Text style={styles.label}>输入要翻译的文字</Text>
        <TextInput
          style={styles.input}
          placeholder="在这里输入文字..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        
        <View style={styles.languageSelector}>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>🇺🇸 English</Text>
          </TouchableOpacity>
          <Text style={styles.arrow}>→</Text>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>🇨🇳 中文</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.translateButton} onPress={translate}>
          <Text style={styles.translateButtonText}>🌐 翻译</Text>
        </TouchableOpacity>
      </View>

      {translatedText ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>翻译结果</Text>
          <Text style={styles.resultText}>{translatedText}</Text>
        </View>
      ) : null}

      <View style={styles.quickPhrases}>
        <Text style={styles.quickTitle}>快捷短语</Text>
        <View style={styles.phraseButtons}>
          {['洗手间在哪里？', '这个多少钱？', '我想付款', '好吃！'].map((phrase, i) => (
            <TouchableOpacity key={i} style={styles.phraseButton}>
              <Text style={styles.phraseText}>{phrase}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FF6B6B',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
  },
  translationBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
  },
  label: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  languageButton: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
  },
  arrow: {
    marginHorizontal: 16,
    fontSize: 20,
    color: '#636E72',
  },
  translateButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  translateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  resultLabel: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    color: '#2D3436',
  },
  quickPhrases: {
    padding: 20,
  },
  quickTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 12,
  },
  phraseButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  phraseButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  phraseText: {
    fontSize: 14,
    color: '#2D3436',
  },
});
