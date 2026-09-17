# Put an exercise picture on the Windows clipboard so it can be pasted (Ctrl+V) into the Gemini prompt box.
# Usage: powershell -NoProfile -STA -File scripts/clip_set_image.ps1 "Skull Crusher"
# Looks for the full-size original first (New lustrations\_gemini_v2), falls back to the 320px app icon.
param([Parameter(Mandatory=$true)][string]$Name)
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$candidates = @(
  (Join-Path $root ("New lustrations\_gemini_v2\" + $Name + ".png")),
  (Join-Path $root ("assets\exercises\" + $Name + ".png"))
)
$src = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $src) { Write-Output ("ERROR no picture found for " + $Name); exit 1 }
$img = [System.Drawing.Image]::FromFile($src)
[System.Windows.Forms.Clipboard]::SetImage($img)
Write-Output ("OK clipboard holds " + $Name + " " + $img.Width + "x" + $img.Height)
