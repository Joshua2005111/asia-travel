# 🎲 FOREIGNER_APP (看得懂吗 / ChinaMate)

外国人在中国的趣味旅行 App

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 运行开发服务器
```bash
npx react-native run-android
# 或
npx react-native start
```

### GitHub Actions 自动测试
推送到 main 分支自动运行：
- ✅ Lint 代码检查
- ✅ Android 构建测试
- ✅ 单元测试

## 📱 功能模块

- 🔤 即时翻译 (MiniMax AI)
- 🗺️ 智能行程规划
- 🎲 盲盒旅行推荐
- 💬 匿名聊天
- 📸 BeReal 打卡

## 🛠️ 技术栈

- React Native 0.73
- TypeScript
- MiniMax AI API
- 高德地图 SDK
- Stripe 支付

## 📋 GitHub Actions

- `ci.yml` - 主 CI/CD 流程
- `pr-check.yml` - PR 检查

## 🤝 贡献指南

1. 创建分支: `git checkout -b fix/xxx`
2. 提交修复: `git commit -m "fix: xxx"`
3. 创建 PR: `gh pr create`
4. 自动测试通过后合并

## 📄 许可证

MIT
