# Rekap — Feature List
**Version 1.0 — Product Definition**

---

## Overview

Rekap is a browser-based tool that turns a batch of uploaded photos into an animated video recap. No timeline editing. No keyframes. Upload → tweak → export.

**Core user flow:**
```
Upload Photos → Reorder → Customize → Preview → Export
```

---

## Feature Set

---

### F-01 · Photo Upload

**Description:** Users upload photos to build their recap slideshow.

| Detail             | Spec                                              |
|--------------------|--------------------------------------------------|
| Minimum photos     | 2                                                |
| Maximum photos     | 30                                               |
| Supported formats  | JPG, PNG, WebP                                   |
| Max file size      | 20MB per photo (warn, don't hard-block)          |
| Upload method      | Click to browse + drag-and-drop onto canvas      |
| Upload order       | Files load in selection order                    |
| Batch upload       | Yes — select multiple at once                    |

**Edge cases:**
- If user uploads >30 photos, accept first 30 and show inline notice
- If a file type is unsupported, skip it and show toast with count: `"2 files skipped — unsupported format"`
- Empty state displayed until at least 1 photo is uploaded

---

### F-02 · Photo Strip (Sidebar)

**Description:** Left-side panel showing all uploaded photos as reorderable thumbnails.

| Detail              | Spec                                             |
|---------------------|--------------------------------------------------|
| Thumbnail size      | 44×44px, cover crop                              |
| Label               | `Slide N` + pixel dimensions below              |
| Counter             | `N / 30` shown at top of strip                  |
| Reorder             | Drag-and-drop (mouse + touch)                   |
| Active indicator    | 2px black left border on selected item           |
| Scroll              | Vertical scroll when photos exceed panel height  |

---

### F-03 · Delete Photo

**Description:** Remove an individual photo from the recap.

| Detail             | Spec                                              |
|--------------------|--------------------------------------------------|
| Trigger            | Hover thumbnail → show delete icon (trash, 14px) |
| Confirmation       | No modal — delete immediately with undo toast    |
| Undo window        | 5 seconds                                        |
| Minimum guard      | If only 2 photos remain, disable delete and show tooltip: `"Minimum 2 photos required"` |

---

### F-04 · Add New Photo

**Description:** Add more photos after initial upload.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Entry point       | `+ Add photos` button at the bottom of the sidebar |
| Behavior          | Opens file picker, appends to existing list        |
| Limit enforcement | If at 30, button is disabled + tooltip shown       |

---

### F-05 · Animation Speed

**Description:** Control how fast slides transition.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Control type      | Slider                                             |
| Label             | `DURATION`                                         |
| Range             | 0.2s – 5.0s per slide                              |
| Default           | 1.5s                                               |
| Step              | 0.1s                                               |
| Display           | Current value shown right-aligned (e.g., `1.5s`)  |
| Effect            | Changes how long each photo is visible before transitioning |

---

### F-06 · Slide Transition Style

**Description:** Choose the animation style between slides.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Control type      | Segmented control or dropdown                      |
| Options           | Fade · Slide · Zoom · None                         |
| Default           | Fade                                               |

---

### F-07 · Aspect Ratio

**Description:** Set the output video aspect ratio.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Control type      | Segmented control (top bar)                        |
| Options           | 16:9 · 4:3 · 5:4 · 1:1 · 9:16                    |
| Default           | 16:9                                               |
| Behavior          | Canvas resizes + letterboxing applied to photos    |

---

### F-08 · Padding

**Description:** Add space around the photo within the slide frame.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Control type      | Slider                                             |
| Label             | `PADDING`                                          |
| Range             | 0 – 80px                                           |
| Default           | 24px                                               |
| Step              | 4px                                                |

---

### F-09 · Rounded Corners

**Description:** Apply border radius to the photo frame.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Control type      | Slider                                             |
| Label             | `ROUNDED CORNERS`                                  |
| Range             | 0 – 48px                                           |
| Default           | 8px                                                |
| Step              | 2px                                                |

---

### F-10 · Shadow

**Description:** Add drop shadow behind the photo frame.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Control type      | Slider                                             |
| Label             | `SHADOW`                                           |
| Range             | 0 – 40                                             |
| Default           | 0                                                  |
| Step              | 1                                                  |
| Effect            | Increases shadow blur and spread proportionally    |

---

### F-11 · Background Mode

**Description:** Control what appears behind the photo frame.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Control type      | 3-tab segmented control                            |
| Options           | `Color` · `Image` · `Slide`                        |
| Default           | `Slide`                                            |

**Color mode:** Show a color picker (grayscale only at v1 — black, white, grays)  
**Image mode:** Upload a custom background image (1 image, reused across all slides)  
**Slide mode:** Uses current slide's photo as background, blurred + overlaid  
  - **BLUR slider:** 0–30, default 12  
  - **OVERLAY slider:** 0–100%, default 40% (black overlay)

---

### F-12 · Image Fit

**Description:** How the photo fills its frame.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Control type      | Segmented control: `Cover` · `Contain`             |
| Default           | `Contain`                                          |

---

### F-13 · Export

**Description:** Render and download the recap as a video file.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Output format     | MP4 (H.264)                                        |
| Quality options   | 1× (720p) · 2× (1080p) · 3× (4K, future)         |
| Default quality   | 2×                                                 |
| Entry point       | Top-right `Export` button with quality badge       |
| Quality picker    | Dropdown via caret icon on the button              |
| Filename          | `rekap-export-YYYYMMDD.mp4`                        |
| Progress          | Button changes to `Exporting…` with progress %     |
| Completion        | Toast + auto-download trigger                      |

---

### F-14 · Playback Preview

**Description:** Preview the animated recap before export.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Controls          | Play / Pause · Previous slide · Next slide        |
| Location          | Bottom center below canvas                         |
| Looping           | Loops by default during preview                    |
| Keyboard          | Space = play/pause, ← → = prev/next slide         |

---

### F-15 · Theme Toggle (Dark Mode)

**Description:** Switch between light and dark UI themes.

| Detail            | Spec                                               |
|-------------------|----------------------------------------------------|
| Control type      | Toggle (icon: sun/moon)                            |
| Location          | Top bar, right side (before Export button)         |
| Default           | Light mode                                         |
| Persistence       | Saved to `localStorage`                            |
| Transition        | 200ms ease on all color tokens                     |

---

### F-16 · Settings Panel

**Description:** Global app preferences accessible via a settings icon.

| Setting           | Description                                        |
|-------------------|----------------------------------------------------|
| Default duration  | Set default slide duration for new uploads        |
| Default aspect ratio | Set preferred default aspect ratio             |
| Default quality   | Set default export quality                        |
| Reset to defaults | Resets all settings to factory                    |

---

## Feature Priority for v1

| Priority | Features                                                        |
|----------|-----------------------------------------------------------------|
| **Must** | F-01, F-02, F-03, F-04, F-05, F-07, F-08, F-11, F-12, F-13, F-14 |
| **Should** | F-06, F-09, F-10, F-15                                        |
| **Could** | F-16                                                           |
| **Won't (v1)** | Background audio, captions, watermark, team sharing     |

---

## Future Features (v2+)

- Background audio (upload music, set volume, auto-fade)
- Text overlay (title card per slide)
- Captions / labels on photos
- Brand watermark (logo upload)
- Cloud save / shareable link
- GIF export option
- Preset themes (templates for padding/radius/BG combos)
- Collaboration / team workspaces
