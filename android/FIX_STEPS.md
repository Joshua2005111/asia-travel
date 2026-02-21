# FOREIGNER_APP - Android 构建修复 (2026-02-15)

## 问题总结

**核心问题：** 文件冲突 + 包名不一致
- `src/main/java/com/anonymous/chinamate/` (旧)
- `src/main/kotlin/com/anonymous/chinamate/` (冲突源)
- build.gradle 使用 `com.anonymous.chinamate`

**解决方案：** 统一使用 `com.chinamate`

---

## 已完成的修复

### ✅ 1. 修改 build.gradle
```gradle
namespace 'com.chinamate'
applicationId "com.chinamate"
```

### ✅ 2. 创建新文件
- `app/src/main/java/com/chinamate/MainActivity.kt`
- `app/src/main/java/com/chinamate/MainApplication.kt`

### ✅ 3. 创建清理脚本
- `android/clean-and-fix.bat`

---

## 你需要执行的步骤

### 步骤 1：运行清理脚本

```bash
cd android
clean-and-fix.bat
```

这个脚本会：
- 删除 `java/com/anonymous/` 文件夹
- 删除 `kotlin/` 文件夹
- 清理 Gradle 缓存

### 步骤 2：启动模拟器

在 Android Studio 中：
1. 打开 Android Studio
2. 点击右上角 **Device Manager**
3. 点击 **Play** 按钮启动模拟器

### 步骤 3：运行 App

```bash
cd ..
npx react-native run-android
```

---

## 文件结构（修复后）

```
FOREIGNER_APP/android/
├── app/
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/
│           │       └── chinamate/
│           │           ├── MainActivity.kt ✅
│           │           └── MainApplication.kt ✅
│           ├── kotlin/ ❌ 已删除
│           └── AndroidManifest.xml
├── build.gradle ✅ (namespace = "com.chinamate")
└── settings.gradle
```

---

## 如果还有问题

### 检查包名

```bash
# 检查 build.gradle
type android\app\build.gradle | findstr namespace
```

应该输出：
```
namespace 'com.chinamate'
```

### 检查文件

```bash
# 验证 MainActivity.kt
dir android\app\src\main\java\com\chinamate\MainActivity.kt

# 验证 MainApplication.kt
dir android\app\src\main\java\com\chinamate\MainApplication.kt
```

### 完全重置

如果还是不行，尝试完全重置：

```bash
cd android
rmdir /s /q app\build
rmdir /s /q build
rmdir /s /q .gradle
cd ..
rmdir /s /q node_modules\.cache
npx react-native run-android
```

---

## 常见错误

### "Unresolved reference: PackageList"
- 原因：包名不一致
- 解决：确保使用 `com.chinamate`

### "Redeclaration: MainActivity"
- 原因：同时存在 kotlin 和 java 文件夹
- 解决：删除 `src/main/kotlin` 文件夹

### "Cannot find BuildConfig"
- 原因：build.gradle 中 namespace 与实际包名不符
- 解决：统一使用 `com.chinamate`

---

## 下一步

1. 运行 `android/clean-and-fix.bat`
2. 启动 Android 模拟器
3. 运行 `npx react-native run-android`
4. 如果还有问题，发送错误日志给我
