# VibeLift — Vice City Brand Guidelines

**Version:** 2.0  
**Date:** April 2026  
**Tagline:** "Work out, not stress out."  
**Aesthetic:** Vice City Neon — retro-modern, 80s Miami-inspired

---

## 1. Color System

### Primary — Neon Pink

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Neon Pink | `#FF2D78` | 255, 45, 120 | Primary actions, CTA buttons, active states, logo accent |
| Hot Pink | `#FF0A6C` | 255, 10, 108 | Hover / pressed states |
| Soft Pink | `#FF5C9A` | 255, 92, 154 | Tags, highlights, secondary accents |
| Magenta | `#E6007E` | 230, 0, 126 | Gradient stops, deep accent |

### Foundation — Navy

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Deep Navy | `#0A0E27` | 10, 14, 39 | Page background (dark mode default) |
| Mid Navy | `#0F1A3C` | 15, 26, 60 | Card backgrounds |
| Light Navy | `#162350` | 22, 35, 80 | Elevated surfaces, modals |
| Navy Surface | `#1A2D5E` | 26, 45, 94 | Input fields, wells |

### Accents

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Neon Cyan | `#00E5FF` | 0, 229, 255 | Secondary accent, info states, labels |
| Neon Purple | `#B24DFF` | 178, 77, 255 | Gradients, chart accents |
| Amber CTA | `#F59E0B` | 245, 158, 11 | Streak rewards, special CTAs |
| Sunset Orange | `#FF6B35` | 255, 107, 53 | Warmth accents, sunset gradients |
| Sunset Peach | `#FF9472` | 255, 148, 114 | Gradient endpoint |

### Opacity Scale (White)

| Token | Value | Usage |
|-------|-------|-------|
| `--white-90` | `rgba(255,255,255,0.9)` | Primary text |
| `--white-70` | `rgba(255,255,255,0.7)` | Body text |
| `--white-40` | `rgba(255,255,255,0.4)` | Secondary/muted text |
| `--white-15` | `rgba(255,255,255,0.15)` | Borders, dividers |
| `--white-08` | `rgba(255,255,255,0.08)` | Card borders, subtle lines |
| `--white-04` | `rgba(255,255,255,0.04)` | Card backgrounds |

### Critical Rules

- **Never use pure black** (`#000000`) — always Deep Navy or darker navy tones
- **Never use neon pink for body text** — readability fails on dark backgrounds
- **Neon colors are accents** — max 2 neon colors per component/screen

---

## 2. Signature Gradients

| Name | CSS | Usage |
|------|-----|-------|
| Vice Sunset | `linear-gradient(135deg, #FF2D78, #B24DFF)` | Hero sections, progress bars |
| Midnight Depth | `linear-gradient(135deg, #0A0E27, #162350, #1A2D5E)` | Background depth layers |
| Neon Horizon | `linear-gradient(135deg, #FF2D78, #FF6B35, #F59E0B)` | Streak/reward elements |
| Electric Night | `linear-gradient(135deg, #00E5FF, #B24DFF, #FF2D78)` | Special feature highlights |

Gradients should be used sparingly — hero sections, progress fills, and feature highlights. Never on body backgrounds or card surfaces.

---

## 3. Typography

### Font Stack

| Role | Font | Source | Weight(s) |
|------|------|--------|-----------|
| Display / Headings / Logo | **Righteous** | Google Fonts | 400 (single weight) |
| Data / Numbers / Labels | **Orbitron** | Google Fonts | 400, 500, 600, 700, 800, 900 |
| Taglines / Alt Display | **Audiowide** | Google Fonts | 400 |
| Body / UI / Navigation | **DM Sans** | Google Fonts | 400, 500, 600, 700 |

### Type Scale

**Righteous (Display)**

| Size | Usage | Line Height |
|------|-------|-------------|
| 48–120px | App logo, hero titles | 0.95–1.0 |
| 32px | Page/section headings | 1.1 |
| 24px | Section subheadings | 1.2 |
| 18px | Card titles | 1.3 |

**Orbitron (Technical)**

| Size | Usage | Letter Spacing |
|------|-------|----------------|
| 28–48px | Large data values (e.g., "2,450 kg") | 0 |
| 14px | Status labels, badges (uppercase) | 2–3px |
| 10–11px | Section labels, category tags (uppercase) | 3–5px |

**DM Sans (Body)**

