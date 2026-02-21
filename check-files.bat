@echo off
chcp 65001 >nul
echo ╔═══════════════════════════════════════════════════════╗
echo ║      FOREIGNER_APP - 快速崩溃修复                  ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

echo 🔍 检查关键文件...
echo.

set "BASE=%~dp0src"

echo 📂 stores/
if exist "%BASE%\stores\userStore.ts" (
    echo ✅ userStore.ts
) else (
    echo ❌ userStore.ts 缺失！
)

echo 📂 services/
if exist "%BASE%\services\AuthService.ts" (
    echo ✅ AuthService.ts
) else (
    echo ❌ AuthService.ts 缺失！
)

if exist "%BASE%\services\TranslationService.ts" (
    echo ✅ TranslationService.ts
) else (
    echo ⚠️ TranslationService.ts 缺失
)

echo 📂 utils/
if exist "%BASE%\utils\theme.ts" (
    echo ✅ theme.ts
) else (
    echo ❌ theme.ts 缺失！
)

if exist "%BASE%\utils\constants.ts" (
    echo ✅ constants.ts
) else (
    echo ⚠️ constants.ts 缺失
)

echo 📂 screens/
if exist "%BASE%\screens\HomeScreen.tsx" (
    echo ✅ HomeScreen.tsx
) else (
    echo ❌ HomeScreen.tsx 缺失！
)

echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║           如果有 ❌ 文件，请告诉我！                 ║
echo ╚═══════════════════════════════════════════════════════╝
echo.
echo 📋 如果文件都存在，App 崩溃可能是由于：
echo 1. Metro Bundler 没有运行
echo 2. i18n 配置问题
echo 3. 运行时 JavaScript 错误
echo.
echo 💡 请打开 Android Studio > Logcat，搜索 "FATAL"
echo    截图给我看错误信息！

pause
