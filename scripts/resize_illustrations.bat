@echo off
setlocal enabledelayedexpansion

REM ============================================================
REM  resize_illustrations.bat
REM  Resizes all images in a folder to 800x800 PNG
REM  - Aspect ratio preserved (pads with transparency, no stretch)
REM  - Existing transparency preserved
REM  - Output saved to a "resized" subfolder
REM  - Requires ImageMagick installed (magick must be on PATH)
REM ============================================================

set "INPUT_DIR=%~1"

if "%INPUT_DIR%"=="" (
    set /p "INPUT_DIR=Enter the full path to your images folder: "
)

if "%INPUT_DIR:~-1%"=="\" set "INPUT_DIR=%INPUT_DIR:~0,-1%"

if not exist "%INPUT_DIR%\" (
    echo ERROR: Folder not found: %INPUT_DIR%
    pause
    exit /b 1
)

set "OUTPUT_DIR=%INPUT_DIR%\resized"
if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

magick -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: ImageMagick not found. Make sure "magick" is on your PATH.
    pause
    exit /b 1
)

set "COUNT=0"
set "SKIPPED=0"

for %%E in (png jpg jpeg jfif webp svg gif bmp tiff tif) do (
    for %%F in ("%INPUT_DIR%\*.%%E") do (
        echo "%%F" | findstr /I "\\resized\\" >nul && goto :skip_file
        set /a COUNT+=1
        set "INFILE=%%F"
        set "OUTFILE=%OUTPUT_DIR%\%%~nF.png"
        echo [!COUNT!] %%~nxF  →  %%~nF.png
        magick "!INFILE!" -resize 800x800 -background none -gravity Center -extent 800x800 "PNG32:!OUTFILE!"
        if errorlevel 1 (
            echo    WARNING: Failed - %%~nxF
            set /a SKIPPED+=1
        )
        goto :continue_loop
        :skip_file
        :continue_loop
    )
)

echo.
echo ============================================================
echo  Done!  Processed: !COUNT!  Failed: !SKIPPED!
echo  Output: %OUTPUT_DIR%
echo ============================================================
pause
