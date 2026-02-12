/**
 * FOREIGNER_APP 发现地图页面
 * 
 * 核心功能：
 * - 地图探索
 * - POI搜索
 * - 周边发现
 * - 离线功能（Phase 2）
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../utils/theme';
import { SearchIcon, HeartIcon, ShareIcon } from '../components/Icons';

const { width } = Dimensions.get('window');

// 地图POI数据
const MAP_POIS = [
  {
    id: '1',
    name: '武康路',
    type: '街区',
    distance: '200m',
    rating: 4.8,
    category: '网红打卡',
    color: theme.colors.primary.pink,
  },
  {
    id: '2',
    name: '上海交通大学',
    type: '景点',
    distance: '500m',
    rating: 4.6,
    category: '文化',
    color: theme.colors.primary.blue,
  },
  {
    id: '3',
    name: '徐家汇书院',
    type: '书店',
    distance: '800m',
    rating: 4.9,
    category: '文化',
    color: theme.colors.secondary.success,
  },
  {
    id: '4',
    name: '静安寺',
    type: '寺庙',
    distance: '1.2km',
    rating: 4.7,
    category: '宗教',
    color: theme.colors.secondary.warning,
  },
  {
    id: '5',
    name: '张园',
    type: '街区',
    distance: '1.5km',
    rating: 4.5,
    category: '历史',
    color: theme.colors.primary.info,
  },
];

// 图层分类
const LAYERS = [
  { id: 'all', label: '全部', emoji: '📍' },
  { id: 'food', label: '美食', emoji: '🍜' },
  { id: 'view', label: '景点', emoji: '🏛️' },
  { id: 'secret', label: '私藏', emoji: '🎁' },
  { id: 'coffee', label: '咖啡', emoji: '☕' },
];

function MapScreen() {
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [selectedPOI, setSelectedPOI] = useState(MAP_POIS[0]);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* 搜索框 */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color={theme.colors.text.tertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索地点、美食、体验..."
            placeholderTextColor={theme.colors.text.tertiary}
          />
        </View>
      </View>

      {/* 图层选择 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.layersContainer}
        contentContainerStyle={styles.layersContent}
      >
        {LAYERS.map((layer) => (
          <TouchableOpacity
            key={layer.id}
            style={[
              styles.layerButton,
              selectedLayer === layer.id && styles.layerButtonActive,
            ]}
            onPress={() => setSelectedLayer(layer.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.layerEmoji}>{layer.emoji}</Text>
            <Text
              style={[
                styles.layerLabel,
                selectedLayer === layer.id && styles.layerLabelActive,
              ]}
            >
              {layer.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 地图区域 */}
      <View style={styles.mapContainer}>
        {/* 模拟地图背景 */}
        <View style={styles.mapBackground}>
          {/* 模拟地图网格 */}
          {[...Array(20)].map((_, i) => (
            <View key={i} style={styles.mapGridLine} />
          ))}
          
          {/* 模拟地图标记 */}
          {MAP_POIS.map((poi, index) => (
            <TouchableOpacity
              key={poi.id}
              style={[
                styles.mapMarker,
                {
                  left: `${20 + (index % 4) * 20 + Math.random() * 10}%`,
                  top: `${20 + Math.floor(index / 4) * 20 + Math.random() * 10}%`,
                  backgroundColor: poi.color,
                },
              ]}
              onPress={() => setSelectedPOI(poi)}
              activeOpacity={0.8}
            >
              <Text style={styles.markerEmoji}>
                {poi.category === '网红打卡' ? '📸' : poi.category === '美食' ? '🍜' : poi.category === '文化' ? '📚' : poi.category === '宗教' ? '🕉️' : '🏛️'}
              </Text>
              {selectedPOI.id === poi.id && (
                <View style={styles.markerCallout}>
                  <Text style={styles.markerCalloutText}>{poi.name}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          {/* 模拟用户位置 */}
          <View style={styles.userLocation}>
            <View style={styles.userLocationInner}>
              <Text style={styles.userLocationDot}>📍</Text>
            </View>
            <View style={styles.userLocationPulse} />
          </View>
        </View>
      </View>

      {/* 底部POI卡片 */}
      {selectedPOI && (
        <View style={styles.poiCard}>
          <View style={styles.poiCardHeader}>
            <View style={styles.poiCategory}>
              <View
                style={[
                  styles.poiCategoryIcon,
                  { backgroundColor: selectedPOI.color + '30' },
                ]}
              >
                <Text style={styles.poiCategoryEmoji}>
                  {selectedPOI.category === '网红打卡' ? '📸' : '🏛️'}
                </Text>
              </View>
              <View>
                <Text style={styles.poiName}>{selectedPOI.name}</Text>
                <Text style={styles.poiType}>{selectedPOI.type} · {selectedPOI.distance}</Text>
              </View>
            </View>
            
            <View style={styles.poiRating}>
              <Text style={styles.ratingStar}>⭐</Text>
              <Text style={styles.ratingText}>{selectedPOI.rating}</Text>
            </View>
          </View>

          {/* 操作按钮 */}
          <View style={styles.poiActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsLiked(!isLiked)}
              activeOpacity={0.8}
            >
              <HeartIcon filled={isLiked} size={24} color={isLiked ? theme.colors.primary.pink : theme.colors.text.secondary} />
              <Text style={styles.actionButtonText}>收藏</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <ShareIcon size={24} color={theme.colors.text.secondary} />
              <Text style={styles.actionButtonText}>分享</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]} activeOpacity={0.8}>
              <Text style={styles.actionButtonTextPrimary}>导航 →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 底部安全区 */}
      <View style={styles.bottomSafeArea} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  // 搜索框
  searchContainer: {
    paddingHorizontal: theme.spacing.screen,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.xl,
    height: 52,
    paddingHorizontal: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontFamily: theme.fonts.cn.body,
    fontSize: theme.fonts.cn.size.body,
    color: theme.colors.text.primary,
  },
  // 图层选择
  layersContainer: {
    marginBottom: theme.spacing.md,
  },
  layersContent: {
    paddingHorizontal: theme.spacing.screen,
  },
  layerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.sm,
  },
  layerButtonActive: {
    backgroundColor: theme.colors.primary.blue,
  },
  layerEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  layerLabel: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 13,
    color: theme.colors.text.secondary,
  },
  layerLabelActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  // 地图
  mapContainer: {
    flex: 1,
    marginBottom: theme.spacing.md,
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    position: 'relative',
  },
  mapGridLine: {
    position: 'absolute',
    backgroundColor: theme.colors.overlay.light,
    opacity: 0.1,
  },
  // 地图标记
  mapMarker: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.md,
  },
  markerEmoji: {
    fontSize: 22,
  },
  markerCallout: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
    ...theme.shadows.sm,
  },
  markerCalloutText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.background.primary,
  },
  // 用户位置
  userLocation: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -20,
    marginTop: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userLocationInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary.blue,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
    zIndex: 10,
  },
  userLocationDot: {
    fontSize: 20,
  },
  userLocationPulse: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: theme.colors.primary.blue,
    opacity: 0.3,
  },
  // POI卡片
  poiCard: {
    backgroundColor: theme.colors.background.secondary,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    ...theme.shadows.lg,
  },
  poiCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  poiCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poiCategoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  poiCategoryEmoji: {
    fontSize: 24,
  },
  poiName: {
    fontFamily: theme.fonts.cn.headline,
    fontSize: theme.fonts.cn.size.h3,
    fontWeight: '700',
    color: theme.colors.text.primary,
  },
  poiType: {
    fontFamily: theme.fonts.cn.body,
    fontSize: theme.fonts.cn.size.caption,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  poiRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.md,
  },
  ratingStar: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  // 操作按钮
  poiActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.overlay.light,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 8,
  },
  actionButtonText: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 13,
    color: theme.colors.text.secondary,
    marginLeft: 6,
  },
  actionButtonPrimary: {
    backgroundColor: theme.colors.primary.blue,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
  },
  actionButtonTextPrimary: {
    fontFamily: theme.fonts.cn.body,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  // 底部安全区
  bottomSafeArea: {
    height: 40,
  },
});

export default MapScreen;
