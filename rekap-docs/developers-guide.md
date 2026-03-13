# Rekap — Developer Guide
**Version 1.0**

---

## 1. Project Overview

Rekap is a browser-based tool that converts uploaded photos into an animated video recap. It runs entirely client-side — no backend required for v1. All processing (canvas rendering, video encoding) happens in the user's browser.

---

## 2. Tech Stack

| Layer            | Technology                              | Reason                                    |
|------------------|-----------------------------------------|-------------------------------------------|
| Framework        | React 18 + TypeScript                   | Component model, strong typing            |
| Build tool       | Vite                                    | Fast dev server, optimized builds         |
| Styling          | Tailwind CSS + CSS custom properties    | Token-based design system alignment       |
| Animation engine | Web Animations API + CSS transitions    | No heavy dependency                       |
| Video encoding   | `@ffmpeg/ffmpeg` (WebAssembly)          | Client-side MP4 rendering, no server      |
| Canvas rendering | HTML5 Canvas API                        | Frame-by-frame photo rendering            |
| State management | Zustand                                 | Lightweight, no boilerplate               |
| Icons            | Phosphor Icons (`phosphor-react`)       | Design system aligned                     |
| Drag & Drop      | `@dnd-kit/core` + `@dnd-kit/sortable`  | Accessible, performant reordering         |
| File handling    | Native File API + `URL.createObjectURL` | No upload — pure client side              |

---

## 3. Project Structure

```
rekap/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/              # Atomic UI components (Button, Slider, Toggle, etc.)
│   │   ├── layout/          # AppShell, Topbar, Sidebar, ControlPanel, Canvas
│   │   ├── panels/          # BackgroundPanel, ExportPanel, SettingsPanel
│   │   └── playback/        # PlaybackBar
│   ├── hooks/
│   │   ├── usePhotoStore.ts
│   │   ├── useExport.ts
│   │   ├── usePreview.ts
│   │   └── useSettings.ts
│   ├── store/
│   │   └── rekapStore.ts    # Zustand store
│   ├── lib/
│   │   ├── renderer.ts      # Canvas frame rendering logic
│   │   ├── encoder.ts       # FFmpeg video encoding wrapper
│   │   └── utils.ts
│   ├── styles/
│   │   ├── tokens.css       # All CSS custom properties
│   │   └── global.css
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. CSS Token Setup

All design tokens are defined as CSS custom properties in `src/styles/tokens.css`.

```css
/* tokens.css */

:root,
[data-theme="light"] {
  --color-bg-page: #FFFFFF;
  --color-bg-panel: #F7F7F7;
  --color-bg-surface: #FFFFFF;
  --color-bg-hover: #EBEBEB;
  --color-border-default: #D4D4D4;
  --color-border-strong: #8C8C8C;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #4B4B4B;
  --color-text-muted: #8C8C8C;
  --color-text-inverse: #FFFFFF;
  --color-interactive: #0A0A0A;

  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-full: 9999px;

  --shadow-xs: 0 1px 2px rgba(0,0,0,0.06);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.12);

  --duration-fast: 100ms;
  --duration-default: 200ms;
  --duration-slow: 350ms;
}

[data-theme="dark"] {
  --color-bg-page: #111111;
  --color-bg-panel: #1A1A1A;
  --color-bg-surface: #222222;
  --color-bg-hover: #2A2A2A;
  --color-border-default: #2E2E2E;
  --color-border-strong: #555555;
  --color-text-primary: #EDEDED;
  --color-text-secondary: #8C8C8C;
  --color-text-muted: #555555;
  --color-text-inverse: #0A0A0A;
  --color-interactive: #EDEDED;
}
```

Apply theme to `<html>`:
```tsx
// In App.tsx or ThemeProvider
document.documentElement.setAttribute('data-theme', theme);
```

---

## 5. Zustand Store Structure

```typescript
// src/store/rekapStore.ts

interface Photo {
  id: string;
  file: File;
  objectUrl: string;
  width: number;
  height: number;
}

interface RekapSettings {
  duration: number;        // seconds per slide (0.2–5.0)
  transition: 'fade' | 'slide' | 'zoom' | 'none';
  aspectRatio: '16:9' | '4:3' | '5:4' | '1:1' | '9:16';
  padding: number;         // px (0–80)
  borderRadius: number;    // px (0–48)
  shadow: number;          // 0–40
  backgroundMode: 'color' | 'image' | 'slide';
  backgroundColor: string; // hex
  backgroundBlur: number;  // 0–30
  backgroundOverlay: number; // 0–100 (%)
  imageFit: 'cover' | 'contain';
  exportQuality: '1x' | '2x';
}

interface RekapStore {
  photos: Photo[];
  activeIndex: number;
  settings: RekapSettings;
  theme: 'light' | 'dark';
  isPlaying: boolean;
  isExporting: boolean;
  exportProgress: number;

