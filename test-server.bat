@echo off
echo ========================================
echo  Vibe Coding Tutorial - Test Server
echo ========================================
echo.
echo Starting local server at http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
echo Try these URLs:
echo - Homepage: http://localhost:8000/index.html
echo - Part 1:   http://localhost:8000/pages/part1.html
echo - Part 2:   http://localhost:8000/pages/part2.html
echo - Part 3:   http://localhost:8000/pages/part3.html
echo - Part 4:   http://localhost:8000/pages/part4.html
echo.
echo ========================================
echo.

cd website
python -m http.server 8000
