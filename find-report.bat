@echo off
echo ╔═══════════════════════════════════════════════╗
echo ║  查找 problems-report.html                 ║
echo ╚═══════════════════════════════════════════════╝
echo.

echo 在 android/build 目录搜索...
dir /s /b "android\build\*.html" 2>nul

echo.
echo 或者直接在浏览器中打开：
echo file:///C:/Users/Joshua/.openclaw/workspace/FOREIGNER_APP/android/build/reports/problems/problems-report.html

pause
