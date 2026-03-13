# Reecap — Style Guide
**Version 1.0**

---

## 1. Brand Voice

Reecap talks like a sharp tool, not a startup.

| Do                                  | Don't                                        |
|--------------------------------------|----------------------------------------------|
| "Export ready."                      | "Your amazing recap is ready to share! 🎉"  |
| "Drop your photos to get started."   | "Let's create something beautiful together!" |
| "2–30 photos supported."             | "Unlimited creativity at your fingertips."   |
| "Removed."                           | "Photo successfully deleted from your recap!"|

**Tone:** Direct. Calm. Confident. Never cheerful, never condescending.

---

## 2. Logo & Wordmark

- **Wordmark:** `Reecap` — Inter, 600 weight, `--color-black`
- **No icon/logomark required at v1** — the wordmark alone is the logo
- **Minimum clear space:** 16px on all sides
- **Never apply color, gradient, or shadow to the wordmark**
- **On dark backgrounds:** white wordmark only

---

## 3. Color Usage Rules

### Do
- Use black for all primary interactive elements (buttons, toggles, active states)
- Use `--color-gray-50` for sidebar and panel backgrounds
- Use white for the main canvas and cards
- Use `--color-gray-200` for dividers and inactive borders

### Don't
- Use any color other than black/white/gray in the UI (photos bring the color)
- Use gradients of any kind in UI elements
- Use opacity on colored elements to fake grays — use the actual gray tokens
- Use shadows on flat panels

---

## 4. Typography Rules

### Hierarchy
1. **Page/Section Title** — 16px, 500 weight, `--text-primary` — used for panel section headers (e.g., "BACKGROUND", "EXPORT")
2. **Body** — 14px, 400 weight, `--text-primary` — descriptions, helper text
3. **Label** — 11px, 500 weight, `--text-muted`, uppercase, 0.08em letter-spacing — slider labels, setting names
4. **Metadata** — 11px, 400 weight, `--text-muted` — photo dimensions, file sizes

### Rules
- **Labels are ALWAYS uppercase** when they precede a control (slider, toggle, input)
- **Body copy is never uppercase**
- No custom fonts. Inter only.
- Max line-length for body copy: 60 characters
- Avoid bold body copy — use it only for critical warnings

---

## 5. Spacing Rules

- **Panel sections** are separated by a 1px `--border-default` horizontal rule + 24px vertical padding
- **Controls within a section** have 16px vertical gap between them
- **Label-to-control gap:** 8px
- **Sidebar photo items:** 8px gap between thumbnails
- **No orphaned elements** — every UI element must belong to a visual group

---

## 6. Imagery & Media Style

The photos inside Reecap are the hero. The UI should disappear.

- Canvas background: white or very light gray — never colored
- Photo frames: `--radius-lg` (8px) — the only "soft" element in the UI
- Drop shadows on photo frames: `--shadow-sm` only
- Thumbnail size in sidebar: 44×44px, `--radius-sm`
- Hover state on thumbnails: 1px black border, no color overlay

---

## 7. Iconography Rules

- Use **Phosphor Icons Regular**. No solid/bold variants except for active states.
- All interactive icons must have a hover region of at least 32×32px (even if icon is 16px)
- Icons never appear alone in the UI without a tooltip or adjacent label
- Color: always contextual — match the surrounding text color token
- Icon + text combos: 6px gap, icon at 16px, vertically centered

---

## 8. Control Patterns

### Sliders
- Label on left (UPPERCASE, `--text-muted`)
- Current value on right (tabular figures, `--text-primary`, 13px)
- Track fills from left with `--color-black`
- Thumb is white circle with black border
- On drag: show no tooltip (value is already visible)

### Toggle
- Always right-aligned in its row
- Label on the left
- Off state: `--color-gray-200` track
- On state: `--color-black` track

### Segmented Control (Aspect Ratio, Image Fit)
- Height: 28px
- Active segment: white bg, `--shadow-xs`, `--text-primary`
- Inactive: transparent, `--text-muted`
- Container bg: `--color-gray-100`
- Radius: `--radius-sm`

### Export Button (Primary CTA)
- Black background, white text
- Positioned top-right
- "Export" label + quality badge (e.g., `2×`)
- Dropdown caret on the right for quality options
- Min-width: 120px

---

## 9. Empty States

Used when no photos are uploaded yet.

**Pattern:**
```
[Dashed border rectangle — 2px dashed --border-default, --radius-md]
  Icon: Upload (Phosphor, 24px, --text-muted)
  Title: "Drop photos here" (16px, 500, --text-primary)
  Subtitle: "Supports JPG, PNG, WebP · 2–30 photos" (13px, --text-muted)
  CTA: [Secondary button: "Browse files"]
```

---

## 10. Error & Feedback States

| State                | Feedback Pattern                                          |
|----------------------|----------------------------------------------------------|
| Too many photos (>30)| Inline banner: `"Maximum 30 photos. Remove some first."` — no modal |
| Too few photos (<2)  | Export button disabled + tooltip: `"Add at least 2 photos"` |
| Unsupported file     | Toast: `"Only JPG, PNG, and WebP supported."` — bottom center |
| Export in progress   | Button text changes to `"Exporting…"` + spinning icon, rest of UI remains usable |
| Export complete      | Toast: `"Exported. Check your downloads."` |

**Toast style:**
- Max-width 320px, centered bottom
- Black bg, white text, `--radius-sm`
- Auto-dismiss: 3s
- No close button needed

---

## 11. Responsive Behavior

Reecap is primarily a desktop web tool. Mobile is not a priority at v1.

| Breakpoint | Behavior                                              |
|------------|------------------------------------------------------|
| ≥1280px    | Full 3-panel layout (sidebar + canvas + controls)    |
| 1024–1279px| Collapse control panel to icon-only mode, expand on hover |
| <1024px    | Show "Best used on desktop" nudge, but don't block access |

---

## 12. Accessibility Baseline

- All interactive elements: keyboard navigable, visible focus ring (`2px solid --color-black`, 2px offset)
- Sliders: `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Color contrast: all text meets WCAG AA (4.5:1 for body, 3:1 for large text)
- Drag-and-drop in sidebar: keyboard alternative via arrow keys + Enter to confirm
- Export button: `aria-label="Export video"` when icon-only mode
