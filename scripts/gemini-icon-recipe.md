# Gemini icon recipe v5 — batch call + OS-level "Copy image" (proven 17 Sep 2026, fully unattended)

Preconditions (already true when you start): Chrome window with the Gemini tab is in the FOREGROUND and the tab is visible. Do not create tabs, do not move windows, do not touch anything else. If a JS result shows vis:"hidden", run STEP 0 and retry that step; STOP only if it is still hidden after STEP 0.

Load tools once: ToolSearch `select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__browser_batch,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__navigate`
Call tabs_context_mcp once; use the tab whose URL contains gemini.google.com (currently tabId 1809796402).

## BASE (identical every time)
Generate a square 1:1 image. Flat vector isometric illustration, pure white background, no floor, no ground shadow, no platform. ONE faceless muscular man with short brown hair, red tank top, black shorts, dark grey socks, grey sneakers. EXACTLY ONE piece of gym equipment in the whole picture, the one named below. No extra barbells, no extra dumbbells, no loose plates, no racks, nothing else on the floor. Equipment frame is white and light grey with blue accents; the plates or dumbbell heads he is holding are blue with a grey steel bar. Clean minimal style, soft flat shading, no outlines, no text, 3/4 isometric camera, subject centered with white space around. Consistent fitness-app icon set.

P = BASE + " Exercise: <Name>. " + exercise line.  (No double quotes inside P. Escape nothing else.)

## STEP 0 — once at the start, and again whenever a JS result shows vis:"hidden" or zero/negative coordinates
PowerShell tool:  powershell -NoProfile -File "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\scripts\wake_display.ps1"
Expect "OK foreground=... Google Gemini ...". The monitor sleeps at night; this wakes it and brings the window forward. Then repeat the step that failed.

## Per image — exactly 3 tool calls

CALL 1  browser_batch with these 7 actions (replace TABID and PROMPT_HERE; keep everything else byte-for-byte):
[
 {"name":"navigate","input":{"url":"https://gemini.google.com/app","tabId":TABID}},
 {"name":"computer","input":{"action":"wait","duration":2,"tabId":TABID}},
 {"name":"javascript_tool","input":{"action":"javascript_exec","tabId":TABID,"text":"const P=\"PROMPT_HERE\"; const ed=document.querySelector('div.ql-editor[contenteditable=\"true\"]'); ed.focus(); const p=document.createElement('p'); p.textContent=P; ed.innerHTML=''; ed.appendChild(p); ed.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText',data:P})); await new Promise(r=>setTimeout(r,1000)); const btn=[...document.querySelectorAll('button')].find(b=>/send/i.test(b.getAttribute('aria-label')||'')); if(btn){btn.click();} ({typed:ed.innerText.length>500, sent:!!btn})"}},
 {"name":"computer","input":{"action":"wait","duration":10,"tabId":TABID}},
 {"name":"computer","input":{"action":"wait","duration":10,"tabId":TABID}},
 {"name":"computer","input":{"action":"wait","duration":10,"tabId":TABID}},
 {"name":"javascript_tool","input":{"action":"javascript_exec","tabId":TABID,"text":"const img=[...document.querySelectorAll('img')].filter(i=>i.naturalWidth>300).pop(); if(!img){'NOIMG'} else { img.scrollIntoView({block:'center'}); await new Promise(r=>setTimeout(r,500)); const r=img.getBoundingClientRect(); const uiH=window.outerHeight-window.innerHeight; ({cx:Math.round(window.screenX+r.left+r.width/2), cy:Math.round(window.screenY+uiH+r.top+r.height/2), vis:document.visibilityState}) }"}}
]
   Expect the 3rd action to return {typed:true, sent:true} and the last to return {cx:…, cy:…, vis:"visible"}.
   If the last returns NOIMG: call javascript_tool alone with the same last script after `computer wait 10`, up to 4 more times. If it still says NOIMG, log FAIL for this item and move on (Gemini probably refused).
   If sent:false: log FAIL and move on.

CALL 2  PowerShell tool (replace NAME, CX, CY with the Name and the numbers from CALL 1):
powershell -NoProfile -STA -File "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\scripts\copy_gemini_image.ps1" "NAME" CX CY
   Expect a line starting with "OK NAME.png". If it prints "ERROR no image on clipboard", run CALL 2 once more. If still ERROR, log FAIL and move on.

CALL 3  Bash: append to the log file:  echo "NAME | OK | <the OK line>" >> <logfile>   (or "| FAIL | reason")

Rules: strictly one image at a time, in order. Never screenshots. Never downloads. Never any other capture method. Do not judge image quality. If Gemini shows a quota / rate-limit / "try again later" message in the page (check with document.body.innerText if NOIMG repeats), stop and report its exact text. Final report = the log lines only.
