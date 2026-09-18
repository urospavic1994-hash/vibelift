# Frame 2 operator recipe v2 (mechanical, for a cheap operator agent) — proven 18 Sep 2026 on Barbell Bench Press + Barbell Back Squat

You make the SECOND picture of an exercise by pasting the first picture into Gemini and asking for the other end
of the movement. You do NOT judge pictures. You touch NO file except through the scripts below and your log file.
Strictly one exercise at a time, in the order given. Ignore old tab titles and old chats. Never create/close tabs.
Never screenshots (they mislead at low resolution). Never downloads. Never any other capture method.

Load tools once: ToolSearch
`select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__browser_batch,mcp__claude-in-chrome__javascript_tool,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__find`
Call tabs_context_mcp once; TABID = the tab whose URL contains gemini.google.com (else the first tab).

## STEP 0 — once at the start
1. PowerShell: `powershell -NoProfile -File "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\scripts\wake_display.ps1"`
   Expect `OK foreground=... Google Gemini ...`. ERROR → navigate TABID to https://gemini.google.com/app, retry once, else stop and report.
2. Model must be **Flash-Lite** (the other models return the picture unchanged). browser_batch:
   `[{"name":"navigate","input":{"url":"https://gemini.google.com/app","tabId":TABID}},{"name":"computer","input":{"action":"wait","duration":2,"tabId":TABID}},{"name":"find","input":{"query":"model picker button (Open mode picker)","tabId":TABID}}]`
   The find result names the current model, e.g. `button "Open mode picker, currently Flash"`. If it is NOT Flash-Lite:
   click that ref, then `find` "3.5 Flash-Lite menu item", click its ref. Do this check again only if a log says the model changed.

## PROMPT TEMPLATE (P)
P = `Generate a NEW image of this exact scene where the person is at the other end of the movement: ` + END POSITION + `. Same person, same clothes and hair, same equipment, same isometric camera angle, same flat vector style, pure white background, nothing added or removed. Square 1:1.`
END POSITION = the text after ` | ` on the exercise's line in scripts/frame2-prompts.md. No double quotes inside P.
Lines that say `SKIP hold` are never generated. Lines under HOLD are never generated.

## Per exercise — 6 tool calls

CALL 1  PowerShell: `powershell -NoProfile -STA -File "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\scripts\clip_set_image.ps1" "NAME"`
   Expect `OK clipboard holds NAME ...`. ERROR → log FAIL, next exercise.

CALL 2  browser_batch:
[
 {"name":"navigate","input":{"url":"https://gemini.google.com/app","tabId":TABID}},
 {"name":"computer","input":{"action":"wait","duration":2,"tabId":TABID}},
 {"name":"find","input":{"query":"prompt text input box","tabId":TABID}}
]
   Note the ref of the textbox (it changes every time).

CALL 3  browser_batch (replace TABID, REF, PROMPT_HERE; keep the JS byte-for-byte otherwise):
[
 {"name":"computer","input":{"action":"left_click","ref":"REF","tabId":TABID}},
 {"name":"computer","input":{"action":"key","text":"ctrl+v","tabId":TABID}},
 {"name":"computer","input":{"action":"wait","duration":3,"tabId":TABID}},
 {"name":"javascript_tool","input":{"action":"javascript_exec","tabId":TABID,"text":"const up=[...document.querySelectorAll('img')].some(i=>/^blob:/.test(i.src)); const P=\"PROMPT_HERE\"; const ed=document.querySelector('div.ql-editor[contenteditable=\"true\"]'); ed.focus(); while(ed.firstChild)ed.removeChild(ed.firstChild); const p=document.createElement('p'); p.textContent=P; ed.appendChild(p); ed.dispatchEvent(new InputEvent('input',{bubbles:true,inputType:'insertText',data:P})); await new Promise(r=>setTimeout(r,1500)); const btn=[...document.querySelectorAll('button')].find(b=>/send/i.test(b.getAttribute('aria-label')||'')); if(up&&btn){btn.click();} ({uploaded:up, typed:ed.innerText.length>150, sent:!!(up&&btn)})"}},
 {"name":"computer","input":{"action":"wait","duration":10,"tabId":TABID}},
 {"name":"computer","input":{"action":"wait","duration":10,"tabId":TABID}},
 {"name":"computer","input":{"action":"wait","duration":10,"tabId":TABID}},
 {"name":"computer","input":{"action":"wait","duration":10,"tabId":TABID}}
]
   Expect `{uploaded:true, typed:true, sent:true}`. `uploaded:false` → nothing was sent; redo CALL 1–3 once; still false → log FAIL "paste".
   (Never put more than 5 wait actions in one batch — the batch times out.)

