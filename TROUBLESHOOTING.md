# FOREIGNER_APP - 崩溃故障排除

## 问题：App 安装后闪退

---

## 方案 1：启动 Metro Bundler（最重要！）

```bash
# 在项目根目录运行
npx react-native start
```

Metro bundler 必须运行，App 才能正常工作！

---

## 方案 2：重新加载 App

在模拟器中：
1. 摇晃手机（或按 Ctrl+M）
2. 点击 **"Reload"**

---

## 方案 3：检查 Logcat 错误

在 Android Studio 中：
1. 点击底部 **Logcat** 标签
2. 在搜索框输入 `FATAL`
3. 找到错误后截图或复制

---

## 方案 4：检查已连接的设备

```bash
adb devices
```

应该显示：
```
List of devices attached
emulator-5554   device
```

---

## 方案 5：手动启动 App

如果 Gradle 安装命令失败：

```bash
# 进入 Android 目录
cd android

# 安装 debug APK
adb install app/build/outputs/apk/debug/app-debug.apk

# 启动 App
adb shell am start -n com.chinamate/.MainActivity
```

---

## 方案 6：清理并重新构建

```bash
cd android
.\gradlew clean
cd ..
npx react-native run-android
```

---

## 方案 7：检查 Android 配置

确保 `MainActivity.kt` 中：

```kotlin
override fun getMainComponentName(): String = "ChinaMate"
```

确保 `index.js` 中：

```javascript
import App from './src/App';
registerRootComponent(App);
```

---

## 最常见原因

1. **Metro bundler 没有运行** - 必须先运行 `npx react-native start`
2. **设备未连接** - 运行 `adb devices` 检查
3. **缓存问题** - 运行 `.\gradlew clean`

---

## 快速测试

1. 打开 **新 Terminal**
2. 运行：`npx react-native start`
3. 等待 Metro 启动
4. 在模拟器中摇晃 → Reload
5. 如果还是崩溃，检查 Logcat

---

*更新日期: 2026-02-15*
