import React from 'react';
import { useRekapStore } from '../../store/rekapStore';
import { Play, Pause, SkipBack, SkipForward } from 'phosphor-react';
import Button from '../ui/Button';

const PlaybackBar: React.FC = () => {
  const { photos, activeIndex, setActiveIndex, isPlaying, setPlaying } = useRekapStore();

  if (photos.length === 0) return null;

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % photos.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="h-11 border-t border-[var(--color-border-default)] flex items-center justify-center bg-[var(--color-bg-page)] px-4">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={prevSlide} icon={<SkipBack size={16} weight="fill" />} />
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setPlaying(!isPlaying)}
          icon={isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
        />
        
        <Button variant="ghost" size="sm" onClick={nextSlide} icon={<SkipForward size={16} weight="fill" />} />
      </div>
      
      <div className="absolute right-4 text-[11px] font-medium tabular-nums text-[var(--color-text-muted)] uppercase tracking-[0.08em]">
        {activeIndex + 1} / {photos.length}
      </div>
    </div>
  );
};

export default PlaybackBar;