CALL 4  browser_batch:
[
 {"name":"computer","input":{"action":"wait","duration":10,"tabId":TABID}},
 {"name":"computer","input":{"action":"wait","duration":10,"tabId":TABID}},
 {"name":"javascript_tool","input":{"action":"javascript_exec","tabId":TABID,"text":"const imgs=[...document.querySelectorAll('img')].filter(i=>i.naturalWidth>300); const uiH=window.outerHeight-window.innerHeight; if(imgs.length<2){'NOIMG '+imgs.length+' :: '+document.body.innerText.slice(-200)} else { const img=imgs[imgs.length-1]; img.scrollIntoView({block:'center'}); await new Promise(r=>setTimeout(r,800)); const r=img.getBoundingClientRect(); ({count:imgs.length, cx:Math.round(window.screenX+r.left+r.width/2), cy:Math.round(window.screenY+uiH+r.top+r.height/2), nat:img.naturalWidth}) }"}}
]
   Expect `{count:2, cx:…, cy:…, nat:1024}`. `NOIMG` → run CALL 4 again, up to 3 more times. Still NOIMG → look at the text
   after `::`; if it mentions a limit / "as soon as your limit resets" / "try again later" → STOP THE WHOLE RUN and report
   that exact text. Otherwise log FAIL "noimg", next exercise.

CALL 5  PowerShell (the `.b` after the name is REQUIRED — never run it with the bare NAME, that would overwrite frame 1):
`powershell -NoProfile -File "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\scripts\wake_display.ps1"; powershell -NoProfile -STA -File "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\scripts\copy_gemini_image.ps1" "NAME.b" CX CY; node "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\scripts\frame_diff.js" "NAME"`
   Expect `OK NAME.b.png …` and then a percentage line like ` 10.7%  NAME`.
   - `ERROR no image on clipboard` → run CALL 5 once more; still ERROR → log FAIL "copy".
   - `ERROR clipboard still holds the previous image` → log FAIL "duplicate".
   - percentage **below 1.5%** = Gemini returned the picture unchanged. Do the ECHO RETRY (below) once.

ECHO RETRY (same chat, no new paste): browser_batch with the CALL 3 javascript action only, where P =
`That is the same picture, nothing moved. Generate a NEW image of this exact scene with the person clearly at the other end of the movement: ` + END POSITION + `. Same person, same equipment, same angle, same flat style, white background. Square 1:1.`
and `up` replaced by `true` (no upload check), followed by 4 waits of 10 s. Then CALL 4 but expect `count:3` and use
`imgs[imgs.length-1]` as written. Then CALL 5. Still below 1.5% → log FAIL "echo".

LOG  Bash: `echo "NAME | OK | 10.7%" >> "<logfile>"`  or  `echo "NAME | FAIL | reason" >> "<logfile>"`
   The percentage MUST be copied from the real frame_diff.js output of CALL 5. A log line for an exercise whose CALL 1–5
   you did not actually run is forbidden. If you run out of time or budget, stop and report which exercises you did NOT do.
   Every log line is verified afterwards against the files on disk; invented lines are detected.

Three FAILs in a row → STEP 0 again; if the next one also fails, stop and report. Final report = the log lines only.
