# Right-click the Gemini image at screen (X,Y), pick "Copy image" (accelerator y), save clipboard as the icon.
# Usage: powershell -NoProfile -STA -File scripts/copy_gemini_image.ps1 "Dead Bug" 770 803
param([Parameter(Mandatory=$true)][string]$Name, [int]$X = 770, [int]$Y = 803)
Add-Type @"
using System; using System.Runtime.InteropServices;
public class MouseK { [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y); [DllImport("user32.dll")] public static extern void mouse_event(uint f, uint dx, uint dy, uint d, UIntPtr e); public static void RightClick(int x,int y){ SetCursorPos(x,y); System.Threading.Thread.Sleep(150); mouse_event(0x0008,0,0,0,UIntPtr.Zero); System.Threading.Thread.Sleep(80); mouse_event(0x0010,0,0,0,UIntPtr.Zero);} }
"@
Add-Type -AssemblyName System.Windows.Forms
[System.Windows.Forms.Clipboard]::Clear()
[MouseK]::RightClick($X, $Y)
Start-Sleep -Milliseconds 900
[System.Windows.Forms.SendKeys]::SendWait("y")
Start-Sleep -Milliseconds 1000
& powershell -NoProfile -STA -File (Join-Path $PSScriptRoot "save_clip_image.ps1") $Name
