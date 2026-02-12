# Java路径自动检测脚本
Write-Host "🔍 正在检测Java安装..."

# 检查常见Java路径
$javaPaths = @(
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.11.9-hotspot",
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.10.7-hotspot",
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.9.12-hotspot",
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.9.11-hotspot",
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.9.9-hotspot",
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.8.101-hotspot",
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.8.1-hotspot",
    "C:\Program Files\Java\jdk-17",
    "C:\Program Files\Java\jdk-25",
    "C:\Program Files\Java\jdk-21",
    "C:\Program Files\Microsoft\jdk-17"
)

$found = $false

foreach ($path in $javaPaths) {
    $javaExe = Join-Path $path "bin\java.exe"
    if (Test-Path $javaExe) {
        Write-Host "✅ 找到Java: $path" -ForegroundColor Green
        
        # 设置环境变量
        $env:JAVA_HOME = $path
        $env:Path = "$path\bin;" + $env:Path
        
        Write-Host "✅ 已设置 JAVA_HOME=$path" -ForegroundColor Green
        Write-Host ""
        Write-Host "📱 现在运行: npx expo run:android" -ForegroundColor Cyan
        $found = $true
        break
    }
}

if (-not $found) {
    Write-Host "❌ 未找到Java 17" -ForegroundColor Red
    Write-Host ""
    Write-Host "请手动安装Java 17:" -ForegroundColor Yellow
    Write-Host "https://adoptium.net/temurin/releases/?version=17" -ForegroundColor Cyan
}
