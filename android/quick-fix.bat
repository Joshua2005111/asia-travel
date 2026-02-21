@echo off
chcp 65001 >nul
echo ╔═══════════════════════════════════════════════════════╗
echo ║         FOREIGNER_APP - 一键修复脚本                ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

echo 🔍 检查文件结构...
echo.

set "MAIN_DIR=%~dp0android\app\src\main"
set "JAVA_DIR=%MAIN_DIR%\java\com\chinamate"

echo 检查 kotlin 文件夹...
if exist "%MAIN_DIR%\kotlin" (
    echo 🗑️  发现 kotlin 文件夹，删除中...
    rmdir /s /q "%MAIN_DIR%\kotlin"
    echo ✅ 已删除 kotlin
) else (
    echo ✅ kotlin 已删除
)

echo.
echo 检查 anonymous 文件夹...
if exist "%MAIN_DIR%\java\com\anonymous" (
    echo 🗑️  发现 anonymous 文件夹，删除中...
    rmdir /s /q "%MAIN_DIR%\java\com\anonymous"
    echo ✅ 已删除 anonymous
) else (
    echo ✅ anonymous 已删除
)

echo.
echo 检查 Java 文件夹内容...
if exist "%JAVA_DIR%\MainActivity.kt" (
    echo ✅ MainActivity.kt 存在
) else (
    echo ❌ MainActivity.kt 不存在！
)

if exist "%JAVA_DIR%\MainApplication.kt" (
    echo ✅ MainApplication.kt 存在
) else (
    echo ❌ MainApplication.kt 不存在！
)

echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║              请手动执行以下操作                       ║
echo ╚═══════════════════════════════════════════════════════╝
echo.
echo 1. 打开 Android Studio
echo 2. 点击 Build > Clean Project
echo 3. 点击 Build > Rebuild Project
echo.
echo 或者在 Terminal 中运行：
echo   cd android
echo   .\gradlew clean
echo.

pause
