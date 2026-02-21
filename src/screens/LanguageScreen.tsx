import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'kr', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default function LanguageScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>选择语言</Text>
      <Text style={styles.subtitle}>Select your language</Text>

      <FlatList
        data={languages}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.langItem}>
            <Text style={styles.langFlag}>{item.flag}</Text>
            <Text style={styles.langName}>{item.name}</Text>
            <Text style={styles.check}>✓</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          // Mark onboarding as complete
          navigation.replace('Main');
        }}
      >
        <Text style={styles.buttonText}>继续 →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 30,
  },
  list: {
    flex: 1,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  langFlag: {
    fontSize: 28,
    marginRight: 12,
  },
  langName: {
    flex: 1,
    fontSize: 18,
    color: '#FFFFFF',
  },
  check: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
  },
});
