import { create } from 'zustand';
import { type Photo, type RekapSettings, type Theme } from '../types';

interface RekapStore {
  photos: Photo[];
  activeIndex: number;
  settings: RekapSettings;
  theme: Theme | 'system';
  playbackSpeed: number;
  showShortcuts: boolean;
  isPlaying: boolean;
  isExporting: boolean;
  exportProgress: number;

  // Actions
  addPhotos: (newPhotos: Photo[]) => void;
  removePhoto: (id: string) => void;
  reorderPhotos: (startIndex: number, endIndex: number) => void;
  setActiveIndex: (index: number) => void;
  updateSettings: (patch: Partial<RekapSettings>) => void;
  setTheme: (theme: Theme | 'system') => void;
  setPlaying: (v: boolean) => void;
  setExporting: (v: boolean) => void;
  setExportProgress: (p: number) => void;
  setPlaybackSpeed: (speed: number) => void;
  setShowShortcuts: (show: boolean) => void;
}

export const useRekapStore = create<RekapStore>((set) => ({
  photos: [],
  activeIndex: 0,
  settings: {
    duration: 1.5,
    transition: 'fade',
    aspectRatio: '16:9',
    padding: 24,
    borderRadius: 8,
    shadow: 0,
    backgroundMode: 'slide',
    backgroundColor: '#0A0A0A',
    backgroundBlur: 12,
    backgroundOverlay: 40,
    imageFit: 'contain',
    exportQuality: '2x',
  },
  theme: (localStorage.getItem('rekap-theme') as Theme | 'system') || 'system',
  playbackSpeed: 1,
  showShortcuts: false,
  isPlaying: false,
  isExporting: false,
  exportProgress: 0,

  addPhotos: (newPhotos) =>
    set((state) => ({
      photos: [...state.photos, ...newPhotos].slice(0, 30),
    })),

  removePhoto: (id) =>
    set((state) => {
      const photos = state.photos.filter((p) => p.id !== id);
      // Clean up object URLs
      const removed = state.photos.find((p) => p.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.objectUrl);
        if (removed.thumbnailUrl) URL.revokeObjectURL(removed.thumbnailUrl);
      }

      return {
        photos,
        activeIndex: Math.min(state.activeIndex, Math.max(0, photos.length - 1)),
      };
    }),

  reorderPhotos: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.photos);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { photos: result };
    }),

  setActiveIndex: (index) => set({ activeIndex: index }),

  updateSettings: (patch) =>
    set((state) => ({
      settings: { ...state.settings, ...patch },
    })),

  setTheme: (theme) => {
    localStorage.setItem('rekap-theme', theme);
    set({ theme });
  },

  setPlaying: (v) => set({ isPlaying: v }),
  setExporting: (v) => set({ isExporting: v }),
  setExportProgress: (p) => set({ exportProgress: p }),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),
  setShowShortcuts: (show) => set({ showShortcuts: show }),
}));
