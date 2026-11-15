@echo off
cd /d "%~dp0"
if not exist backend\.venv\Scripts\python.exe (
  echo Run setup_windows.bat first.
  pause
  exit /b 1
)
cd backend
call .venv\Scripts\activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
pause
