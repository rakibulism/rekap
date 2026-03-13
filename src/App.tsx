import { useEffect } from 'react';
import { useRekapStore } from './store/rekapStore';
import Topbar from './components/layout/Topbar';
import Sidebar from './components/layout/Sidebar';
import ControlPanel from './components/layout/ControlPanel';
import Canvas from './components/layout/Canvas';
import PlaybackBar from './components/playback/PlaybackBar';

function App() {
  const { theme, isPlaying, photos, activeIndex, setActiveIndex, settings } = useRekapStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let interval: any;
    if (isPlaying && photos.length > 1) {
      interval = setInterval(() => {
        setActiveIndex((activeIndex + 1) % photos.length);
      }, settings.duration * 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeIndex, photos.length, settings.duration, setActiveIndex]);

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
    </div>
  );
}

export default App;
