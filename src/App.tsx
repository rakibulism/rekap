import { useEffect } from 'react';
import { useRekapStore } from './store/rekapStore';
import Topbar from './components/layout/Topbar';
import Sidebar from './components/layout/Sidebar';
import ControlPanel from './components/layout/ControlPanel';
import Canvas from './components/layout/Canvas';
import PlaybackBar from './components/playback/PlaybackBar';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import ShortcutsModal from './components/ui/ShortcutsModal';

function App() {
  const { 
    theme, isPlaying, photos, activeIndex, setActiveIndex, 
    settings, playbackSpeed, showShortcuts, setShowShortcuts 
  } = useRekapStore();

  useKeyboardShortcuts();

  useEffect(() => {
    let activeTheme = theme;
    if (theme === 'system') {
      activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [theme]);

  // Sync system theme changes
  useEffect(() => {
    if (theme !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && photos.length > 1) {
      interval = setInterval(() => {
        setActiveIndex((activeIndex + 1) % photos.length);
      }, (settings.duration / playbackSpeed) * 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex, photos.length, settings.duration, playbackSpeed, setActiveIndex]);

  return (
    <div className="flex flex-col h-screen bg-[var(--color-bg-page)] text-[var(--color-text-primary)] overflow-hidden font-sans">
      <Topbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <Canvas />
          <PlaybackBar />
        </div>

        <ControlPanel />
      </div>

      <ShortcutsModal 
        isOpen={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </div>
  );
}

export default App;
