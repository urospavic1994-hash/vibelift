# Partial Exercise + Resume — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let an exercise be paused mid-way and resumed later in the same workout, with a visible "in progress" badge, and stop logged sets from being lost after the phone backgrounds the tab.

**Architecture:** Each entry in `current.exercises` gains a `status` of `'partial'` or `'done'`. Every completed set is written into `current` immediately (which already auto-saves to `localStorage` key `fittrack_current`), replacing the old per-exercise `fittrack_log_state` scratch record that caused the data loss. Group screens read two derived lists (`doneIds`, `partialMap`) to render checkmark vs badge.

**Tech Stack:** Single-file React 18 app via CDN + Babel standalone. No build step, no test runner. The only file touched is `index.html` (repo root — never `website/index.html`). Verification is manual in a browser.

**Testing note:** There is no automated test harness in this project and adding one is out of scope (Uroš avoids installs; the app is one CDN-loaded HTML file). Each task therefore ends with a concrete manual browser check and a commit. Open the app for testing by double-clicking `C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\index.html` (loads React/assets fine over `file://`; needs internet for the CDN). Use Chrome DevTools → Application → Local Storage to inspect `fittrack_current`.

**Deployment note:** After all tasks pass, deploy per project rule — commit root `index.html` and `git push origin main`; Vercel auto-deploys https://vibelift.vercel.app in ~30s.

---

## File Map

- `index.html` (root) — the entire app. All edits here. Components touched:
  - `App` (~line 3068) — state model, derived `doneIds`/`partialMap`, `savePartial`, prop wiring.
  - `LogScreen` (~line 2408) — save each set up to `App`, resume from saved entry, remove `fittrack_log_state`, pause/finish buttons.
  - `GroupDetailScreen` (~line 2304) — "in progress" badge per exercise row, finish bar.
  - `GroupSelectScreen` (~line 2254) — partial count in card text, finish bar.

---

## Task 0: Safety backup

**Files:**
- Create: `index.backup-2026-06-11.html` (copy of root `index.html`)

- [ ] **Step 1: Make a timestamped backup of the file we are about to change**

```powershell
Copy-Item "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\index.html" "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\index.backup-2026-06-11.html"
```

- [ ] **Step 2: Confirm the backup exists**

```powershell
Test-Path "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\index.backup-2026-06-11.html"
```
Expected: `True`

---

## Task 1: App-level partial state model

**Files:**
- Modify: `index.html` — `App` component (~3121, ~3150, ~3193, ~3197, ~3200)

- [ ] **Step 1: Add `status: 'done'` when an exercise is marked complete**

Find:

```javascript
  function completeExercise(ex) {
    setCurrent(prev => ({ ...prev, exercises: [...prev.exercises.filter(e => e.id !== ex.id), ex] }));
    setActiveEx(null);
    setScreen('group-detail');
    setExerciseDoneSheet({ exerciseName: ex.name, group: ex.group });
  }
```

Replace with:

```javascript
  function completeExercise(ex) {
    setCurrent(prev => ({ ...prev, exercises: [...prev.exercises.filter(e => e.id !== ex.id), { ...ex, status: 'done' }] }));
    setActiveEx(null);
    setScreen('group-detail');
    setExerciseDoneSheet({ exerciseName: ex.name, group: ex.group });
  }

  function savePartial(ex) {
    setCurrent(prev => {
      const base = prev || { date: todayISO(), exercises: [] };
      return { ...base, exercises: [...base.exercises.filter(e => e.id !== ex.id), { ...ex, status: 'partial' }] };
    });
  }
```

- [ ] **Step 2: Replace `completedIds` with `doneIds` + `partialMap`**

Find:

```javascript
  const completedIds = ((current && current.exercises) ? current.exercises : []).map(e => e.id);
```

Replace with:

