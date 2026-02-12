import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { usePaymentStore } from '../stores/paymentStore';

interface PaymentScreenProps {
  route: any;
  navigation: any;
}

export default function PaymentScreen({ route, navigation }: PaymentScreenProps) {
  const { t } = useTranslation();
  const { bookingId, amount, description } = route.params || {};
  
  const {
    paymentMethods,
    selectedPaymentMethod,
    isProcessing,
    paymentStatus,
    error,
    loadPaymentMethods,
    selectPaymentMethod,
    initiatePayment,
    resetPaymentState,
  } = usePaymentStore();
  
  const [countdown, setCountdown] = useState(900); // 15分钟倒计时

  useEffect(() => {
    loadPaymentMethods();
    return () => resetPaymentState();
  }, []);

  // 倒计时逻辑
  useEffect(() => {
    if (countdown <= 0) {
      Alert.alert('提示', '订单已过期，请重新下单');
      navigation.goBack();
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // 支付成功处理
  useEffect(() => {
    if (paymentStatus === 'success') {
      Alert.alert(
        '支付成功',
        '您的订单已支付成功',
        [
          {
            text: '查看订单',
            onPress: () => {
              resetPaymentState();
              navigation.navigate('Bookings');
            },
          },
        ]
      );
    } else if (paymentStatus === 'failed') {
      Alert.alert(
        '支付失败',
        error || '支付未完成，请重试',
        [
          { text: '重试', onPress: () => {} },
          { 
            text: '取消', 
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  }, [paymentStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      Alert.alert('提示', '请选择支付方式');
      return;
    }

    const success = await initiatePayment(bookingId, amount, description);
    if (success) {
      Alert.alert('提示', '正在跳转支付...');
    }
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'wechat': return 'wechat';
      case 'alipay': return 'alipay';
      case 'card': return 'credit-card';
      default: return 'cash';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>确认支付</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 倒计时 */}
        <View style={styles.countdownContainer}>
          <Icon name="clock-outline" size={20} color="#F97316" />
          <Text style={styles.countdownText}>
            请在 {formatTime(countdown)} 内完成支付
          </Text>
        </View>

        {/* 订单信息 */}
        <View style={styles.orderInfo}>
          <Text style={styles.sectionTitle}>订单信息</Text>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>商品</Text>
            <Text style={styles.orderValue}>{description}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>金额</Text>
            <Text style={styles.price}>¥{amount.toFixed(2)}</Text>
          </View>
        </View>

        {/* 支付方式 */}
        <View style={styles.paymentMethods}>
          <Text style={styles.sectionTitle}>选择支付方式</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodItem,
                selectedPaymentMethod === method.id && styles.methodItemSelected,
              ]}
              onPress={() => selectPaymentMethod(method.id)}
              disabled={isProcessing}
            >
              <View style={styles.methodLeft}>
                <Icon 
                  name={getPaymentIcon(method.type)} 
                  size={28} 
                  color={method.type === 'wechat' ? '#07C160' : 
                         method.type === 'alipay' ? '#1677FF' : '#666'}
                />
                <View style={styles.methodInfo}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  {method.last4 && (
                    <Text style={styles.methodDetail}>
                      尾号 {method.last4}
                    </Text>
                  )}
                </View>
              </View>
              <Icon 
                name={
                  selectedPaymentMethod === method.id 
                    ? 'radiobox-marked' 
                    : 'radiobox-blank'
                }
                size={24}
                color="#F97316"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* 添加支付方式 */}
        <TouchableOpacity 
          style={styles.addMethodButton}
          onPress={() => Alert.alert('提示', '添加支付方式功能开发中')}
        >
          <Icon name="plus" size={20} color="#F97316" />
          <Text style={styles.addMethodText}>添加支付方式</Text>
        </TouchableOpacity>

        {/* 安全提示 */}
        <View style={styles.securityTips}>
          <Icon name="lock-outline" size={16} color="#999" />
          <Text style={styles.securityText}>
            支付安全由银行和第三方支付机构保障
          </Text>
        </View>
      </ScrollView>

      {/* 底部支付按钮 */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerLabel}>实付金额</Text>
          <Text style={styles.footerPrice}>¥{amount.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.payButton,
            isProcessing && styles.payButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={isProcessing || !selectedPaymentMethod}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>立即支付</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    marginBottom: 16,
  },
  countdownText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#F97316',
    fontWeight: '500',
  },
  orderInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F97316',
  },
  paymentMethods: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  methodItemSelected: {
    backgroundColor: '#FFF7ED',
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodInfo: {
    marginLeft: 12,
  },
  methodName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  methodDetail: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#F97316',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addMethodText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#F97316',
    fontWeight: '500',
  },
  securityTips: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 100,
  },
  securityText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#999',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerContent: {
    flex: 1,
  },
  footerLabel: {
    fontSize: 12,
    color: '#999',
  },
  footerPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F97316',
  },
  payButton: {
    backgroundColor: '#F97316',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
    minWidth: 140,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#FDBA74',
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
