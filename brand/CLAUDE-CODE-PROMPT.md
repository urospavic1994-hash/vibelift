# Prompt for Claude Code

Copy everything below this line and paste it into Claude Code:

---

Read the file `BRAND-KIT.md` in this project. It contains the complete Vice City rebrand spec for VibeLift. Apply ALL changes to `index.html`. Here's what needs to change:

## 1. TYPOGRAPHY

Replace the Google Fonts `<link>` tag. Remove Barlow Condensed entirely. New link:

```html
<link href="https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&family=Sacramento&family=Dancing+Script:wght@400;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet">
```

Update these CSS variables in `:root`:
- `--fd: 'Passion One', sans-serif;` (was Barlow Condensed — bold condensed display font for headings, buttons, numbers)
- `--fb: 'DM Sans', sans-serif;` (keep as-is — body text, UI labels)
- Add new: `--fl: 'Sacramento', cursive;` (elegant script — ONLY for the logo "VibeLift" text)
- Add new: `--fc: 'Dancing Script', cursive;` (handwritten — for card titles, workout names, daily quote)

Find and replace every hardcoded `'Barlow Condensed'` with `'Passion One'`.

Font-weight on headings using `var(--fd)`: use `font-weight: 900` (Passion One supports 400/700/900).

Where the app name "VibeLift" appears as display text (header logo), change its font to `var(--fl)`.

Card titles and exercise/workout names should use `var(--fc)` instead of `var(--fd)`.

## 2. COLORS

Update `:root` (light theme):
```css
--pink:    #ff2d78;    /* was #ff1f7d */
--pink2:   #ff0a6c;    /* was #d4005e */
--navy:    #0a0e27;    /* was #0f2557 */
--navy2:   #0f1a3c;    /* was #1a3a7a */
--navy3:   #162350;    /* was #091b40 */
--pink-glow: rgba(255,45,120,.30);  /* was rgba(255,31,125,.30) */

/* NEW accent colors — add these */
--cyan:      #00e5ff;
--purple:    #b24dff;
--amber:     #f59e0b;
--sunset:    #ff6b35;
--cyan-glow: rgba(0,229,255,.30);

/* Light theme semantic updates */
--bg:     #f0f2ff;        /* was #edf1fd */
--sfx:    #e8ecff;        /* was #f0f4fe */
--border: rgba(10,14,39,0.1);  /* was #d8e2f6 */
--text:   #0a0e27;        /* was #0f2557 */
--text2:  rgba(10,14,39,0.5);  /* was #6674a8 */
```

Update `[data-theme="dark"]`:
```css
--bg:     #0a0e27;
--card:   #0f1a3c;
--sfx:    #0a0e27;
--border: rgba(255,255,255,0.08);
--text:   rgba(255,255,255,0.9);
--text2:  rgba(255,255,255,0.4);
--hdr-bg: rgba(10,14,39,.92);
--bar-bg: rgba(10,14,39,.95);
```

## 3. NEON GLOW EFFECTS — Add these CSS classes

```css
.neon-pink {
  color: var(--pink);
  text-shadow: 0 0 7px rgba(255,45,120,0.8), 0 0 20px rgba(255,45,120,0.5), 0 0 42px rgba(255,45,120,0.3), 0 0 80px rgba(255,45,120,0.15);
}
.neon-cyan {
  color: var(--cyan);
  text-shadow: 0 0 7px rgba(0,229,255,0.8), 0 0 20px rgba(0,229,255,0.5), 0 0 42px rgba(0,229,255,0.3), 0 0 80px rgba(0,229,255,0.15);
}
```

Apply `.neon-pink` to the logo text and one key metric on the dashboard. Don't overuse — max 1-2 glowing elements per screen.

## 4. AMBIENT BACKGROUND

Update `body::before` (the pink orb):
```css
background: radial-gradient(circle, rgba(255,45,120,.12) 0%, transparent 60%);
```

Add `body::after` (new cyan orb, bottom-left):
```css
body::after {
  content: '';
  position: fixed;
  bottom: -150px; left: -150px;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}
```

## 5. DAILY BIBLICAL QUOTE — New Feature

Add a daily quote component to the dashboard. The full array of 30 quotes is in `BRAND-KIT.md` section 12 — copy the `dailyQuotes` array from there.

Logic: `const quoteIndex = (new Date().getDate() - 1) % 30;`

Display it as a React component — a glass card below the dashboard header with:
- Quote text in `var(--fc)` (Dancing Script), 16-18px, color `rgba(255,255,255,0.7)`
- Reference line (e.g. "— Philippians 4:13") in `var(--fb)` (DM Sans), 12px, color `rgba(255,255,255,0.4)`
- Small category badge (e.g. "Strength") as a chip: `background: rgba(255,45,120,0.15); color: var(--pink); border: 1px solid rgba(255,45,120,0.25); border-radius: 20px; padding: 4px 12px; font-size: 11px;`
- Card style: `background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-left: 3px solid var(--pink); border-radius: 16px; padding: 20px;`

## IMPORTANT RULES

- Keep ALL existing component logic, layout structure, and React code intact
- Only change visual tokens (colors, fonts, effects) and add the quote feature
- Do not remove any existing features or screens
- Read `BRAND-KIT.md` for the full detailed spec if any value is unclear
- Test both light and dark themes after changes