```javascript
  const exEntries = (current && current.exercises) ? current.exercises : [];
  const doneIds = exEntries.filter(e => e.status !== 'partial').map(e => e.id);
  const partialMap = {};
  exEntries.forEach(e => { if (e.status === 'partial') partialMap[e.id] = e.sets.length; });
```

- [ ] **Step 3: Pass `doneIds` + `partialMap` to the group screens**

Find:

```javascript
        <GroupSelectScreen onBack={backFromGroupSelect} onSelectGroup={selectGroup} onFinish={finishWorkout} completedIds={completedIds} allExercises={allExercises} />
```

Replace with:

```javascript
        <GroupSelectScreen onBack={backFromGroupSelect} onSelectGroup={selectGroup} onFinish={finishWorkout} completedIds={doneIds} partialMap={partialMap} allExercises={allExercises} />
```

Find:

```javascript
        <GroupDetailScreen group={activeGroup} onBack={backFromGroupDetail} onPick={pickExercise} onFinish={finishWorkout} completedIds={completedIds} history={history} allExercises={allExercises} />
```

Replace with:

```javascript
        <GroupDetailScreen group={activeGroup} onBack={backFromGroupDetail} onPick={pickExercise} onFinish={finishWorkout} completedIds={doneIds} partialMap={partialMap} history={history} allExercises={allExercises} />
```

- [ ] **Step 4: Pass `savedEntry` + `onSetLogged` to LogScreen**

Find:

```javascript
      {!splash && screen === 'log' && activeEx && (
        <LogScreen exercise={activeEx} onBack={backFromLog} onComplete={completeExercise} history={history} weightUnit={weightUnit} />
      )}
```

Replace with:

```javascript
      {!splash && screen === 'log' && activeEx && (
        <LogScreen
          exercise={activeEx}
          savedEntry={exEntries.find(e => e.id === activeEx.id) || null}
          onBack={backFromLog}
          onComplete={completeExercise}
          onSetLogged={savePartial}
          history={history}
          weightUnit={weightUnit}
        />
      )}
```

- [ ] **Step 5: Verify the app still loads and a normal workout still works**

Open `index.html` in Chrome. Start a workout, log one exercise fully, hit "Mark Exercise Complete". Expected: returns to group detail with the green checkmark exactly as before (no visible change yet — this task only rewires data). Open DevTools → Application → Local Storage → check `fittrack_current`: the completed exercise object now has `"status":"done"`.

- [ ] **Step 6: Commit**

```bash
git -C "C:/Users/UrosPcSoba/Desktop/Claude/VibeLift" add index.html
git -C "C:/Users/UrosPcSoba/Desktop/Claude/VibeLift" commit -m "Add partial/done status model to workout state"
```

---

## Task 2: LogScreen saves each set + resumes (removes fittrack_log_state)

**Files:**
- Modify: `index.html` — `LogScreen` (~2408 signature, ~2443 restore effect, ~2463 save effect, ~2478 completeSet, ~2503 finish/handleBack)

- [ ] **Step 1: Add the two new props to the LogScreen signature**

Find:

```javascript
function LogScreen({ exercise, onBack, onComplete, history, weightUnit = 'kg' }) {
```

Replace with:

```javascript
function LogScreen({ exercise, savedEntry, onBack, onComplete, onSetLogged, history, weightUnit = 'kg' }) {
```

- [ ] **Step 2: Replace the `fittrack_log_state` restore effect with a `savedEntry` restore**

Find:

```javascript
  // Restore in-progress log session if user left the app mid-exercise
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('fittrack_log_state') || 'null');
      if (saved && saved.exerciseId === exercise.id) {
        setTotalSets(saved.totalSets);
        setWarmup(saved.warmup);
        setCurrentSet(saved.currentSet);
        setDoneSets(saved.doneSets);
        setWeight(saved.weight);
        setReps(saved.reps);
        setWeightType(saved.weightType);
        setPlatesPerSide(saved.platesPerSide);
        setAddBothSides(saved.addBothSides);
        setBarType(saved.barType || 'straight');
        setAllDone(saved.allDone || false);
      }
    } catch {}
  }, []);
```

