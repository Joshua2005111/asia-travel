# FOREIGNER_APP - Android 构建修复指南

**日期：** 2026-02-15  
**问题：** 构建失败 - 代码文件重复（Redeclaration）

---

## 问题原因

项目中有**两套源代码**：
- `android/app/src/main/java/` - Java/Kotlin 源代码（正确位置）
- `android/app/src/main/kotlin/` - 额外的 Kotlin 文件（冲突源）

同时存在**包名冲突**：
- `com.anonymous.chinamate` - AndroidManifest.xml 中声明的包名
- `com.chinamate` - 错误生成的文件夹

这导致 Kotlin 编译器找到多个 `MainActivity` 和 `MainApplication` 声明。

---

## 修复步骤

### 方法一：自动修复（推荐）

1. **运行修复脚本**
   ```bash
   cd android
   fix-build.bat
   ```

2. **手动检查 AndroidManifest.xml**
   如果脚本提示需要修改，打开：
   ```
   android/app/src/main/AndroidManifest.xml
   ```
   确保 `package="com.anonymous.chinamate"`

3. **重新构建**
   ```bash
   cd ..
   npx react-native run-android
   ```

---

### 方法二：手动修复

#### 步骤 1：删除重复的 kotlin 文件夹

在文件资源管理器中：
```
C:\Users\Joshua\.openclaw\workspace\FOREIGNER_APP\android\app\src\main\
```
- 找到 `kotlin` 文件夹
- **删除它**（保留 `java` 文件夹）

#### 步骤 2：解决包名冲突

检查 `java/com/` 目录：
```
android/app/src/main/java/com/
├── anonymous/
│   └── chinamate/
│       ├── MainActivity.kt ✅ 保留
│       └── MainApplication.kt ✅ 保留
└── chinamate/ ❌ 删除这个文件夹
```

如果看到 `chinamate` 文件夹，**删除它**。

#### 步骤 3：验证 AndroidManifest.xml

打开 `android/app/src/main/AndroidManifest.xml`：
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.anonymous.chinamate">  ← 必须是这个包名
```

如果包名是 `com.chinamate`，**修改为 `com.anonymous.chinamate`**。

#### 步骤 4：验证 MainApplication.kt

文件位置：
```
android/app/src/main/java/com/anonymous/chinamate/MainApplication.kt
```

内容应该是：
```kotlin
package com.anonymous.chinamate

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.facebook.react.BuildConfig

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages

        override fun getJSMainModuleName(): String = "index"
        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load()
    }
  }
}
```

#### 步骤 5：清理并重新构建

```bash
cd android
gradlew clean
cd ..
npx react-native run-android
```

---

## 常见问题

### Q1: "package" 属性应该是什么？

**答案：** 必须是 `com.anonymous.chinamate`，与文件夹结构一致：
```
android/app/src/main/java/com/anonymous/chinamate/
```

### Q2: 删除了 kotlin 文件夹后还是报错？

**尝试：**
```bash
cd android
gradlew clean
cd .. 
rm -rf node_modules/.cache
npx react-native run-android
```

### Q3: 如何验证构建环境？

检查关键文件：
```bash
# 检查 MainActivity.kt 位置
dir android/app/src/main/java/com/anonymous/chinamate/MainActivity.kt

# 检查 MainApplication.kt 位置
dir android/app/src/main/java/com/anonymous/chinamate/MainApplication.kt

# 检查 AndroidManifest.xml 包名
type android/app/src/main/AndroidManifest.xml | findstr package=
```

### Q4: PackageList 错误？

确保：
1. `kotlin` 文件夹已删除
2. `com.anonymous.chinamate` 文件夹存在
3. `android/app/build.gradle` 中 `namespace` 正确

---

## 文件结构（修复后）

```
FOREIGNER_APP/android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── anonymous/
│   │       │           └── chinamate/
│   │       │               ├── MainActivity.kt ✅
│   │       │               └── MainApplication.kt ✅
│   │       ├── AndroidManifest.xml ✅
│   │       └── res/
│   └── build.gradle
├── build.gradle
└── settings.gradle
```

**注意：** 不应该有 `kotlin/` 文件夹！

---

## 如果还是无法解决

1. **提供完整错误日志**
   - 复制 Android Studio 中的所有错误信息
   - 或运行 `npx react-native run-android --stacktrace`

2. **检查环境**
   ```bash
   # Node 版本
   node -v
   
   # Java 版本
   java -version
   
   # Gradle 版本
   gradlew --version
   
   # Android SDK
   echo %ANDROID_HOME%
   ```

3. **尝试全新构建**
   ```bash
   cd android
   rm -rf .gradle build app/build
   cd ..
   npx react-native run-android
   ```

---

## 参考资源

- [React Native Android Setup](https://reactnative.dev/docs/environment-setup)
- [React Native Android Troubleshooting](https://reactnative.dev/docs/troubleshooting)
- [Kotlin in React Native](https://reactnative.dev/docs/kotlin-overview)

---

**最后更新：** 2026-02-15  
**状态：** 待验证
