import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PaymentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💳 支付</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>选择支付方式</Text>
        
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.optionIcon}>💙</Text>
          <Text style={styles.optionText}>支付宝</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.paymentOption}>
          <Text style={styles.optionIcon}>💳</Text>
          <Text style={styles.optionText}>信用卡/借记卡</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#2D3436',
  },
});