Replace with:

```javascript
  // Resume an in-progress (or previously logged) exercise so the user picks up where they left off
  useEffect(() => {
    if (savedEntry && savedEntry.sets && savedEntry.sets.length > 0) {
      const planned = savedEntry.totalSets || Math.max(savedEntry.sets.length, 3);
      setDoneSets(savedEntry.sets);
      setCurrentSet(savedEntry.sets.length + 1);
      setTotalSets(planned);
      setWarmup(savedEntry.warmup || 'done');
      setWeightType(savedEntry.weightType || null);
      const last = savedEntry.sets[savedEntry.sets.length - 1];
      if (last && !last.bw) setWeight(String(last.weight));
      if (last) setReps(String(last.reps));
      if (savedEntry.sets.length >= planned) setAllDone(true);
    }
  }, []);
```

- [ ] **Step 3: Delete the old `fittrack_log_state` save effect**

Find and delete this entire block:

```javascript
  // Save log state to localStorage on every state change so we can resume if app is suspended
  useEffect(() => {
    localStorage.setItem('fittrack_log_state', JSON.stringify({
      exerciseId: exercise.id, totalSets, warmup, currentSet, doneSets,
      weight, reps, weightType, platesPerSide, addBothSides, barType, allDone
    }));
  }, [totalSets, warmup, currentSet, doneSets, weight, reps, weightType, platesPerSide, addBothSides, barType, allDone]);
```

- [ ] **Step 4: Rewrite `completeSet` to push every set up to App immediately**

Find:

```javascript
  function completeSet() {
    if (weightType === 'bodyweight') {
      if (!reps || parseInt(reps) < 1) return;
      const s = { setNum: currentSet, weight: 0, reps: parseInt(reps), bw: true };
      const next = [...doneSets, s];
      setDoneSets(next);
      if (currentSet >= totalSets) setAllDone(true);
      else setCurrentSet(currentSet + 1);
    } else if (weightType === 'barbell') {
      if (!reps) return;
      const s = { setNum: currentSet, weight: totalBarbellWeight, reps: parseInt(reps) };
      const next = [...doneSets, s];
      setDoneSets(next);
      if (currentSet >= totalSets) setAllDone(true);
      else setCurrentSet(currentSet + 1);
    } else {
      if (!weight || !reps) return;
      const s = { setNum: currentSet, weight: parseFloat(weight), reps: parseInt(reps) };
      const next = [...doneSets, s];
      setDoneSets(next);
      if (currentSet >= totalSets) setAllDone(true);
      else setCurrentSet(currentSet + 1);
    }
  }
```

Replace with:

```javascript
  function completeSet() {
    let s;
    if (weightType === 'bodyweight') {
      if (!reps || parseInt(reps) < 1) return;
      s = { setNum: currentSet, weight: 0, reps: parseInt(reps), bw: true };
    } else if (weightType === 'barbell') {
      if (!reps) return;
      s = { setNum: currentSet, weight: totalBarbellWeight, reps: parseInt(reps) };
    } else {
      if (!weight || !reps) return;
      s = { setNum: currentSet, weight: parseFloat(weight), reps: parseInt(reps) };
    }
    const next = [...doneSets, s];
    setDoneSets(next);
    if (currentSet >= totalSets) setAllDone(true);
    else setCurrentSet(currentSet + 1);
    onSetLogged({ ...exercise, sets: next, totalSets, weightType, warmup });
  }
```

- [ ] **Step 5: Simplify `finish` and `handleBack` (no more `fittrack_log_state`)**

Find:

```javascript
  function finish() { localStorage.removeItem('fittrack_log_state'); onComplete({ ...exercise, sets: doneSets }); }
  function handleBack() { localStorage.removeItem('fittrack_log_state'); onBack(); }
```

Replace with:

