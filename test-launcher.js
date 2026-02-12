/**
 * FOREIGNER_APP - Quick Test Script
 * Run this to start testing
 */

const { exec } = require('child_process');
const path = require('path');

const appDir = path.join(__dirname);

console.log(`
🏗️ FOREIGNER_APP Testing Launcher
================================

📋 测试清单: TESTING_CHECKLIST.md
📁 项目目录: ${appDir}

🚀 快速命令:

1. 安装依赖
   cd FOREIGNER_APP
   npm install

2. 启动 Metro
   npm start

3. 运行 Android
   npm run android

4. 运行测试
   npm test

5. 代码检查
   npm run lint

📝 记得先查看 TESTING_CHECKLIST.md 了解详细测试项！

🔗 相关文件:
   - TESTING_CHECKLIST.md (完整测试清单)
   - package.json (项目配置)
   - app.json (应用配置)

⏰ Deadline: 2026-02-15 (4天)
`);

// Check if dependencies are installed
try {
  const nodeModules = path.join(appDir, 'node_modules');
  const fs = require('fs');
  
  if (fs.existsSync(nodeModules)) {
    console.log('✅ node_modules 已安装');
  } else {
    console.log('⚠️  需要运行: npm install');
  }
} catch (e) {
  console.log('⚠️  检查依赖失败');
}
