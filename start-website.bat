@echo off
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║       Vibe Coding Tutorial - 本地测试服务器              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 正在启动服务器...
echo.
echo ┌──────────────────────────────────────────────────────────┐
echo │  ✅ 服务器地址: http://localhost:8000                     │
echo └──────────────────────────────────────────────────────────┘
echo.
echo 📚 访问这些页面测试:
echo.
echo    主页:           http://localhost:8000/index.html
echo    第1部分:        http://localhost:8000/pages/part1.html
echo    第2部分:        http://localhost:8000/pages/part2.html
echo    第3部分:        http://localhost:8000/pages/part3.html
echo    第4部分:        http://localhost:8000/pages/part4.html
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 💡 提示:
echo   - 按 Ctrl+C 可以停止服务器
echo   - 修改内容后刷新浏览器即可看到变化
echo   - 如果内容加载失败，按 F12 查看浏览器控制台
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 服务器运行中...
echo.

cd website
python -m http.server 8000

pause