```javascript
  function finish() { onComplete({ ...exercise, sets: doneSets, totalSets, weightType, warmup }); }
  function handleBack() { onBack(); }
```

- [ ] **Step 6: Verify set-by-set persistence and resume**

Open `index.html` in Chrome.
1. Start a workout → pick Chest → Barbell Bench Press. Log 2 sets (do NOT mark complete).
2. DevTools → Application → Local Storage → `fittrack_current`: confirm the exercise is present with `"status":"partial"` and `sets` length 2 immediately after the 2nd set (before leaving the screen).
3. Press the top-left back arrow (←). You return to the group detail. Reopen Barbell Bench Press.
Expected: the 2 sets are already shown under "Completed Sets", and the input is ready for Set 3 (weight/reps prefilled from set 2).
4. Simulate the 5-minute kill: with the partial exercise NOT marked complete, press F5 to fully reload the page (this reloads React from scratch, same as the OS killing the tab). After the splash, the "Stepping away?" modal appears → tap "Keep Going". Navigate Chest → Barbell Bench Press.
Expected: the 2 sets are still there. Nothing lost.

- [ ] **Step 7: Commit**

```bash
git -C "C:/Users/UrosPcSoba/Desktop/Claude/VibeLift" add index.html
git -C "C:/Users/UrosPcSoba/Desktop/Claude/VibeLift" commit -m "Save each set to workout immediately; resume from saved entry"
```

---

## Task 3: Pause / Finish Exercise buttons

**Files:**
- Modify: `index.html` — LogScreen action bar (~2828)

- [ ] **Step 1: Replace the single "Stop Early & Save" button with Pause + Finish Exercise**

Find:

```javascript
        {!inWarmup && !allDone && doneSets.length > 0 && (
          <button className="btn-outline" onClick={finish}>Stop Early &amp; Save</button>
        )}
```

Replace with:

```javascript
        {!inWarmup && !allDone && doneSets.length > 0 && (
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn-outline" style={{ flex:1 }} onClick={onBack}>Pause</button>
            <button className="btn-outline" style={{ flex:1 }} onClick={finish}>Finish Exercise</button>
          </div>
        )}
```

- [ ] **Step 2: Verify both buttons**

Open `index.html`. Start an exercise, log 1 set. Two buttons appear below "Complete Set".
- Tap **Pause** → returns to group detail; reopen the exercise → set is still there, status stays partial (check `fittrack_current`: `"status":"partial"`).
- Log another set, tap **Finish Exercise** → "Nice work!" sheet appears; the exercise now shows the green checkmark; `fittrack_current` shows `"status":"done"`.

- [ ] **Step 3: Commit**

```bash
git -C "C:/Users/UrosPcSoba/Desktop/Claude/VibeLift" add index.html
git -C "C:/Users/UrosPcSoba/Desktop/Claude/VibeLift" commit -m "Add Pause and Finish Exercise actions to log screen"
```

---

## Task 4: "In progress" badge on the group screens

**Files:**
- Modify: `index.html` — `GroupDetailScreen` (~2304 signature, ~2308, ~2339 rows, ~2374 finish bar) and `GroupSelectScreen` (~2254 signature, ~2270, ~2284, ~2290 finish bar)

- [ ] **Step 1: Accept `partialMap` and compute the logged total in GroupDetailScreen**

Find:

```javascript
function GroupDetailScreen({ group, onBack, onPick, onFinish, completedIds, history, allExercises }) {
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const meta = GROUP_META[group];
  const exs  = (allExercises || DB).filter(e => e.group === group);
```

Replace with:

```javascript
function GroupDetailScreen({ group, onBack, onPick, onFinish, completedIds, partialMap = {}, history, allExercises }) {
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const meta = GROUP_META[group];
  const exs  = (allExercises || DB).filter(e => e.group === group);
  const totalLogged = completedIds.length + Object.keys(partialMap).length;
```

- [ ] **Step 2: Render the badge in each exercise row**

Find:

