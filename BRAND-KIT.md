# VibeLift — Vice City Brand Kit

> **Purpose:** This file is the single source of truth for VibeLift's visual identity.
> It serves as both a human-readable brand handout AND a machine-readable reference
> for Claude Code (or any AI coding assistant) to restyle the app.
>
> **When editing code:** Use this file to look up every color, font, spacing value,
> effect, and design rule. Every CSS variable mapping is listed with OLD → NEW values.

---

## App Identity

- **App name:** VibeLift
- **Tagline:** "Work out, not stress out."
- **Type:** Mobile-first workout tracker web app (max-width: 430px)
- **Aesthetic:** Vice City Neon — retro-modern, 80s Miami-inspired
- **Default mode:** Dark (Vice City lives at night)

---

## 1. CSS Variable Migration Map

Use this table to find-and-replace every CSS variable in the codebase.

### Colors

| OLD Variable | OLD Value | NEW Variable | NEW Value | Role |
|-------------|-----------|-------------|-----------|------|
| `--pink` | `#ff1f7d` | `--pink` | `#ff2d78` | Primary neon pink |
| `--pink2` | `#d4005e` | `--pink2` | `#ff0a6c` | Pink hover/active |
| `--navy` | `#0f2557` | `--navy` | `#0a0e27` | Deep navy (page bg in dark) |
| `--navy2` | `#1a3a7a` | `--navy2` | `#0f1a3c` | Mid navy (card bg in dark) |
| `--navy3` | `#091b40` | `--navy3` | `#162350` | Light navy (elevated surfaces) |
| `--success` | `#0daa74` | `--success` | `#0daa74` | Keep as-is |
| `--pink-glow` | `rgba(255,31,125,.30)` | `--pink-glow` | `rgba(255,45,120,.30)` | Pink glow overlay |
| *(new)* | — | `--cyan` | `#00e5ff` | Secondary accent / info |
| *(new)* | — | `--purple` | `#b24dff` | Gradients / charts |
| *(new)* | — | `--amber` | `#f59e0b` | Streaks / rewards / special CTA |
| *(new)* | — | `--sunset` | `#ff6b35` | Warmth accent |
| *(new)* | — | `--cyan-glow` | `rgba(0,229,255,.30)` | Cyan glow overlay |

### Dark Theme (`[data-theme="dark"]`)

| Variable | OLD Value | NEW Value |
|----------|-----------|-----------|
| `--bg` | `#070c17` | `#0a0e27` |
| `--card` | `#0d1526` | `#0f1a3c` |
| `--sfx` | `#060a13` | `#0a0e27` |
| `--border` | `#162038` | `rgba(255,255,255,0.08)` |
| `--text` | `#dde5ff` | `rgba(255,255,255,0.9)` |
| `--text2` | `#6a7aa8` | `rgba(255,255,255,0.4)` |
| `--hdr-bg` | `rgba(7,12,23,.9)` | `rgba(10,14,39,.92)` |
| `--bar-bg` | `rgba(7,12,23,.94)` | `rgba(10,14,39,.95)` |

### Light Theme (`:root` defaults)

| Variable | OLD Value | NEW Value |
|----------|-----------|-----------|
| `--bg` | `#edf1fd` | `#f0f2ff` |
| `--card` | `#ffffff` | `#ffffff` |
| `--sfx` | `#f0f4fe` | `#e8ecff` |
| `--border` | `#d8e2f6` | `rgba(10,14,39,0.1)` |
| `--text` | `#0f2557` | `#0a0e27` |
| `--text2` | `#6674a8` | `rgba(10,14,39,0.5)` |

### Shadows (keep structure, update base color)

