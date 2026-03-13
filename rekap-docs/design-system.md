# Rekap — Design System
**Version 1.0 | Light Mode First**

---

## 1. Brand Identity

**Product Name:** Rekap  
**Tagline:** *Your week. In motion.*  
**Audience:** Busy designers & developers who want to ship weekly recaps without touching a video editor.  
**Personality:** Focused. Minimal. Tool-like. No performance, no fluff.  
**Visual Reference:** Notion, Linear, Raycast — editorial and tool-grade, never marketing-grade.

---

## 2. Design Principles

1. **Clarity over decoration** — Every element earns its place. If it doesn't help the user do something, remove it.
2. **Black & white first** — Color is not decoration. The only accent is action.
3. **Speed signals intelligence** — Immediate feedback, no loading theatre.
4. **No gradients, no glassmorphism, no blur backgrounds, no color splashes.**
5. **Minimal radius** — Barely-there corners. Not pill-shaped, not boxy. 4px max on most surfaces.

---

## 3. Color Tokens

### Global Palette

| Token Name         | Value     | Usage                          |
|--------------------|-----------|-------------------------------|
| `--color-black`    | `#0A0A0A` | Primary text, borders on hover |
| `--color-gray-900` | `#111111` | Page headings                  |
| `--color-gray-800` | `#1A1A1A` | Body text primary              |
| `--color-gray-600` | `#4B4B4B` | Body text secondary            |
| `--color-gray-400` | `#8C8C8C` | Placeholder text, metadata     |
| `--color-gray-200` | `#D4D4D4` | Dividers, inactive borders     |
| `--color-gray-100` | `#EBEBEB` | Hover states on white surface  |
| `--color-gray-50`  | `#F7F7F7` | Sidebar, panel backgrounds     |
| `--color-white`    | `#FFFFFF` | Canvas, card backgrounds       |
| `--color-accent`   | `#0A0A0A` | Primary CTA (same as black)    |

> **No color accent other than black.** The product is monochrome. The only "pop" comes from the user's photos.

### Semantic Tokens

| Semantic Token          | Maps To            | Usage                        |
|-------------------------|--------------------|------------------------------|
| `--bg-page`             | `--color-white`    | Main page background         |
| `--bg-panel`            | `--color-gray-50`  | Right/left panels            |
| `--bg-surface`          | `--color-white`    | Cards, modals, dropdowns     |
| `--bg-hover`            | `--color-gray-100` | Interactive element hover    |
| `--border-default`      | `--color-gray-200` | Default borders              |
| `--border-strong`       | `--color-gray-400` | Focus rings, active states   |
| `--text-primary`        | `--color-gray-800` | Primary readable text        |
| `--text-secondary`      | `--color-gray-600` | Labels, captions             |
| `--text-muted`          | `--color-gray-400` | Placeholder, disabled        |
| `--text-inverse`        | `--color-white`    | Text on black backgrounds    |
| `--interactive-default` | `--color-black`    | Buttons, toggles, sliders    |
| `--interactive-hover`   | `--color-gray-800` | Hover state for CTAs         |

---

## 4. Typography

**Font Family:** `Inter` (primary) / System fallback: `-apple-system, BlinkMacSystemFont, sans-serif`

| Token              | Size  | Weight | Line Height | Usage                      |
|--------------------|-------|--------|-------------|----------------------------|
| `--text-2xl`       | 24px  | 600    | 1.3         | Page title (rare)          |
| `--text-xl`        | 20px  | 600    | 1.3         | Section headings           |
| `--text-lg`        | 16px  | 500    | 1.5         | Card labels, panel headers |
| `--text-base`      | 14px  | 400    | 1.6         | Body, descriptions         |
| `--text-sm`        | 13px  | 400    | 1.5         | Secondary labels, metadata |
| `--text-xs`        | 11px  | 500    | 1.4         | Tags, badges, captions     |

**Rules:**
- Letter spacing: `0` for body, `-0.01em` for headings
- No text-transform uppercase except for labels (e.g., panel section titles)
- All labels: `UPPERCASE`, `11px`, `500 weight`, `--color-gray-400`, `0.08em letter-spacing`

---

## 5. Spacing Scale

Based on a 4px base unit.

| Token         | Value | Usage                            |
|---------------|-------|----------------------------------|
| `--space-1`   | 4px   | Icon padding, micro gaps         |
| `--space-2`   | 8px   | Inline element gaps              |
| `--space-3`   | 12px  | Form field inner padding         |
| `--space-4`   | 16px  | Component padding (default)      |
| `--space-5`   | 20px  | Card inner padding               |
| `--space-6`   | 24px  | Section gaps                     |
| `--space-8`   | 32px  | Panel vertical rhythm            |
| `--space-10`  | 40px  | Page section breaks              |
| `--space-12`  | 48px  | Large layout margins             |

---

## 6. Border Radius

Minimal. Purposeful.