```javascript
        {exs.map(ex => {
          const done = completedIds.includes(ex.id);
          const pb   = getPersonalBest(history, ex.id);
          return (
            <div key={ex.id} className={`ex-row-card ${done ? 'done-row' : ''}`} onClick={() => onPick(ex)}>
              <div className="ex-row-icon">
                <ExIcon id={ex.id} size={28} color={done ? '#0daa74' : meta.color} img={ex.img || null} />
              </div>
              <div className="ex-row-info">
                <div className="ex-row-name">{ex.name}</div>
                {pb > 0 && <div className="ex-row-pb">Best: {pb}</div>}
              </div>
              {done && <div className="ex-row-check">✓</div>}
            </div>
          );
        })}
```

Replace with:

```javascript
        {exs.map(ex => {
          const done = completedIds.includes(ex.id);
          const partialSets = partialMap[ex.id] || 0;
          const pb   = getPersonalBest(history, ex.id);
          return (
            <div key={ex.id} className={`ex-row-card ${done ? 'done-row' : ''}`} onClick={() => onPick(ex)}>
              <div className="ex-row-icon">
                <ExIcon id={ex.id} size={28} color={done ? '#0daa74' : meta.color} img={ex.img || null} />
              </div>
              <div className="ex-row-info">
                <div className="ex-row-name">{ex.name}</div>
                {pb > 0 && <div className="ex-row-pb">Best: {pb}</div>}
              </div>
              {done && <div className="ex-row-check">✓</div>}
              {!done && partialSets > 0 && (
                <div style={{ fontFamily:'var(--fb)', fontSize:11, fontWeight:800, color:'#121508', background:'var(--pink)', padding:'4px 9px', borderRadius:20, display:'flex', alignItems:'center', gap:5, whiteSpace:'nowrap', flexShrink:0 }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'#121508' }} />
                  {partialSets} {partialSets === 1 ? 'set' : 'sets'} · in progress
                </div>
              )}
            </div>
          );
        })}
```

- [ ] **Step 3: Show the finish bar whenever anything is logged (done or partial)**

Find:

```javascript
      {completedIds.length > 0 && (
        <div className="finish-bar">
          <button className="btn-pink" onClick={onFinish}>
            Finish Workout — {completedIds.length} done
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   PLATE DATA
```

Replace with:

```javascript
      {totalLogged > 0 && (
        <div className="finish-bar">
          <button className="btn-pink" onClick={onFinish}>Finish Workout</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   PLATE DATA
```

- [ ] **Step 4: Accept `partialMap` and compute logged total in GroupSelectScreen**

Find:

```javascript
function GroupSelectScreen({ onBack, onSelectGroup, onFinish, completedIds, allExercises }) {
  const groups = Object.keys(GROUP_META);
  const exList = allExercises || DB;
```

Replace with:

```javascript
function GroupSelectScreen({ onBack, onSelectGroup, onFinish, completedIds, partialMap = {}, allExercises }) {
  const groups = Object.keys(GROUP_META);
  const exList = allExercises || DB;
  const totalLogged = completedIds.length + Object.keys(partialMap).length;
```

- [ ] **Step 5: Add an in-progress count to each muscle-group card**

Find:

```javascript
          const exs  = exList.filter(e => e.group === grp);
          const doneCnt = exs.filter(e => completedIds.includes(e.id)).length;
```

Replace with:

```javascript
          const exs  = exList.filter(e => e.group === grp);
          const doneCnt = exs.filter(e => completedIds.includes(e.id)).length;
          const partCnt = exs.filter(e => partialMap[e.id]).length;
```

Find:

```javascript
                <div className="grp-card-count">{exs.length} exercises{doneCnt > 0 ? ` · ${doneCnt} completed` : ''}</div>
```

Replace with:

```javascript
                <div className="grp-card-count">{exs.length} exercises{doneCnt > 0 ? ` · ${doneCnt} completed` : ''}{partCnt > 0 ? ` · ${partCnt} in progress` : ''}</div>
```

