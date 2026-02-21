@echo off
chcp 65001 >nul
echo ========================================
echo   清理重复的 Android 源文件
echo ========================================
echo.

echo ⚠️  以下目录将被删除：
echo.
echo 1. kotlin/com/anonymous/chinamate/
echo 2. kotlin/com/chinamate/
echo 3. java/com/anonymous/chinamate/
echo.
echo ✅ 将保留：kotlin/com.anonymous.chinamate
echo.

set /p confirm="确认删除？(y/n): "
if /i "%confirm%" neq "y" (
    echo 已取消。
    pause
    exit /b 0
)

echo.
echo 🗑️  删除中...
echo.

rmdir /s /q "kotlin" 2>nul
echo ✅ 已删除 kotlin/ 目录

echo.
echo ✅ 清理完成！
echo.
echo 现在只保留：
echo   - kotlin/com.anonymous.chinamate/
echo.
echo 请重新构建项目：
echo   Build > Clean Project
echo   Build > Rebuild Project
echo.

pause