| Variable | NEW Value (light) | NEW Value (dark) |
|----------|-------------------|------------------|
| `--sh1` | `0 1px 4px rgba(10,14,39,.05), 0 3px 10px rgba(10,14,39,.06)` | `0 1px 4px rgba(0,0,0,.25), 0 3px 10px rgba(0,0,0,.3)` |
| `--sh2` | `0 2px 8px rgba(10,14,39,.05), 0 8px 26px rgba(10,14,39,.09)` | `0 2px 8px rgba(0,0,0,.3), 0 8px 26px rgba(0,0,0,.38)` |
| `--sh3` | `0 4px 16px rgba(10,14,39,.08), 0 20px 48px rgba(10,14,39,.12)` | `0 4px 16px rgba(0,0,0,.35), 0 20px 48px rgba(0,0,0,.44)` |

---

## 2. Typography Migration

### All Fonts on Google Fonts — No Downloads Needed

All fonts load via a single Google Fonts `<link>` tag. No self-hosted files required.

### Google Fonts Link — REPLACE the existing `<link>` tag

**OLD:**
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet">
```

**NEW:**
```html
<link href="https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&family=Sacramento&family=Dancing+Script:wght@400;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap" rel="stylesheet">
```

### Font Variables

| OLD Variable | OLD Value | NEW Variable | NEW Value |
|-------------|-----------|-------------|-----------|
| `--fd` | `'Barlow Condensed', sans-serif` | `--fd` | `'Passion One', sans-serif` |
| `--fb` | `'DM Sans', sans-serif` | `--fb` | `'DM Sans', sans-serif` |
| *(new)* | — | `--fl` | `'Sacramento', cursive` |
| *(new)* | — | `--fc` | `'Dancing Script', cursive` |

### Font Roles

| Font | Variable | Use For | Inspired By |
|------|----------|---------|-------------|
| **Sacramento** | `--fl` | Logo text only — "VibeLift" lockup, splash screen title. Elegant flowing script. | Rage Italic |
| **Passion One** | `--fd` | Sublogo text, section headings, page titles, navigation headers, button text, large numbers. Bold condensed display. | Pricedown |
| **Dancing Script** | `--fc` | Card titles, workout names, exercise labels, motivational text, daily quotes. Handwritten warmth. | BrushScrD |
| **DM Sans** | `--fb` | Body text, UI labels, small text, navigation items, data descriptions, set/rep details. Clean and readable at all sizes. | (kept) |

### Where Barlow Condensed Is Used (find and replace)

Every instance of `font-family: var(--fd)` or `font-family: 'Barlow Condensed'` stays as `var(--fd)` — the variable value changes handle it (Passion One replaces it). But check for:

- Any hardcoded `'Barlow Condensed'` strings → replace with `'Passion One'`
- `font-weight: 700/800/900` on headings → change to `font-weight: 900` (Passion One supports 400/700/900)
- Card titles and exercise names → switch from `var(--fd)` to `var(--fc)` (Dancing Script)
- Logo / app name text → switch to `var(--fl)` (Sacramento)
- Large numeric displays (kg, reps, volume) → keep as `var(--fd)` (Passion One) — its bold condensed style works great for numbers

---

## 3. Neon Glow Effects — NEW (add to codebase)

### Text Glow (use on key headings and active metrics only)

```css
/* Pink neon text — for primary headlines, active values */
.neon-pink {
  color: var(--pink);
  text-shadow:
    0 0 7px rgba(255,45,120,0.8),
    0 0 20px rgba(255,45,120,0.5),
    0 0 42px rgba(255,45,120,0.3),
    0 0 80px rgba(255,45,120,0.15);
}

/* Cyan neon text — for secondary data, info highlights */
.neon-cyan {
  color: var(--cyan);
  text-shadow:
    0 0 7px rgba(0,229,255,0.8),
    0 0 20px rgba(0,229,255,0.5),
    0 0 42px rgba(0,229,255,0.3),
    0 0 80px rgba(0,229,255,0.15);
}

/* Purple neon text — for chart labels, gradient accents */
.neon-purple {
  color: var(--purple);
  text-shadow:
    0 0 7px rgba(178,77,255,0.8),
    0 0 20px rgba(178,77,255,0.5),
    0 0 42px rgba(178,77,255,0.3);
}
```

### Box Glow (use on primary CTA buttons on hover, active cards)

```css
/* Pink box glow */
box-shadow: 0 0 20px rgba(255,45,120,0.6), 0 0 60px rgba(255,45,120,0.2);

