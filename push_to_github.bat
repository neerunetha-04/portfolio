@echo off
echo ========================================================
echo   Pushing Portfolio to GitHub (neerunetha-04)
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Your code has been pushed to GitHub!
    echo.
    echo Next step: Go to your repository Settings -^> Pages,
    echo and select 'main' branch to activate your live website.
    start https://github.com/neerunetha-04/portfolio/settings/pages
) else (
    echo [NOTICE] If the repository does not exist yet:
    echo 1. Open: https://github.com/new
    echo 2. Repository name: portfolio
    echo 3. Click 'Create repository'
    echo 4. Then run this script again!
    start https://github.com/new
)
echo.
pause
