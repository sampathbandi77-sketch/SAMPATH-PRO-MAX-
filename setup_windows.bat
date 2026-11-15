@echo off
cd /d "%~dp0"
echo Setting up SAMPATH PRO MAX...
py -3 -m venv backend\.venv
if errorlevel 1 (
  echo Python 3 launcher not found. Install Python 3.11 or newer.
  pause
  exit /b 1
)
call backend\.venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r backend\requirements.txt
if not exist backend\.env copy backend\.env.example backend\.env
echo.
echo Setup complete. Run start_windows.bat
pause
