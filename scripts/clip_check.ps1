# Reports what the Windows clipboard holds. Usage: powershell -NoProfile -STA -File scripts/clip_check.ps1
Add-Type -AssemblyName System.Windows.Forms
$img = [System.Windows.Forms.Clipboard]::ContainsImage()
$txt = [System.Windows.Forms.Clipboard]::ContainsText()
$fmt = ([System.Windows.Forms.Clipboard]::GetDataObject().GetFormats() -join ',')
Write-Output ("image=" + $img + " text=" + $txt + " formats=" + $fmt)