| Token          | Value | Usage                          |
|----------------|-------|-------------------------------|
| `--radius-sm`  | 4px   | Inputs, buttons, dropdown rows |
| `--radius-md`  | 6px   | Cards, panels, popovers        |
| `--radius-lg`  | 8px   | Modals, image frames           |
| `--radius-full`| 9999px| Toggle switches, pill tags     |

---

## 7. Elevation / Shadow

Minimal shadow usage. No drop shadows on panels. Shadows only signal floating.

| Token             | Value                            | Usage                     |
|-------------------|----------------------------------|--------------------------|
| `--shadow-none`   | `none`                           | Flat surfaces             |
| `--shadow-xs`     | `0 1px 2px rgba(0,0,0,0.06)`    | Dropdowns                 |
| `--shadow-sm`     | `0 2px 8px rgba(0,0,0,0.08)`    | Modals, popovers          |
| `--shadow-md`     | `0 4px 20px rgba(0,0,0,0.12)`   | Dialogs, overlays         |

---

## 8. Iconography

- **Icon Library:** Phosphor Icons (Regular weight)
- **Size:** 16px (inline), 20px (action buttons), 24px (empty states)
- **Color:** Always matches text color of context (`--text-primary`, `--text-muted`)
- **No filled icons** unless indicating an active/selected state

---

## 9. Motion & Animation

Animation is the product's core — but the UI itself must stay calm.

| Token                | Value      | Usage                              |
|----------------------|------------|-----------------------------------|
| `--duration-fast`    | `100ms`    | Hover state transitions            |
| `--duration-default` | `200ms`    | Panel open/close, color change     |
| `--duration-slow`    | `350ms`    | Modal appear, slide transitions    |
| `--easing-default`   | `ease-out` | All standard transitions           |
| `--easing-spring`    | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bounce for snappy interactions |

**Rules:**
- No transition on colors during drag operations (too noisy)
- Slider thumb: use `--easing-spring` on mousedown scale
- Photo thumbnail loading: fade-in only, no slide-in

---

## 10. Component Library (Atom Level)

### Button

```
Variants: Primary | Secondary | Ghost | Danger
Sizes: sm (28px h), md (32px h), lg (36px h)

Primary:  bg=#0A0A0A, text=white, border=none, hover: bg=#1A1A1A
Secondary: bg=white, text=#0A0A0A, border=1px #D4D4D4, hover: bg=#F7F7F7
Ghost:    bg=transparent, text=#4B4B4B, border=none, hover: bg=#EBEBEB
Danger:   bg=white, text=#B91C1C, border=1px #FECACA, hover: bg=#FEF2F2

Radius: --radius-sm (4px)
Font: 13px, weight 500
Padding: 0 12px
Disabled: opacity 0.4, cursor not-allowed
```

### Input / Range Slider

```
Track height: 3px, bg=#EBEBEB
Track filled: bg=#0A0A0A
Thumb: 14px circle, bg=white, border=2px #0A0A0A, shadow=--shadow-xs
Hover thumb: scale(1.1), easing=--easing-spring
```

### Toggle (Dark Mode)

```
Width: 36px, Height: 20px
Track off: bg=#D4D4D4
Track on: bg=#0A0A0A
Thumb: 16px, bg=white, shadow=--shadow-xs
Transition: 200ms ease
```

### Tag / Badge

```
Height: 20px, padding: 0 6px
Font: 11px, weight 500
Radius: --radius-full
Default: bg=#F7F7F7, text=#4B4B4B, border=1px #EBEBEB
```

---

## 11. Layout Grid

| Region         | Width         | Notes                              |
|----------------|---------------|-----------------------------------|
| Sidebar (left) | 220px fixed   | Photo strip, drag-reorder          |
| Canvas (center)| Fluid         | Preview area                       |
| Panel (right)  | 280px fixed   | Controls: padding, radius, BG, etc |
| Topbar         | 100% / 48px h | Logo, aspect ratio, export         |
| Bottombar      | 100% / 44px h | Playback controls                  |

---

## 12. Dark Mode (Toggle)

Dark mode inverts the palette — same tokens, different values.

| Token           | Light          | Dark           |
|-----------------|----------------|----------------|
| `--bg-page`     | `#FFFFFF`      | `#111111`      |
| `--bg-panel`    | `#F7F7F7`      | `#1A1A1A`      |
| `--bg-surface`  | `#FFFFFF`      | `#222222`      |
| `--bg-hover`    | `#EBEBEB`      | `#2A2A2A`      |
| `--border-default`| `#D4D4D4`    | `#2E2E2E`      |
| `--text-primary`| `#1A1A1A`      | `#EDEDED`      |
| `--text-secondary`| `#4B4B4B`    | `#8C8C8C`      |
| `--text-muted`  | `#8C8C8C`      | `#555555`      |

Implementation: CSS class on `<html>`: `data-theme="light"` or `data-theme="dark"`. All tokens defined as CSS custom properties.
