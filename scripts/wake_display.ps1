# Wake a sleeping display and bring the Gemini Chrome window to the foreground.
# Usage: powershell -NoProfile -File scripts/wake_display.ps1
Add-Type @"
using System; using System.Runtime.InteropServices; using System.Text;
public class WakeW { [DllImport("user32.dll")] public static extern void mouse_event(uint f, int dx, int dy, uint d, UIntPtr e); [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h); [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int n); [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow(); [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr h, StringBuilder s, int n); }
"@
[WakeW]::mouse_event(0x0001, 3, 0, 0, [UIntPtr]::Zero); Start-Sleep -Milliseconds 300
[WakeW]::mouse_event(0x0001, -3, 0, 0, [UIntPtr]::Zero); Start-Sleep -Seconds 2
$p = Get-Process chrome -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -like '*Google Gemini*' } | Select-Object -First 1
if ($null -eq $p) { Write-Output "ERROR no Chrome window with Gemini in the title"; exit 1 }
[void][WakeW]::ShowWindow($p.MainWindowHandle, 9)
[void][WakeW]::SetForegroundWindow($p.MainWindowHandle)
Start-Sleep -Milliseconds 800
$h = [WakeW]::GetForegroundWindow(); $sb = New-Object System.Text.StringBuilder 256; [void][WakeW]::GetWindowText($h, $sb, 256)
Write-Output ("OK foreground=" + $sb.ToString())