/* Cyan box glow */
box-shadow: 0 0 20px rgba(0,229,255,0.6), 0 0 60px rgba(0,229,255,0.2);

/* Amber box glow (streak/reward buttons) */
box-shadow: 0 0 15px rgba(245,158,11,0.5), 0 0 40px rgba(245,158,11,0.15);
```

### Glow Rules

- Max 1–2 glowing elements per screen
- Use on: primary CTA, the main metric number, achievement badges
- Never on: body text, all cards at once, borders, background elements

---

## 4. Signature Gradients — NEW

```css
/* Vice Sunset — hero sections, progress bar fills */
background: linear-gradient(135deg, #ff2d78, #b24dff);

/* Neon Horizon — streak/reward elements */
background: linear-gradient(135deg, #ff2d78, #ff6b35, #f59e0b);

/* Electric Night — special feature highlights, charts */
background: linear-gradient(135deg, #00e5ff, #b24dff, #ff2d78);

/* Midnight Depth — card background depth in dark mode */
background: linear-gradient(135deg, #0a0e27, #162350, #1a2d5e);
```

---

## 5. Glass Morphism Updates

### Existing glass overlay variable

**OLD:** `rgba(255,255,255,0.08)` — keep for light mode glass

### Dark Mode Glass Cards

```css
/* Default glass card */
background: rgba(255,255,255,0.06);
border: 1px solid rgba(255,255,255,0.1);
backdrop-filter: blur(20px);

/* Pink accent glass (active/selected states) */
background: rgba(255,45,120,0.08);
border: 1px solid rgba(255,45,120,0.2);

/* Cyan accent glass (info/stats panels) */
background: rgba(0,229,255,0.06);
border: 1px solid rgba(0,229,255,0.15);
```

---

## 6. Ambient Background Effects

### Update `body::before` (pink orb — top right)

**OLD:**
```css
background: radial-gradient(circle, rgba(255,31,125,.08) 0%, transparent 68%);
```

**NEW:**
```css
background: radial-gradient(circle, rgba(255,45,120,.12) 0%, transparent 60%);
```

### Add `body::after` (cyan orb — bottom left) — NEW

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

---

## 7. Button System

| Tier | Background | Text Color | Hover Effect |
|------|-----------|------------|-------------|
| Primary | `var(--pink)` | `#ffffff` | Pink box glow + `translateY(-2px)` |
| Secondary | `transparent` + cyan border | `var(--cyan)` | Cyan box glow + `translateY(-2px)` |
| Amber/Streak | `var(--amber)` | `var(--navy)` | Amber box glow + `translateY(-2px)` |
| Ghost | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.7)` | bg → `rgba(255,255,255,0.15)` |

All buttons: `font-family: var(--fd)` (Righteous), `border-radius: 14px`, `letter-spacing: 1px`

---

## 8. Spacing & Radius (no changes needed)

| Token | Value |
|-------|-------|
| `--r` | `18px` → keep (or increase to `20px`) |
| `--r-sm` | `12px` → keep |
| Max-width | `430px` → keep |

---

## 9. Iconography Rules

- All icons: inline SVGs only — no emoji, no icon fonts
- Stroke: 1.5–2px
- Default color: `rgba(255,255,255,0.7)` (dark mode) / `var(--text2)` (light mode)
- Active: `var(--pink)` or `var(--cyan)`

---

## 10. Design Rules (Do / Don't)

**DO:**
- Use neon glow on 1–2 key elements per screen
- Keep dark backgrounds navy-based, never pure black (#000)
- Use Passion One for headings, Dancing Script for cards, DM Sans for body
- Apply glass morphism with subtle borders
- Use gradients sparingly (progress bars, heroes)
- Let neon colors breathe with plenty of dark space

**DON'T:**
- Put neon glow on every element
- Use pure black (#000) as any background
- Mix more than 2 neon colors in one component
- Use neon pink for body text (readability fails)
- Use Dancing Script for tiny UI labels (too small to read)
- Use Sacramento for anything other than the logo (it's thin and delicate)

---

## 11. Logo

One logo file will be provided by the user (uploaded to the project folder).
Use it as the main app logo wherever the app name appears at the top/splash level.

Logo colors: "Vibe" in neon pink (#ff2d78), "Lift" in white (#ffffff), on navy (#0a0e27) background.

---

## 12. Daily Biblical Quotes Feature

The app displays one inspiring quote per day, cycling through 30 quotes (one for each day of the month).
The quote should appear on the dashboard/home screen in a glass card with Dancing Script font.

**Logic:** Use `new Date().getDate() - 1` as the index into the quotes array (0-29).
Day 30 uses index 29. Day 31 wraps to index 0.

**Quotes data** — embed this array in the app:

```javascript
const dailyQuotes = [
  { ref: "Joshua 1:9", text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", category: "Strength" },
  { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", category: "Strength" },
  { ref: "Philippians 4:13", text: "I can do all this through him who gives me strength.", category: "Strength" },
  { ref: "2 Timothy 1:7", text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", category: "Strength" },
  { ref: "Psalm 27:1", text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?", category: "Strength" },
  { ref: "Psalm 18:2", text: "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge, my shield and the horn of my salvation, my stronghold.", category: "Strength" },
  { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest.", category: "Peace" },
  { ref: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", category: "Peace" },
  { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds.", category: "Peace" },
  { ref: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing.", category: "Peace" },
  { ref: "Psalm 34:18", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", category: "Peace" },
  { ref: "Matthew 5:4", text: "Blessed are those who mourn, for they will be comforted.", category: "Peace" },
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", category: "Faith" },
  { ref: "Hebrews 11:1", text: "Now faith is confidence in what we hope for and assurance about what we do not see.", category: "Faith" },
  { ref: "Matthew 17:20", text: "Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, Move from here to there, and it will move. Nothing will be impossible for you.", category: "Faith" },
  { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", category: "Faith" },
  { ref: "Mark 10:27", text: "Jesus looked at them and said, With man this is impossible, but not with God; all things are possible with God.", category: "Faith" },
  { ref: "Psalm 37:4", text: "Take delight in the Lord, and he will give you the desires of your heart.", category: "Faith" },
  { ref: "1 Corinthians 13:4-7", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It always protects, always trusts, always hopes, always perseveres.", category: "Love" },
  { ref: "1 Corinthians 16:14", text: "Do everything in love.", category: "Love" },
  { ref: "1 John 4:19", text: "We love because he first loved us.", category: "Love" },
  { ref: "Proverbs 17:17", text: "A friend loves at all times, and a brother is born for a time of adversity.", category: "Love" },
  { ref: "John 15:12", text: "My command is this: Love each other as I have loved you.", category: "Love" },
  { ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", category: "Love" },
  { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", category: "Purpose" },
  { ref: "Psalm 119:105", text: "Your word is a lamp for my feet, a light on my path.", category: "Purpose" },
  { ref: "Matthew 6:33", text: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.", category: "Purpose" },
  { ref: "Micah 6:8", text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.", category: "Purpose" },
  { ref: "Colossians 3:23", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", category: "Purpose" },
  { ref: "Proverbs 16:3", text: "Commit to the Lord whatever you do, and he will establish your plans.", category: "Purpose" }
];

const today = new Date().getDate();
const quoteIndex = (today - 1) % 30;
const todaysQuote = dailyQuotes[quoteIndex];
```

**Display style:**
- Glass card on the dashboard, below the header
- Quote text in Dancing Script (`var(--fc)`), ~16-18px, white 70% opacity
- Reference (e.g. "— Philippians 4:13") in DM Sans, 12px, white 40% opacity
- Small category badge (e.g. "Strength") in neon pink chip style
- Subtle pink or cyan left border accent on the card

---

*VibeLift Vice City Brand Kit v2.0 — April 2026*
