# Wake a sleeping display and bring the Gemini Chrome window to the foreground.
# Usage: powershell -NoProfile -File scripts/wake_display.ps1
# Looks through EVERY top-level window (Chrome reports only one "main" window per process,
# so a second Chrome window, e.g. Netflix, used to hide the Gemini one).
Add-Type @"
using System; using System.Runtime.InteropServices; using System.Text; using System.Collections.Generic;
public class WakeW {
  [DllImport("user32.dll")] public static extern void mouse_event(uint f, int dx, int dy, uint d, UIntPtr e);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int n);
  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] public static extern int GetWindowText(IntPtr h, StringBuilder s, int n);
  [DllImport("user32.dll")] public static extern void keybd_event(byte vk, byte scan, uint flags, UIntPtr extra);
  public delegate bool EnumProc(IntPtr h, IntPtr l);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc cb, IntPtr l);
  public static IntPtr Find(string part) {
    IntPtr found = IntPtr.Zero;
    EnumWindows(delegate(IntPtr h, IntPtr l) {
      if (!IsWindowVisible(h)) return true;
      StringBuilder sb = new StringBuilder(512); GetWindowText(h, sb, 512);
      if (sb.ToString().Contains(part)) { found = h; return false; }
      return true;
    }, IntPtr.Zero);
    return found;
  }
}
"@
[WakeW]::mouse_event(0x0001, 3, 0, 0, [UIntPtr]::Zero); Start-Sleep -Milliseconds 300
[WakeW]::mouse_event(0x0001, -3, 0, 0, [UIntPtr]::Zero); Start-Sleep -Seconds 2
$h = [WakeW]::Find("Google Gemini")
if ($h -eq [IntPtr]::Zero) { Write-Output "ERROR no Chrome window with Gemini in the title"; exit 1 }
if ([WakeW]::IsIconic($h)) { [void][WakeW]::ShowWindow($h, 9) }
# Tap Alt so Windows allows this process to change the foreground window.
[WakeW]::keybd_event(0x12, 0, 0, [UIntPtr]::Zero); [WakeW]::keybd_event(0x12, 0, 2, [UIntPtr]::Zero)
[void][WakeW]::SetForegroundWindow($h)
Start-Sleep -Milliseconds 800
$f = [WakeW]::GetForegroundWindow(); $sb = New-Object System.Text.StringBuilder 256; [void][WakeW]::GetWindowText($f, $sb, 256)
Write-Output ("OK foreground=" + $sb.ToString())
