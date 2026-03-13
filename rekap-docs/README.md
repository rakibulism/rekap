# Rekap
### *Your week. In motion.*

---

## What is Rekap?

Rekap is a lightweight, browser-based tool for designers and developers who want to create polished weekly photo recaps — without touching a video editor.

Upload your screenshots, design previews, or work-in-progress photos. Rekap turns them into a smooth animated slideshow you can export as a video in seconds.

**No timelines. No keyframes. No fuss.**

---

## Who is it for?

| User | Use case |
|------|----------|
| Product designers | Share weekly design progress with teams or on social |
| Frontend developers | Showcase builds, UI states, side projects |
| Indie hackers | Weekly "build in public" content |
| Founders | Share product updates with investors / community |

---

## Core Value Proposition

> "I have great work to show. I don't have time to animate it."

Rekap solves this with a 3-step flow: **Upload → Adjust → Export.**

---

## Product Summary

| Attribute        | Detail                                     |
|------------------|--------------------------------------------|
| Platform         | Web (desktop-first, browser-based)         |
| Input            | JPG, PNG, WebP · 2–30 photos               |
| Output           | MP4 video (720p or 1080p)                  |
| Processing       | 100% client-side — no server, no uploads   |
| Theme            | Light mode default + dark mode toggle       |
| Design aesthetic | Monochrome · Minimal · Tool-grade           |

---

## Document Index

| File                  | Description                                       |
|-----------------------|---------------------------------------------------|
| `README.md`           | This file — project overview and orientation      |
| `design-system.md`    | Color tokens, typography, spacing, components     |
| `style-guide.md`      | Brand voice, usage rules, patterns, accessibility |
| `feature-list.md`     | Full feature specs with edge cases and priority   |
| `developers-guide.md` | Tech stack, architecture, code patterns, deploy   |

---

## Competitive Context

| Product     | What it does                    | Rekap's angle                      |
|-------------|---------------------------------|------------------------------------|
| Pixlo       | Photo slideshow tool            | Similar, but Rekap is cleaner, no-distraction design tool |
| Canva       | Full design suite               | Too heavy, too general             |
| CapCut      | Mobile video editor             | Too complex, mobile-first          |
| Loom        | Screen recording tool           | Video capture, not photo recap     |
| PowerPoint  | Presentations                   | Export friction, not designed for sharing |

**Rekap's positioning:** The fastest way for working designers and devs to turn work photos into shareable video — in under 60 seconds.

---

## Design Philosophy

Rekap's UI is invisible. The user's photos are the hero.

The interface follows the same principles as Linear, Notion, and Raycast:
- **No color** in the UI shell — only black, white, and gray
- **No gradients, no glassmorphism, no decoration**
- **Minimal radius** — clean corners, not bubbles
- **Typography is content** — clear hierarchy, no flair

The goal: open Rekap, and the first thing you notice is your own photos — not the tool.

---

## v1 Scope Summary

**In scope:**
- Photo upload (2–30 photos)
- Sidebar with drag-to-reorder and delete
- Aspect ratio selection
- Padding, border radius, shadow controls
- Background mode (color / image / slide-blur)
- Image fit (cover / contain)
- Slide duration slider
- Transition style selector
- Playback preview
- Export to MP4 (1×/2× quality)
- Dark mode toggle

**Out of scope (v1):**
- Background audio
- Text / caption overlays
- Brand watermark
- Cloud storage / sharing links
- Mobile optimization
- Team accounts

---

## Success Metrics (v1)

| Metric                          | Target         |
|---------------------------------|----------------|
| Time from upload to export      | < 60 seconds   |
| Export quality (1080p render)   | No artifacts, smooth transitions |
| Supported browser compatibility | Chrome, Edge, Firefox (latest 2 versions) |
| Bundle size (initial load)      | < 500KB (excl. FFmpeg WASM, loaded lazily) |

---

*Built with care. No fluff. Ship your week.*
