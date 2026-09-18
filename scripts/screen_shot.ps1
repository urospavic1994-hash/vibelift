# Saves a screenshot of the whole virtual screen to the given path (for checking where things really are).
# Usage: powershell -NoProfile -STA -File scripts/screen_shot.ps1 "C:\path\out.png"
param([Parameter(Mandatory=$true)][string]$Out)
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$b = [System.Windows.Forms.SystemInformation]::VirtualScreen
$bmp = New-Object System.Drawing.Bitmap $b.Width, $b.Height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($b.Left, $b.Top, 0, 0, $bmp.Size)
$g.Dispose()
$bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output ("OK " + $b.Left + "," + $b.Top + " " + $b.Width + "x" + $b.Height)
