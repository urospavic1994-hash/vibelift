# Replacement first pictures — reviewed 19 Sep 2026, NOT yet swapped in

Made under a `.new` name so nothing live was touched. Run was stopped by Uroš after 6 of 8.
Claude compared each new picture against the live one. To apply the four approved ones:

    cd "C:\Users\UrosPcSoba\Desktop\Claude\VibeLift"
    mv "assets/exercises/Inverted Row.new.png"          "assets/exercises/Inverted Row.png"
    mv "assets/exercises/Machine Back Extension.new.png" "assets/exercises/Machine Back Extension.png"
    mv "assets/exercises/Seated Leg Curl.new.png"        "assets/exercises/Seated Leg Curl.png"
    mv "assets/exercises/Glute Ham Raise.new.png"        "assets/exercises/Glute Ham Raise.png"
then bump CACHE_VERSION in sw.js, compile-check, commit, push, verify live.
Afterwards these four can get a frame 2 (their lines are already in the per-group prompt files).
The old pictures stay recoverable in git history.

## APPROVED — clearly better than the live picture
Inverted Row         | live picture has a grey checkerboard background (transparency bug) and a woman in yellow;
                     | new one is the right movement, white background, the standard man. Flaw: the bar has no rack under it.
Machine Back Extension | live picture reads as an ab or row machine; new one is a seated back extension machine.
Seated Leg Curl      | live picture reads like a leg extension; new one has the roller across the shins, correct.
Glute Ham Raise      | live picture is a 45-degree back extension bench with dumbbells, wrong exercise;
                     | new one is a real glute ham developer with the ankles locked in.

## REJECTED — not better, keep the live picture
Sissy Squat          | new one has the feet anchored correctly but the torso sits upright instead of leaning back
                     | in one line from the knees. Neither picture is right. Needs a third try.

## NOT MADE — run stopped or refused
Reverse Pec Deck     | Gemini returned no image after 4 retries (probably refused the prompt). Reword and retry.
Dragon Flag          | never run, stopped mid-batch.
Seated Cable Chest Press | never run, stopped mid-batch.
