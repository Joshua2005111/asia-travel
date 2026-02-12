@echo off
echo 🔍 正在检测Java安装...

REM 检测Java安装
where java > java_path.txt 2>nul

if exist java_path.txt (
    for /f "usebackq delims=" %%i in (java_path.txt) do (
        echo ✅ 找到Java: %%i
        set JAVA_PATH=%%i
        goto :set_java
    )
) else (
    echo ❌ 未找到Java安装
    echo 请手动安装Java 17: https://adoptium.net/temurin/releases/?version=17
    pause
    exit /b 1
)

:set_java
REM 提取JAVA_HOME路径
for %%i in ("%JAVA_PATH%") do set JAVA_HOME=%%~dpi
set JAVA_HOME=%JAVA_HOME:~0,-5%

echo 📁 JAVA_HOME: %JAVA_HOME%

REM 设置环境变量
setx JAVA_HOME "%JAVA_HOME%" /M
setx Path "%JAVA_HOME%\bin;%Path%" /M

echo ✅ Java路径已设置！
echo.
echo 现在可以运行:
echo npx expo run:android
echo.
pause
