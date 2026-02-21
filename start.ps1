$Host.UI.RawUI.WindowTitle = "AI资讯中心 - 启动脚本"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   AI资讯中心 - 一键启动脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "[信息] 检测到首次运行，正在安装依赖..." -ForegroundColor Yellow
    Write-Host ""
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[错误] 依赖安装失败，请检查Node.js是否正确安装" -ForegroundColor Red
        Read-Host "按回车键退出"
        exit 1
    }
    Write-Host ""
    Write-Host "[成功] 依赖安装完成！" -ForegroundColor Green
    Write-Host ""
}

Write-Host "[信息] 正在启动开发服务器..." -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " 网站启动后请访问: http://localhost:3000" -ForegroundColor Green
Write-Host " 按 Ctrl+C 可停止服务器" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

npm run dev
