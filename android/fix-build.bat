@echo off
chcp 65001 >nul
echo ╔══════════════════════════════════════════════════════════════╗
echo ║         FOREIGNER_APP Android 构建修复脚本                  ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

echo 📋 第一步：检查当前项目结构
echo ─────────────────────────────────────────────────────────────
dir "%~dp0android\app\src\main" 2>nul
echo.

echo.
echo ⚠️ 即将执行以下操作：
echo.
echo 1. 删除 kotlin 文件夹（保留 java）
echo 2. 清理包名冲突（统一使用 com.anonymous.chinamate）
echo 3. 修复 MainApplication.kt
echo 4. 清理 Gradle 缓存
echo.
echo 按任意键继续，或按 Ctrl+C 取消...
pause >nul

echo.
echo 🗑️ 第二步：删除重复的 kotlin 文件夹
echo ─────────────────────────────────────────────────────────────
if exist "%~dp0android\app\src\main\kotlin" (
    rmdir /s /q "%~dp0android\app\src\main\kotlin"
    echo ✅ 已删除 kotlin 文件夹
) else (
    echo ℹ️  kotlin 文件夹不存在，无需删除
)
echo.

echo.
echo 🔧 第三步：检查并修复包名冲突
echo ─────────────────────────────────────────────────────────────
if exist "%~dp0android\app\src\main\java\com\chinamate" (
    echo ❌ 发现冲突：com.chinamate 文件夹存在
    rmdir /s /q "%~dp0android\app\src\main\java\com\chinamate"
    echo ✅ 已删除 com.chinamate 文件夹
) else (
    echo ℹ️  无包名冲突
)
echo.

echo.
echo 📄 第四步：验证 MainApplication.kt
echo ─────────────────────────────────────────────────────────────
set "APP_FILE=%~dp0android\app\src\main\java\com\anonymous\chinamate\MainApplication.kt"
if exist "%APP_FILE%" (
    echo ✅ MainApplication.kt 存在
    
    echo.
    echo 检查是否需要更新 MainApplication.kt...
    
    findstr /c:"package com.anonymous.chinamate" "%APP_FILE%" >nul
    if errorlevel 1 (
        echo 🔄 更新 MainApplication.kt 包声明...
        powershell -Command "(Get-Content '%APP_FILE%') -replace 'package com.chinamate', 'package com.anonymous.chinamate' | Set-Content '%APP_FILE%'"
    ) else (
        echo ℹ️  包声明正确
    )
) else (
    echo ❌ MainApplication.kt 不存在！
    echo    期望路径: %APP_FILE%
)
echo.

echo.
echo 📄 第五步：检查 AndroidManifest.xml 包名
echo ─────────────────────────────────────────────────────────────
set "MANIFEST_FILE=%~dp0android\app\src\main\AndroidManifest.xml"
if exist "%MANIFEST_FILE%" (
    echo 当前 AndroidManifest.xml 内容：
    type "%MANIFEST_FILE%" | findstr /i "package="
    
    findstr /c:"package=\"com.anonymous.chinamate\"" "%MANIFEST_FILE%" >nul
    if errorlevel 1 (
        echo.
        echo ⚠️  AndroidManifest.xml 包名不匹配！
        echo    需要将 package 改为 com.anonymous.chinamate
        echo.
        echo    请手动编辑 AndroidManifest.xml 文件
        echo    将 package="com.chinamate" 改为 package="com.anonymous.chinamate"
    ) else (
        echo ✅ AndroidManifest.xml 包名正确
    )
) else (
    echo ❌ AndroidManifest.xml 不存在！
)
echo.

echo.
echo 🧹 第六步：清理 Gradle 缓存
echo ─────────────────────────────────────────────────────────────
cd "%~dp0android"
if exist "gradlew" (
    echo 正在清理 Gradle 缓存...
    .\gradlew clean
    echo ✅ Gradle 清理完成
) else (
    echo ❌ gradlew 不存在，请检查 android 目录
)
echo.

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                      修复完成！                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 📌 后续步骤：
echo.
echo 1. 如果 AndroidManifest.xml 需要手动修改，请执行：
echo    notepad "%MANIFEST_FILE%"
echo.
echo 2. 重新构建项目：
echo    cd ..
echo    npx react-native run-android
echo.
echo 3. 如果还有问题，检查错误日志并发送给我。
echo.

pause
