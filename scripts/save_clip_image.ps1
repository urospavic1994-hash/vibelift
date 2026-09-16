# Save the image currently on the Windows clipboard as assets/exercises/<Name>.png (320x320, white bg).
# Usage: powershell -File scripts/save_clip_image.ps1 "Dead Bug"
param([Parameter(Mandatory=$true)][string]$Name)
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$img = [System.Windows.Forms.Clipboard]::GetImage()
if ($null -eq $img) { Write-Output "ERROR no image on clipboard"; exit 1 }
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
# Duplicate guard: if this is the same bitmap we saved last time, the Copy image click failed.
$ms = New-Object System.IO.MemoryStream
$img.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$hash = [System.BitConverter]::ToString([System.Security.Cryptography.MD5]::Create().ComputeHash($ms.ToArray()))
$hashFile = Join-Path $PSScriptRoot ".last_clip_hash"
if ((Test-Path $hashFile) -and ((Get-Content $hashFile -Raw).Trim() -eq $hash)) { Write-Output "ERROR clipboard still holds the previous image (Copy image failed), nothing saved"; exit 1 }
Set-Content -Path $hashFile -Value $hash
$arch = Join-Path $root "New lustrations\_gemini_v2"
New-Item -ItemType Directory -Force $arch | Out-Null
$img.Save((Join-Path $arch ($Name + ".png")), [System.Drawing.Imaging.ImageFormat]::Png)
$side = [Math]::Max($img.Width, $img.Height)
$sq = New-Object System.Drawing.Bitmap $side, $side
$g = [System.Drawing.Graphics]::FromImage($sq)
$g.Clear([System.Drawing.Color]::White)
$g.DrawImage($img, [int](($side - $img.Width)/2), [int](($side - $img.Height)/2), $img.Width, $img.Height)
$g.Dispose()
$small = New-Object System.Drawing.Bitmap 320, 320
$g2 = [System.Drawing.Graphics]::FromImage($small)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g2.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g2.DrawImage($sq, 0, 0, 320, 320)
$g2.Dispose()
$dst = Join-Path $root ("assets\exercises\" + $Name + ".png")
$small.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$kb = [int]((Get-Item $dst).Length / 1KB)
Write-Output ("OK " + $Name + ".png " + $kb + "KB from " + $img.Width + "x" + $img.Height)
[System.Windows.Forms.Clipboard]::Clear()