- [ ] **Step 6: Show the GroupSelect finish bar whenever anything is logged**

Find:

```javascript
      {completedIds.length > 0 && (
        <div className="finish-bar">
          <button className="btn-pink" onClick={onFinish}>
            Finish Workout — {completedIds.length} exercise{completedIds.length !== 1 ? 's' : ''} done
          </button>
        </div>
      )}
```

Replace with:

```javascript
      {totalLogged > 0 && (
        <div className="finish-bar">
          <button className="btn-pink" onClick={onFinish}>Finish Workout</button>
        </div>
      )}
```

- [ ] **Step 7: Verify the badge end-to-end**

Open `index.html`.
1. Start workout → Chest → Barbell Bench Press → log 2 sets → tap **Pause**.
2. On the Chest exercise list: Barbell Bench Press row shows a neon-green pill **"2 sets · in progress"** (no checkmark).
3. Back to muscle-group select: the Chest card text reads "... · 1 in progress". The "Finish Workout" bar is visible even though nothing is marked done.
4. Reopen Barbell Bench Press, log set 3, tap **Finish Exercise** → row now shows the green checkmark and the badge is gone.

- [ ] **Step 8: Commit**

```bash
git -C "C:/Users/UrosPcSoba/Desktop/Claude/VibeLift" add index.html
git -C "C:/Users/UrosPcSoba/Desktop/Claude/VibeLift" commit -m "Show in-progress badge and count on group screens"
```

---

## Task 5: Full regression test + deploy

**Files:**
- Modify: none (verification + deploy only)

- [ ] **Step 1: Run the full manual checklist in Chrome**

1. **Fresh full exercise:** log all 3 sets → "Mark Exercise Complete" → checkmark appears. ✅
2. **Pause + resume:** log 1 set → Pause → reopen → set present, ready for set 2. ✅
3. **Finish early:** log 1 set → Finish Exercise → marked done with 1 set. ✅
4. **Tab-kill survival:** log 2 sets, do NOT mark complete → press F5 to reload → Keep Going → reopen exercise → sets still there. ✅
5. **Bodyweight path:** pick a bodyweight exercise (e.g. Push-Up) → log a set → Pause → reopen → "BW × reps" set present, reps prefilled. ✅
6. **Finish whole workout with a partial left open:** leave one exercise in progress, tap "Finish Workout" → Summary screen counts the partial exercise's sets in the totals; History shows them. ✅
7. **Light mode unaffected:** toggle to light mode in Settings, repeat step 2 quickly — badge still readable (dark text on neon green). ✅

- [ ] **Step 2: Remove the backup file (changes are verified and committed)**

```powershell
Remove-Item "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift\index.backup-2026-06-11.html"
```

- [ ] **Step 3: Push to deploy**

```bash
git -C "C:/Users/UrosPcSoba/Desktop/Claude/VibeLift" push origin main
```
Expected: Vercel auto-deploys https://vibelift.vercel.app within ~30s. Open it on the phone and re-run checklist steps 2 and 4 on the real device.

---

## Self-Review notes

- **Spec coverage:** Request 1 (finish early / move on) → Task 3 Pause + Task 2 back-as-pause. Request 2 (5-min loss) → Task 2 (per-set save to `fittrack_current`, `fittrack_log_state` removed). Request 3 (partial indicator) → Task 4 badge. End-of-workout counting → Task 5 step 6 + existing `finishWorkout`.
- **Naming consistency:** `savedEntry`, `onSetLogged`, `savePartial`, `doneIds`, `partialMap`, `totalLogged`, `partialSets`, `partCnt` used consistently across App/LogScreen/Group screens.
- **Language:** new UI strings are English ("Pause", "Finish Exercise", "in progress") to match the existing all-English app UI; Uroš described them in Serbian but the app itself is English throughout.
- **No automated tests** by design (CDN single-file app); verification is the manual browser checklists above.
