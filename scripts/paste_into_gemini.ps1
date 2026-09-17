# Sends Ctrl+V to the foreground window (the Gemini prompt box must already be clicked/focused).
# Usage: powershell -NoProfile -STA -File scripts/paste_into_gemini.ps1
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.SendKeys]::SendWait("^v")
Start-Sleep -Seconds 4
Write-Output "OK pasted"