| Size | Weight | Usage |
|------|--------|-------|
| 16px | 400 | Body text |
| 14px | 500 | UI labels, navigation |
| 13px | 400 | Secondary text, captions |
| 12px | 500 | Chips, small labels |

### Typography Rules

- Headings: always **Righteous**, never bold (it's a single-weight font — the weight is built in)
- Data and numbers on dashboards: **Orbitron** with neon glow
- Labels and badges: **Orbitron**, uppercase, letter-spacing 2–5px
- Body and UI text: **DM Sans** — clean, readable, modern
- Tagline uses **Audiowide** at 14–24px, uppercase, letter-spacing 3px
- Never use Orbitron for paragraphs — it's a display/data font

---

## 4. Neon Glow Effects

### Text Glow

```css
/* Pink neon text */
color: #FF2D78;
text-shadow:
  0 0 7px rgba(255,45,120,0.8),
  0 0 20px rgba(255,45,120,0.5),
  0 0 42px rgba(255,45,120,0.3),
  0 0 80px rgba(255,45,120,0.15);

/* Cyan neon text */
color: #00E5FF;
text-shadow:
  0 0 7px rgba(0,229,255,0.8),
  0 0 20px rgba(0,229,255,0.5),
  0 0 42px rgba(0,229,255,0.3),
  0 0 80px rgba(0,229,255,0.15);

/* Purple neon text */
color: #B24DFF;
text-shadow:
  0 0 7px rgba(178,77,255,0.8),
  0 0 20px rgba(178,77,255,0.5),
  0 0 42px rgba(178,77,255,0.3);
```

### Box Glow

```css
/* Pink glow (buttons, active cards) */
box-shadow: 0 0 20px rgba(255,45,120,0.6), 0 0 60px rgba(255,45,120,0.2);

/* Cyan glow (info elements) */
box-shadow: 0 0 20px rgba(0,229,255,0.6), 0 0 60px rgba(0,229,255,0.2);

/* Amber glow (streak/reward) */
box-shadow: 0 0 15px rgba(245,158,11,0.5), 0 0 40px rgba(245,158,11,0.15);
```

### Glow Rules

- Apply neon glow to **1–2 key elements per screen** maximum
- Use on: primary CTA, active metric, achievement badge
- Never on: body text, borders, background elements
- Glow intensity should pulse subtly on interactive elements (optional animation)

---

## 5. Glass Morphism

### Card Variants

**Neutral Glass** (default)
```css
background: rgba(255,255,255,0.06);
border: 1px solid rgba(255,255,255,0.1);
backdrop-filter: blur(20px);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(0,0,0,0.3);
```

**Pink Accent Glass** (active/selected states)
```css
background: rgba(255,45,120,0.08);
border: 1px solid rgba(255,45,120,0.2);
backdrop-filter: blur(20px);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(255,45,120,0.1);
```

**Cyan Accent Glass** (info/stats)
```css
background: rgba(0,229,255,0.06);
border: 1px solid rgba(0,229,255,0.15);
backdrop-filter: blur(20px);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(0,229,255,0.08);
```

---

## 6. Button System

| Tier | Background | Text | Glow on Hover | Usage |
|------|-----------|------|---------------|-------|
| Primary | `#FF2D78` | White | Pink glow | Main CTA — "Start Workout" |
| Secondary | Transparent + cyan border | `#00E5FF` | Cyan glow | Alternative actions — "View History" |
| Amber | `#F59E0B` | Deep Navy | Amber glow | Reward/streak actions — "Claim Streak" |
| Ghost | `rgba(255,255,255,0.08)` | White 70% | Subtle lift | Cancel, dismiss, tertiary |

All buttons: `border-radius: 14px`, `font-family: Righteous`, `letter-spacing: 1px`, `padding: 14px 36px`.

Hover: `transform: translateY(-2px)` + glow shadow.

---

## 7. Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| Border radius (large) | 20px | Cards, modals |
| Border radius (medium) | 14px | Buttons, inputs |
| Border radius (small) | 10px | Chips, tags |
| Border radius (pill) | 30px | Badges, status chips |
| Max width (mobile) | 430px | App container |
| Section gap | 80px | Between major sections |
| Card padding | 20–32px | Internal card spacing |
| Grid gap | 12–16px | Between cards |

---

## 8. Ambient Effects

### Background Orbs
```css
/* Top-right pink orb */
position: fixed; top: -200px; right: -200px;
width: 600px; height: 600px; border-radius: 50%;
background: radial-gradient(circle, rgba(255,45,120,0.12) 0%, transparent 60%);

/* Bottom-left cyan orb */
position: fixed; bottom: -150px; left: -150px;
width: 500px; height: 500px; border-radius: 50%;
background: radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 60%);
```

### Retro Grid (Hero/Landing)
```css
background:
  repeating-linear-gradient(90deg, rgba(255,45,120,0.08) 0px, transparent 1px, transparent 60px),
  repeating-linear-gradient(0deg, rgba(255,45,120,0.08) 0px, transparent 1px, transparent 60px);
transform: perspective(500px) rotateX(45deg);
```

---

## 9. Iconography

- All icons are **inline SVGs** — no emoji, no icon fonts
- Stroke style: 1.5–2px stroke width
- Default color: `rgba(255,255,255,0.7)` (matches body text)
- Active color: `#FF2D78` (neon pink) or `#00E5FF` (cyan)
- Icon size: 20–24px for navigation, 16–18px for inline

---

## 10. Tone & Personality

**Voice:** Energetic but low-stress. Direct and motivating. No fluff, no gym-bro culture.

**Tagline:** "Work out, not stress out."

**Copy style:**
- Short, punchy sentences
- Action verbs first ("Track your lifts", "Crush your goals")
- Celebrate progress without pressure
- No jargon — accessible to all fitness levels

---

## 11. Do & Don't

### Do

- Use neon glow on 1–2 key elements per screen
- Keep backgrounds deep navy, never pure black
- Use Righteous for headings, DM Sans for body
- Apply glass morphism with subtle borders
- Use gradients sparingly on progress bars and heroes
- Keep text white/off-white for readability
- Let the neon colors breathe — negative space is your friend

### Don't

- Put neon glow on every element (visual noise)
- Use pure black (#000) backgrounds
- Mix more than 2 neon colors in one component
- Use neon pink for body text (readability failure)
- Overuse Orbitron — reserve for data and labels only
- Add palm trees, flamingos, or literal Vice City imagery (we use the *vibe*, not the theme)
- Use light mode as default — this is a dark-first design

---

## 12. CSS Variables (Copy-Paste Ready)

```css
:root {
  /* Colors — Neon Pink */
  --neon-pink:      #ff2d78;
  --neon-pink-hot:  #ff0a6c;
  --neon-pink-soft: #ff5c9a;
  --neon-magenta:   #e6007e;

  /* Colors — Navy */
  --navy-deep:      #0a0e27;
  --navy-mid:       #0f1a3c;
  --navy-light:     #162350;
  --navy-surface:   #1a2d5e;

  /* Colors — Accents */
  --cyan-neon:      #00e5ff;
  --cyan-soft:      #67f0ff;
  --purple-neon:    #b24dff;
  --purple-soft:    #9c5fff;
  --amber-cta:      #f59e0b;
  --amber-hot:      #ffb340;
  --sunset-orange:  #ff6b35;
  --sunset-peach:   #ff9472;

  /* White Opacity */
  --white-90:       rgba(255,255,255,0.9);
  --white-70:       rgba(255,255,255,0.7);
  --white-40:       rgba(255,255,255,0.4);
  --white-15:       rgba(255,255,255,0.15);
  --white-08:       rgba(255,255,255,0.08);
  --white-04:       rgba(255,255,255,0.04);

  /* Glows */
  --glow-pink:      0 0 20px rgba(255,45,120,0.6), 0 0 60px rgba(255,45,120,0.2);
  --glow-cyan:      0 0 20px rgba(0,229,255,0.6), 0 0 60px rgba(0,229,255,0.2);
  --glow-purple:    0 0 20px rgba(178,77,255,0.5), 0 0 60px rgba(178,77,255,0.15);
  --glow-amber:     0 0 15px rgba(245,158,11,0.5), 0 0 40px rgba(245,158,11,0.15);

  /* Typography */
  --font-display:   'Righteous', cursive;
  --font-tech:      'Orbitron', sans-serif;
  --font-alt:       'Audiowide', sans-serif;
  --font-body:      'DM Sans', sans-serif;

  /* Layout */
  --r:              20px;
  --r-md:           14px;
  --r-sm:           10px;
  --r-pill:         30px;
}
```

---

*VibeLift Vice City Brand Kit v2.0 — April 2026*
