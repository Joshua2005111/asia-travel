/**
 * FOREIGNER_APP API 测试脚本
 * 运行方式: node test-apis.js
 */

const axios = require('axios');

// 配置
const CONFIG = {
  MINIMAX_API_KEY: process.env.MINIMAX_API_KEY || 'your_key',
  AMAP_API_KEY: process.env.AMAP_API_KEY || 'your_key',
  API_TIMEOUT: 30000,
};

console.log('🧪 FOREIGNER_APP API 测试\n');
console.log('='.repeat(50));

async function testMiniMaxTranslation() {
  console.log('\n📝 1. 测试 MiniMax 翻译 API');
  console.log('-'.repeat(30));
  
  try {
    const response = await axios.post(
      'https://api.minimax.chat/v1/text/chatcompletion_v2',
      {
        model: 'MiniMax-M2.1',
        messages: [
          { role: 'system', content: 'Translate to Chinese. Keep it natural.' },
          { role: 'user', content: 'Hello, how are you today?' }
        ],
        temperature: 0.3,
      },
      {
        headers: {
          'Authorization': `Bearer ${CONFIG.MINIMAX_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: CONFIG.API_TIMEOUT,
      }
    );
    
    const result = response.data.choices[0].message.content;
    console.log('✅ 翻译成功:', result);
    return true;
  } catch (error) {
    console.log('❌ 翻译失败:', error.response?.data?.error || error.message);
    return false;
  }
}

async function testMiniMaxAI() {
  console.log('\n🤖 2. 测试 MiniMax AI 行程规划');
  console.log('-'.repeat(30));
  
  try {
    const response = await axios.post(
      'https://api.minimax.chat/v1/text/chatcompletion_v2',
      {
        model: 'MiniMax-M2.1',
        messages: [
          { role: 'system', content: '你是中国旅行规划师，推荐3个北京景点。' },
          { role: 'user', content: '推荐北京一日游景点' }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${CONFIG.MINIMAX_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: CONFIG.API_TIMEOUT,
      }
    );
    
    const result = response.data.choices[0].message.content;
    console.log('✅ AI 推荐成功:', result.substring(0, 100) + '...');
    return true;
  } catch (error) {
    console.log('❌ AI 推荐失败:', error.response?.data?.error || error.message);
    return false;
  }
}

async function testAmapPOI() {
  console.log('\n🗺️ 3. 测试高德地图 POI 搜索');
  console.log('-'.repeat(30));
  
  try {
    const response = await axios.get(
      'https://restapi.amap.com/v3/place/text',
      {
        params: {
          key: CONFIG.AMAP_API_KEY,
          keywords: '酒店',
          city: '北京',
          page: 1,
          size: 5,
        },
        timeout: CONFIG.API_TIMEOUT,
      }
    );
    
    if (response.data.status === '1') {
      const count = response.data.pois?.length || 0;
      console.log(`✅ POI 搜索成功，找到 ${count} 个结果`);
      response.data.pois?.forEach((poi: any, i: number) => {
        console.log(`   ${i+1}. ${poi.name} (${poi.distance || 'N/A'}m)`);
      });
      return true;
    } else {
      console.log('❌ POI 搜索失败:', response.data.info);
      return false;
    }
  } catch (error) {
    console.log('❌ POI 搜索失败:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('开始 API 测试...\n');
  
  const results = {
    translation: await testMiniMaxTranslation(),
    ai: await testMiniMaxAI(),
    amap: await testAmapPOI(),
  };
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 测试结果汇总:');
  console.log(`  翻译 API: ${results.translation ? '✅ 通过' : '❌ 失败'}`);
  console.log(`  AI 规划: ${results.ai ? '✅ 通过' : '❌ 失败'}`);
  console.log(`  地图 POI: ${results.amap ? '✅ 通过' : '❌ 失败'}`);
  
  const allPassed = Object.values(results).every(r => r);
  console.log(`\n总体结果: ${allPassed ? '🎉 所有测试通过！' : '⚠️ 部分测试失败'}`);
  
  process.exit(allPassed ? 0 : 1);
}

runAllTests();