  addPhotos: (files: File[]) => void;
  removePhoto: (id: string) => void;
  reorderPhotos: (from: number, to: number) => void;
  setActiveIndex: (index: number) => void;
  updateSettings: (patch: Partial<RekapSettings>) => void;
  toggleTheme: () => void;
  setPlaying: (v: boolean) => void;
  startExport: () => void;
}
```

---

## 6. Canvas Rendering Architecture

Each "frame" in the preview and export is rendered on an HTML5 Canvas.

### Frame Rendering Flow

```
1. Set canvas dimensions based on aspect ratio
2. Draw background layer (color / blurred photo / custom image)
3. Apply black overlay (if backgroundMode === 'slide')
4. Calculate photo frame rect (apply padding)
5. Apply border radius to frame clip path
6. Draw photo into frame (cover or contain)
7. Apply drop shadow
8. Capture frame as ImageData
```

### Key renderer function signature

```typescript
// src/lib/renderer.ts

export async function renderFrame(
  canvas: HTMLCanvasElement,
  photo: Photo,
  settings: RekapSettings,
  dimensions: { width: number; height: number }
): Promise<void>
```

---

## 7. Video Export (FFmpeg WASM)

Rekap uses `@ffmpeg/ffmpeg` with WASM for in-browser video encoding.

### Setup

```typescript
// src/lib/encoder.ts

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  log: false,
  corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
});

export async function exportToMp4(
  frames: Blob[],        // PNG blobs per slide
  fps: number,           // typically 30
  quality: '1x' | '2x',
  onProgress: (p: number) => void
): Promise<Blob>
```

### Export process

1. Render each photo to canvas at target resolution
2. Capture canvas as PNG blob for each frame
3. For each slide at N fps × duration seconds, write the same frame N×duration times (static frames)
4. Apply transitions by interpolating between frames during overlap window
5. Run `ffmpeg -r {fps} -i frame%04d.png -c:v libx264 -pix_fmt yuv420p output.mp4`
6. Return output blob for download

### Resolution map

| Quality | 16:9      | 1:1       | 9:16      |
|---------|-----------|-----------|-----------|
| 1×      | 1280×720  | 720×720   | 720×1280  |
| 2×      | 1920×1080 | 1080×1080 | 1080×1920 |

---

## 8. Drag & Drop Reorder (dnd-kit)

```tsx
// src/components/layout/Sidebar.tsx
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';

// Each photo item uses useSortable hook
// On drag end: call store.reorderPhotos(oldIndex, newIndex)
```

---

## 9. File Upload Handling

```typescript
// Accept: image/jpeg, image/png, image/webp
// Max: 30 photos
// Validation:
//   - Filter unsupported types before adding to store
//   - Show toast for skipped files
//   - createObjectURL for preview src
//   - Revoke URLs on photo removal (memory management)

const handleFiles = (files: FileList) => {
  const valid = Array.from(files).filter(f =>
    ['image/jpeg', 'image/png', 'image/webp'].includes(f.type)
  );
  const skipped = files.length - valid.length;
  if (skipped > 0) showToast(`${skipped} file(s) skipped — unsupported format`);
  addPhotos(valid.slice(0, 30 - photos.length));
};
```

---

## 10. Theme Persistence

```typescript
// src/hooks/useSettings.ts
const saved = localStorage.getItem('rekap-theme') as 'light' | 'dark' | null;
const initial = saved ?? 'light';
```

---

## 11. Environment & Build

### Requirements
- Node.js 18+
- npm or pnpm

### Install & Run

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview production build
```

### Important Vite config

FFmpeg WASM requires SharedArrayBuffer. Set COOP/COEP headers:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
});
```

---

## 12. Performance Notes

- **Object URLs:** Always call `URL.revokeObjectURL()` when a photo is removed
- **Canvas size:** Only render at export resolution during export; use 50% resolution for preview
- **FFmpeg init:** Load FFmpeg lazily on first export click, not on page load
- **Thumbnail generation:** Generate 88×88px thumbnails via canvas at upload time for sidebar display — don't use full-res images in `<img>` tags for sidebar
- **Transition preview:** For preview mode, use CSS transitions on the `<img>` element — don't re-render canvas for preview playback

---

## 13. Key Dependencies

```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0",
  "zustand": "^4.4.0",
  "@ffmpeg/ffmpeg": "^0.11.0",
  "@ffmpeg/core": "^0.11.0",
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "phosphor-react": "^1.4.1",
  "tailwindcss": "^3.4.0"
}
```

---

## 14. Browser Support

| Browser   | Support |
|-----------|---------|
| Chrome 90+| ✅ Full  |
| Edge 90+  | ✅ Full  |
| Firefox 90+| ✅ Full |
| Safari 15+| ⚠️ FFmpeg WASM may require polyfill for SharedArrayBuffer |
| Mobile    | ⚠️ Not optimized at v1                                    |

---

## 15. Deployment

Rekap is a static SPA. Deploy to any static host:

- **Vercel:** `vercel --prod` (add COOP/COEP headers in `vercel.json`)
- **Netlify:** Add `_headers` file with COOP/COEP
- **GitHub Pages:** Not recommended (no custom header support without proxy)

### vercel.json

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }
      ]
    }
  ]
}
```
