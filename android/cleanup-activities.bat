@echo off
echo 查找所有 MainActivity 文件...
echo.

echo === 查找 MainActivity.kt ===
dir /s /b "android\app\src\main\java\**\MainActivity.kt" 2>nul
echo.

echo === 查找 MainActivity.java ===
dir /s /b "android\app\src\main\java\**\MainActivity.java" 2>nul
echo.

echo === 检查 ReactActivity 相关文件 ===
dir /s /b "android\app\src\main\java\**\ReactActivity*" 2>nul
echo.

echo 完成！请把输出结果发送给我。
pause
