# FOREIGNER_APP - 删除 anonymous 文件夹
# 运行方式: 右键 > "用 PowerShell 运行"

$projectPath = "C:\Users\Joshua\.openclaw\workspace\FOREIGNER_APP\android\app\src\main\java\com"
$anonymousPath = Join-Path $projectPath "anonymous"

Write-Host "╔═══════════════════════════════════════════════════════╗"
Write-Host "║     删除 anonymous 文件夹                          ║"
Write-Host "╚═══════════════════════════════════════════════════════╝"
Write-Host ""

if (Test-Path $anonymousPath) {
    Write-Host "🗑️  找到 anonymous 文件夹，删除中..."
    Remove-Item -Recurse -Force $anonymousPath
    Write-Host "✅ 已删除: $anonymousPath"
} else {
    Write-Host "✅ anonymous 文件夹不存在"
}

Write-Host ""
Write-Host "📂 检查 java/com/ 目录内容:"
Write-Host "-----------------------------------"
Get-ChildItem $projectPath | Format-Table Name

Write-Host ""
Write-Host "✅ 完成！请重新构建项目"
Write-Host "   Build > Clean Project"
Write-Host "   Build > Rebuild Project"

Pause
