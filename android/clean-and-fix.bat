@echo off
chcp 65001 >nul
echo ╔══════════════════════════════════════════════════════════════╗
echo ║    FOREIGNER_APP - Android 构建修复 (统一使用 com.chinamate)  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 📋 第一步：检查当前包名
echo ─────────────────────────────────────────────────────────────
echo build.gradle 中的 namespace: com.chinamate
echo build.gradle 中的 applicationId: com.chinamate
echo.

echo 🗑️ 第二步：删除旧的 anonymous 文件夹
echo ─────────────────────────────────────────────────────────────
if exist "app\src\main\java\com\anonymous" (
    rmdir /s /q "app\src\main\java\com\anonymous"
    echo ✅ 已删除 java/com/anonymous 文件夹
) else (
    echo ℹ️ java/com/anonymous 文件夹不存在
)
echo.

echo 🗑️ 第三步：删除 kotlin 文件夹
echo ─────────────────────────────────────────────────────────────
if exist "app\src\main\kotlin" (
    rmdir /s /q "app\src\main\kotlin"
    echo ✅ 已删除 kotlin 文件夹
) else (
    echo ℹ️ kotlin 文件夹不存在
)
echo.

echo 🧹 第四步：验证新文件
echo ─────────────────────────────────────────────────────────────
if exist "app\src\main\java\com\chinamate\MainActivity.kt" (
    echo ✅ MainActivity.kt 存在
) else (
    echo ❌ MainActivity.kt 不存在！
)
if exist "app\src\main\java\com\chinamate\MainApplication.kt" (
    echo ✅ MainApplication.kt 存在
) else (
    echo ❌ MainApplication.kt 不存在！
)
echo.

echo ⚙️ 第五步：清理 Gradle 缓存
echo ─────────────────────────────────────────────────────────────
if exist "gradlew" (
    echo 正在清理 Gradle 缓存...
    .\gradlew clean
    echo ✅ Gradle 清理完成
) else (
    echo ❌ gradlew 不存在，请检查 android 目录
)
echo.

echo 📋 完成后请执行：
echo ─────────────────────────────────────────────────────────────
echo 1. 启动 Android 模拟器（Android Studio > Device Manager > Play）
echo 2. 运行: cd .. ^&^& npx react-native run-android
echo.

echo ╔══════════════════════════════════════════════════════════════╗
echo ║                        修复完成！                           ║
echo ╚══════════════════════════════════════════════════════════════╝
pause
