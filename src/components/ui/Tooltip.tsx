import React, { useState } from 'react';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<any>(null);

  const show = () => {
    const t = setTimeout(() => setIsVisible(true), delay);
    setTimer(t);
  };

  const hide = () => {
    if (timer) clearTimeout(timer);
    setIsVisible(false);
  };

  return (
    <div 
      className="relative flex items-center" 
      onMouseEnter={show} 
      onMouseLeave={hide}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--color-interactive)] text-[var(--color-text-inverse)] text-[11px] font-medium rounded-[var(--radius-sm)] whitespace-nowrap shadow-[var(--shadow-sm)] z-[100] animate-in fade-in zoom-in-95 duration-150">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-[var(--color-interactive)]" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
