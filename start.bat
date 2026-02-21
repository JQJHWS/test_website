@echo off
chcp 65001 >nul
title AI资讯中心 - 启动脚本

echo.
echo ========================================
echo    AI资讯中心 - 一键启动脚本
echo ========================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo [信息] 检测到首次运行，正在安装依赖...
    echo.
    call npm install
    if errorlevel 1 (
        echo [错误] 依赖安装失败，请检查Node.js是否正确安装
        pause
        exit /b 1
    )
    echo.
    echo [成功] 依赖安装完成！
    echo.
)

echo [信息] 正在启动开发服务器...
echo.
echo ========================================
echo  网站启动后请访问: http://localhost:3000
echo  按 Ctrl+C 可停止服务器
echo ========================================
echo.

call npm run dev

pause
